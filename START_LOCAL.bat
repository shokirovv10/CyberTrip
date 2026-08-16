@echo off
setlocal EnableExtensions
cd /d "%~dp0"

title CYBERTRIP LOCAL SERVER
echo.
echo ==================================================
echo              CYBERTRIP LOCAL SERVER
echo ==================================================
echo.

if not exist ".venv\Scripts\python.exe" (
    echo [1/5] Python virtual environment yaratilmoqda...
    py -3 -m venv .venv
    if errorlevel 1 (
        python -m venv .venv
        if errorlevel 1 (
            echo [X] Python virtual environment yaratilmadi.
            pause
            exit /b 1
        )
    )
)

echo [2/5] Kutubxonalar tekshirilmoqda...
".venv\Scripts\python.exe" -m pip install -r requirements.txt
if errorlevel 1 (
    echo [X] Kutubxonalarni o'rnatishda xato.
    pause
    exit /b 1
)

echo [3/5] Database va schema tayyorlanmoqda...
if not exist "instance" mkdir instance
".venv\Scripts\python.exe" -c "from app import create_app; app=create_app(); print('Database tayyor.')"
if errorlevel 1 (
    echo.
    echo [X] Database/app startup xatosi. Server ishga tushirilmaydi.
    echo Yuqoridagi xatoni tekshiring.
    pause
    exit /b 1
)

echo [4/5] CYBERTRIP serveri ishga tushirilmoqda...
start "CYBERTRIP SERVER" cmd /k ""%~dp0.venv\Scripts\python.exe" "%~dp0run.py""

echo [5/5] Server kutilyapti...
for /L %%I in (1,1,30) do (
    powershell -NoProfile -Command "$r=Test-NetConnection 127.0.0.1 -Port 5000 -WarningAction SilentlyContinue; if($r.TcpTestSucceeded){exit 0}else{exit 1}" >nul 2>&1
    if not errorlevel 1 goto READY
    timeout /t 1 /nobreak >nul
)

echo [X] Server 30 soniyada ochilmadi.
echo CYBERTRIP SERVER oynasidagi xatoni tekshiring.
pause
exit /b 1

:READY
echo.
echo ==================================================
echo   CYBERTRIP ISHLADI
echo   http://127.0.0.1:5000
echo ==================================================
start "" "http://127.0.0.1:5000/"
pause
