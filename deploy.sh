#!/bin/bash

ng build --output-path=docs --base-href /
cp NAME docs/browser/CNAME
git add .
git commit -m "Build Angular app"
git push origin master
