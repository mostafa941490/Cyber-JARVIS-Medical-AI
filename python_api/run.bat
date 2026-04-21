@echo off
echo ============================================================
echo    JARVIS Medical AI - Python API Server
echo    نظام الذكاء الاصطناعي الطبي JARVIS - خادم API
echo ============================================================
echo.

echo [1/3] Checking Python...
python --version
if %errorlevel% neq 0 (
    echo Error: Python is not installed or not in PATH
    echo خطأ: Python غير مثبت أو غير موجود في PATH
    pause
    exit /b 1
)
echo.

echo [2/3] Training Model...
echo تدريب الموديل...
python model.py
if %errorlevel% neq 0 (
    echo Error: Model training failed
    echo خطأ: فشل تدريب الموديل
    pause
    exit /b 1
)
echo.

echo [3/3] Starting API Server...
echo تشغيل خادم API...
echo.
echo Server will run on: http://localhost:5000
echo الخادم سيعمل على: http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo اضغط Ctrl+C لإيقاف الخادم
echo.
python api.py

pause
