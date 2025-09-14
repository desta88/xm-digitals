#!/bin/bash

ng build --output-path=docs --base-href /
git add .
git commit -m "Build Angular app"
git push origin master
