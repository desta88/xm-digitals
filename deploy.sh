#!/bin/bash
set -e

# --- KONFIGURASI ---
PROJECT_NAME="xmdigitals"
CUSTOM_DOMAIN="xmdigitals.com"
BUILD_OUTPUT="dist/$PROJECT_NAME/browser" # Jalur output default Angular 19
VERBOSE=false

# Cek argumen verbose
if [[ "$1" == "--verbose" ]]; then
  VERBOSE=true
fi

# --- FUNGSI SPINNER ---
spinner() {
  local pid=$1
  local delay=0.1
  local spinstr='|/-\'
  while kill -0 $pid 2>/dev/null; do
    local temp=${spinstr#?}
    printf " [%c]  " "$spinstr"
    spinstr=$temp${spinstr%"$temp"}
    sleep $delay
    printf "\b\b\b\b\b\b"
  done
}

run_with_spinner() {
  local cmd="$1"
  local msg="$2"

  echo -n "$msg..."

  if [ "$VERBOSE" = true ]; then
    echo ""
    if bash -c "$cmd"; then
      echo "   ✅ ($msg)"
    else
      echo "   ❌ ($msg gagal)"
      exit 1
    fi
  else
    bash -c "$cmd" &>/dev/null &
    local pid=$!
    spinner $pid
    wait $pid
    local exit_code=$?

    if [ $exit_code -eq 0 ]; then
      echo " ✅"
    else
      echo " ❌"
      echo "   ERROR: Tahap '$msg' gagal."
      exit $exit_code
    fi
  fi
}

# --- PROSES DEPLOYMENT ---

echo "🚀 Memulai Deployment XM Digitals 2026..."

# 1. Build Angular dengan Prerendering Aktif
# Kita set base-href / di sini agar file index.html di semua subfolder benar
echo "📦 Building Angular app (Prerender mode)..."
run_with_spinner "ng build --configuration production --base-href /" "   Building"

# 2. Membersihkan folder docs
echo "🧹 Cleaning docs folder..."
run_with_spinner "rm -rf docs/* && rm -rf docs/.* 2>/dev/null || true" "   Cleaning"

# 3. Menyalin hasil build (Termasuk folder rute statis)
echo "📂 Copying prerendered files to docs/..."
if [ -d "$BUILD_OUTPUT" ]; then
    run_with_spinner "cp -r $BUILD_OUTPUT/* docs/" "   Copying browser files"
else
    echo " ❌ ERROR: Folder $BUILD_OUTPUT tidak ditemukan. Cek angular.json."
    exit 1
fi

# 4. Membuat file .nojekyll (CRITICAL untuk GitHub Pages)
# Ini agar GitHub tidak mengabaikan folder yang diawali underscore (_)
echo "🛡️ Disabling Jekyll..."
run_with_spinner "touch docs/.nojekyll" "   Adding .nojekyll"

# 5. Konfigurasi Custom Domain (CNAME)
if [ -n "$CUSTOM_DOMAIN" ]; then
  echo "🌐 Setting up Custom Domain..."
  run_with_spinner "echo \"$CUSTOM_DOMAIN\" > docs/CNAME" "   Writing CNAME"
fi

# 6. Menambahkan Fallback 404.html
# Tetap diperlukan untuk rute yang tidak terdaftar di prerender
echo "🔄 Adding SPA fallback..."
run_with_spinner "cp docs/index.html docs/404.html" "   Adding 404.html"

# 7. Git Push ke Repository
echo "🚀 Pushing to GitHub..."
run_with_spinner "git add docs && git commit -m 'deploy: update GitHub Pages (Prerendered)' || true" "   Git commit"
run_with_spinner "git push origin master" "   Git push"

echo ""
echo "✅ DEPLOYMENT SELESAI!"
echo "🌍 Website Anda akan segera aktif di: https://$CUSTOM_DOMAIN"
echo "🔍 Cek Google Search Console dalam 24 jam untuk verifikasi status 200 OK."
