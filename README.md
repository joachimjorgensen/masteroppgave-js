# masteroppgave-js
This project concludes our five year journey at the Norwegian University of Science and Technology (NTNU), at the Department of Computer Science (IDI). The project was conducted during the fall of 2018 and spring of 2019, and was the final submission for our degree of Masters of Informatics.

## To build the app using electron-packager (OSX)
Go to src/ and run:
```
electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds
```
NB! Remove '--icon=asse...' while there are no icons

## To build the app using electron-packager (Windows)
Go to src/ and run:
```
electron-packager . parsonsGenerator --overwrite --asar=true --platform=win32 --arch=ia32 --prune=true --out=release-builds --version-string.CompanyName=JS --version-string.FileDescription=JS --version-string.ProductName="Parsons Generator"
```
