Sanity Frontend
===

This is a [react native](https://facebook.github.io/react-native/) app that powers the Sanity frontend. 

Now that we've added UI Automation testing it's a pain to setup :( but here's the steps:

Only need to run these once
```
gem install bundler  # A ruby tool for running ruby code
gem install cocoapods  # A dependency management for iOS
cd ios/
pod install  # Installs all the iOS deps
npm install -g exp  # Expo tool

```

```
cd ios
open frontend.xcworkspace  # Open up the project
exp start  # Starts the packer
# Run from Xcode
bundle exec cucumber  # Runs the tests
```