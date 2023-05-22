cd ~/blog
npm run build:prod

rm -rf ~/../var/www/blog/html
mv ~/blog/build ~/../var/www/blog/html