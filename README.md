# masteroppgave-js

## To build the app using electron-packager
Go to src/ and run:
```
electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds
```
NB! Remove '--icon=asse...' while there are no icons