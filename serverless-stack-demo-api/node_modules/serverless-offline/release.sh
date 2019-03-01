#!/bin/sh
set -e
set -x

git fetch upstream
git checkout -b upstream_master upstream/master
npm version patch
git push upstream upstream_master:master --tags
npm publish
git checkout master
git branch -D upstream_master
git fetch upstream
git merge upstream/master
