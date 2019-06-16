# masteroppgave-js
This project concludes our five year journey at the Norwegian University of Science and Technology (NTNU), at the Department of Computer Science (IDI). The project was conducted during the fall of 2018 and spring of 2019, and was the final submission for our degree of Masters of Informatics.

## How to run the program
```
git clone https://github.com/joachimjorgensen/masteroppgave-js.git
```
```
cd masteroppgave-js/src
```
```
npm start
```

## To build the app using electron-packager (OSX)
```
cd masteroppgave-js/src
```
```
electron-packager . --overwrite --platform=darwin --arch=x64 --prune=true --out=release-builds
```

## To build the app using electron-packager (Windows)
```
cd masteroppgave-js/src
```
```
electron-packager . parsonsGenerator --overwrite --asar=true --platform=win32 --arch=ia32 --prune=true --out=release-builds --version-string.CompanyName=JS --version-string.FileDescription=JS --version-string.ProductName="Parsons Generator"
```
## How to run tests
```
cd masteroppgave-js/src
```
```
npm test
```
