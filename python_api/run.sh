#!/bin/bash

echo "============================================================"
echo "   JARVIS Medical AI - Python API Server"
echo "   نظام الذكاء الاصطناعي الطبي JARVIS - خادم API"
echo "============================================================"
echo ""

echo "[1/3] Checking Python..."
python3 --version
if [ $? -ne 0 ]; then
    echo "Error: Python is not installed"
    echo "خطأ: Python غير مثبت"
    exit 1
fi
echo ""

echo "[2/3] Training Model..."
echo "تدريب الموديل..."
python3 model.py
if [ $? -ne 0 ]; then
    echo "Error: Model training failed"
    echo "خطأ: فشل تدريب الموديل"
    exit 1
fi
echo ""

echo "[3/3] Starting API Server..."
echo "تشغيل خادم API..."
echo ""
echo "Server will run on: http://localhost:5000"
echo "الخادم سيعمل على: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "اضغط Ctrl+C لإيقاف الخادم"
echo ""
python3 api.py
