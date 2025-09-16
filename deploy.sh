#!/bin/bash
set -e

PROJECT_NAME="xmdigitals"
CUSTOM_DOMAIN="xmdigitals.com"

echo "📦 Building Angular app..."
# hasil build simpan ke dist/<project>
ng build --output-path=dist/$PROJECT_NAME --base-href /

echo "🧹 Cleaning docs folder..."
rm -rf docs/*
rm -rf docs/.* 2>/dev/null || true

echo "📂 Copying build output to docs/"
cp -r dist/$PROJECT_NAME/browser/* docs/

if [ -n "$CUSTOM_DOMAIN" ]; then
  echo "🌐 Adding CNAME for custom domain..."
  echo "$CUSTOM_DOMAIN" > docs/CNAME
fi

echo "🔄 Adding Angular SPA fallback (404.html)..."
if [ -f docs/index.html ]; then
  cp docs/index.html docs/404.html
else
  echo "❌ ERROR: index.html tidak ditemukan di docs/. Cek hasil build Angular."
  exit 1
fi

echo "🚀 Committing & pushing to master..."
git add docs
git commit -m "deploy: update GitHub Pages" || echo "✅ No changes to commit"
git push origin master

echo "✅ Deployment finished! Check your site at https://$CUSTOM_DOMAIN"
