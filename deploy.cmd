:: build
:: yarn build

:: navigate into the build output directory
xcopy .\\dist ..\\saviourapi.github.io /Y /e
cd ../saviourapi.github.io

echo si | move ./favicon.ico ./saviourapi
echo si | move ./css ./saviourapi
echo si | move ./js ./saviourapi

:: git init
@REM git add -A
@REM git commit -m "new deploy"

@REM :: if you are deploying to https://<USERNAME>.github.io/<REPO>
@REM git push origin main

cd ..\petrolpredict-web