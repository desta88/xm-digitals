#!/bin/bash
set -e

PROJECT_NAME="xmdigitals"
CUSTOM_DOMAIN="xmdigitals.com"

# 1. Build dengan flag prerender eksplisit
echo "📦 Building with explicit Prerender..."
ng build --configuration production --prerender

# 2. Folder Sumber
SRC="dist/$PROJECT_NAME/browser"

# 3. Sinkronisasi ke docs
mkdir -p docs
rm -rf docs/*
cp -r $SRC/* docs/

# 4. Handle Index (Angular 19 sering menggunakan index.csr.html)
if [ -f "docs/index.csr.html" ]; then
    mv docs/index.csr.html docs/index.html
fi

# 5. Fix CNAME & GitHub
echo "$CUSTOM_DOMAIN" > docs/CNAME
cp docs/index.html docs/404.html
touch docs/.nojekyll

# 6. VERIFIKASI PENTING
if [ -d "docs/about-us" ]; then
    echo "✅ SUCCESS: Folder about-us ditemukan. SEO Prerender Aktif!"
else
    echo "⚠️ WARNING: Folder about-us TIDAK ditemukan. GSC akan melihat ini sebagai SPA biasa."
fi

# 7. Push
git add docs/ && git commit -m "deploy: check prerender" && git push origin master
