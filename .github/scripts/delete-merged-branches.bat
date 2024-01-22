@echo off
for /f "delims=" %%b in ('git branch --merged dev ^| findstr /V /C:"* dev"') do (
  if "%%b" neq "main" (
    git branch -d %%b
  )
)