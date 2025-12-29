# GitHub Pages Deployment Script
# Moves webshop files to root for GitHub Pages compatibility

Write-Host "=== GitHub Pages Deployment ===" -ForegroundColor Cyan

# Check if webshop folder exists
if (!(Test-Path "webshop")) {
    Write-Host "Error: webshop folder not found!" -ForegroundColor Red
    exit 1
}

# Move all files from webshop to root
Write-Host "Moving files from webshop/ to root..." -ForegroundColor Yellow
Get-ChildItem -Path "webshop\*" -Recurse | ForEach-Object {
    $dest = $_.FullName.Replace((Resolve-Path "webshop").Path, (Get-Location).Path)
    $destDir = Split-Path -Parent $dest
    if (!(Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }
    Move-Item -Path $_.FullName -Destination $dest -Force
}

# Remove empty webshop folder
Write-Host "Removing webshop folder..." -ForegroundColor Yellow
Remove-Item "webshop" -Recurse -Force

# Remove notebook if it exists
if (Test-Path "Untitled-1.ipynb") {
    Write-Host "Removing Untitled-1.ipynb..." -ForegroundColor Yellow
    Remove-Item "Untitled-1.ipynb" -Force
}

# Git operations
Write-Host "Staging changes..." -ForegroundColor Yellow
git add -A

Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Deploy to GitHub Pages: move files to root"

Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push

Write-Host ""
Write-Host "=== Deployment Complete! ===" -ForegroundColor Green
Write-Host "Your site will be available at:" -ForegroundColor Cyan
Write-Host "https://pascalrupp03.github.io" -ForegroundColor White
Write-Host ""
Write-Host "Wait 1-2 minutes for GitHub to build your site." -ForegroundColor Yellow
