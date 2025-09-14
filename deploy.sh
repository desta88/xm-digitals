#!/bin/bash
set -e

# 1. Build Angular (custom domain → base-href "/")
ng build --output-path=dist/xmdigitals/browser --base-href /

# 2. Bersihkan folder docs
rm -rf docs

# 3. Copy hasil build ke docs/
cp -r dist/xmdigitals/browser docs

# 4. Tambah file CNAME (kalau pakai custom domain)
echo "xmdigitals.com" > docs/CNAME

# 5. Commit & push
git add .
git commit -m "deploy: update docs"
git push origin master

echo "✅ Deploy selesai! Cek GitHub Pages Anda."
