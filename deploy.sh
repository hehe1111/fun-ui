#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init

# git config user.name 'hehe1111'
# git config user.email '2908749709@qq.com'
git config user.name 'hehe2222'
git config user.email 'hehe2222@foxmail.com'

git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
# git push -f git@github.com:hehe1111/fun-ui.git master:gh-pages
git push -f git@gitee.com:hehe2222/fun-ui.git master:gh-pages

cd -

cd docs/.vuepress

rm -rf dist

cd -
