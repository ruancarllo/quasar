#!/bin/bash

cd source/app
flutter create . --platforms android,ios,web

rm -rf test
rm -rf .idea
rm -rf app.iml
rm -rf .gitignore
rm -rf README.md

rm -rf assets/fonts
mkdir -p assets/fonts
curl https://fonts.google.com/download?family=Roboto+Slab -o assets/fonts/Roboto_Slab.zip
unzip assets/fonts/Roboto_Slab.zip -d assets/fonts/Roboto_Slab
rm -rf assets/fonts/Roboto_Slab.zip

dart run flutter_launcher_icons
flutter pub run rename --appname Quasar --target android,ios,web