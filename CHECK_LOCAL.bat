@echo off
cd /d "%~dp0"
echo ==== CYBERTRIP LOCAL CHECK ====
if not exist ".venv\Scripts\python.exe" (
  echo [ERROR] .venv mavjud emas.
  echo START_LOCAL.bat ni birinchi ishga tushiring.
  pause
  exit /b 1
)
echo [1] Python:
".venv\Scripts\python.exe" --version
echo.
echo [2] Flask import:
".venv\Scripts\python.exe" -c "import flask; print('Flask OK', flask.__version__)"
echo.
echo [3] App startup:
".venv\Scripts\python.exe" -c "from app import create_app; app=create_app(); print('App OK')"
echo.
echo [4] Port 5000:
powershell -NoProfile -Command "$r=Test-NetConnection 127.0.0.1 -Port 5000 -WarningAction SilentlyContinue; if($r.TcpTestSucceeded){'PORT 5000: OPEN'}else{'PORT 5000: CLOSED'}"
echo.
pause
