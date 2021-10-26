@ECHO OFF

::This boots the app server, and the correspondent servers that 
::watches for changes. 

start cmd /k php artisan serve
start cmd /k npm run compileCSS
start cmd /k npm run watch



exit