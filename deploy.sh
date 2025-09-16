#!/bin/bash
set -e

PROJECT_NAME="xmdigitals"
CUSTOM_DOMAIN="xmdigitals.com"
VERBOSE=false

# cek argumen
if [[ "$1" == "--verbose" ]]; then
  VERBOSE=true
fi

# 🎨 Spinner function
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
    # jalankan langsung, tampilkan log asli
    if bash -c "$cmd"; then
      echo "   ✅ ($msg)"
    else
      echo "   ❌ ($msg gagal)"
      exit 1
    fi
  else
    # jalankan dengan spinner
    bash -c "$cmd" &>/dev/null &
    local pid=$!
    spinner $pid
    wait $pid
    local exit_code=$?

    if [ $exit_code -eq 0 ]; then
      echo " ✅"
    else
      echo " ❌"
      echo "   ERROR: step '$msg' gagal dijalankan."
      exit $exit_code
    fi
  fi
}

echo "📦 Building Angular app..."
run_with_spinner "ng build --output-path=dist/$PROJECT_NAME --base-href /" "   Building"

echo "🧹 Cleaning docs folder..."
run_with_spinner "rm -rf docs/* && rm -rf docs/.* 2>/dev/null || true" "   Cleaning"

echo "📂 Copying build output to docs/"
run_with_spinner "cp -r dist/$PROJECT_NAME/browser/* docs/" "   Copying"

echo "🛠️ Fixing base href in index.html..."
run_with_spinner "sed -i 's|<base href=\".*\">|<base href=\"/\">|' docs/index.html" "   Fixing base href"

if [ -n "$CUSTOM_DOMAIN" ]; then
  echo "🌐 Adding CNAME for custom domain..."
  run_with_spinner "echo \"$CUSTOM_DOMAIN\" > docs/CNAME" "   Writing CNAME"
fi

echo "🔄 Adding Angular SPA fallback (404.html)..."
run_with_spinner "cp docs/index.html docs/404.html" "   Adding 404.html"

echo "🚀 Committing & pushing to master..."
run_with_spinner "git add docs && git commit -m 'deploy: update GitHub Pages' || true && git push origin master" "   Git push"

echo "✅ Deployment finished! Check your site at https://$CUSTOM_DOMAIN (provisioning 2-3 min)"
