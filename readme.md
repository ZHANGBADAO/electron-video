#electron-builder打包注意事项
在electron使用electron-builder打包过程中需要用到4个github上的包，但是由于网络原因，下载不下来，导致出错

1. electron-vX.X.X-win32-x64.zip  
在npm的配置中增加 Electron的中国镜像:  
`npm config set electron_mirror https://cdn.npm.taobao.org/dist/electron/`


2. winCodeSign-X.X.X.7z
在以下地址下载(X.X.X为最新的版本号)  
`https://github.com/electron-userland/electron-builder-binaries/releases/download/winCodeSign-X.X.X/winCodeSign-X.X.X.7z`  
并解压到此目录下   
`%LOCALAPPDATA%\electron-builder\Cache\winCodeSign\winCodeSign-X.X.X` 


3. nsis-X.X.X.7z
   在以下地址下载(X.X.X为最新的版本号)  
   `https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-X.X.X/nsis-X.X.X.7z`  
   并解压到此目录下   
   `%LOCALAPPDATA%\electron-builder\Cache\nsis\nsis-X.X.X` 


4. nsis-resources-X.X.X.7z
   在以下地址下载(X.X.X为最新的版本号)  
   `https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-resources-X.X.X/nsis-resources-X.X.X.7z`  
   并解压到此目录下   
   `%LOCALAPPDATA%\electron-builder\Cache\nsis\nsis-resources-X.X.X` 

