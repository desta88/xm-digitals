#!/bin/bash
set -e

PROJECT_NAME="xmdigitals"
CUSTOM_DOMAIN="xmdigitals.com"

echo "📦 Building Angular app..."
ng build --output-path=dist/$PROJECT_NAME --base-href / || true

echo "🧹 Cleaning docs folder..."
rm -rf docs/*
rm -rf docs/.* 2>/dev/null || true

echo "📂 Copying build output to docs/"
cp -r dist/$PROJECT_NAME/browser/* docs/

echo "🛠️ Fixing base href in index.html..."
# ganti apapun isinya jadi "/"
sed -i 's|<base href=".*">|<base href="/">|' docs/index.html

if [ -n "$CUSTOM_DOMAIN" ]; then
  echo "🌐 Adding CNAME for custom domain..."
  echo "$CUSTOM_DOMAIN" > docs/CNAME
fi

echo "🔄 Adding Angular SPA fallback (404.html)..."
cp docs/index.html docs/404.html

echo "🚀 Committing & pushing to master..."
git add docs
git commit -m "deploy: update GitHub Pages" || echo "✅ No changes to commit"
git push origin master

echo "✅ Deployment finished! Check your site at https://$CUSTOM_DOMAIN (provisioning 2-3 min)"
