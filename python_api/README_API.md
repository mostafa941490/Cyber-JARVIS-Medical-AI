# 🧠 JARVIS Medical AI - Python API
# نظام الذكاء الاصطناعي الطبي JARVIS - خادم API

---

## 📋 المتطلبات / Requirements

### 1️⃣ تثبيت Python
تأكد من تثبيت Python 3.8 أو أحدث على جهازك

Make sure Python 3.8+ is installed on your system

```bash
python --version
```

### 2️⃣ تثبيت المكتبات / Install Libraries

```bash
cd python_api
pip install -r requirements.txt
```

أو يمكنك تثبيت كل مكتبة على حدة:

Or install each library separately:

```bash
pip install flask flask-cors pandas scikit-learn numpy
```

---

## 🚀 خطوات التشغيل / Running Steps

### الخطوة 1: تدريب الموديل / Step 1: Train the Model

```bash
cd python_api
python model.py
```

**ملاحظة مهمة:** ضع ملف `diabetes.csv` في نفس المجلد مع `model.py`

**Important:** Place your `diabetes.csv` file in the same folder as `model.py`

سيقوم هذا الأمر بـ:
- قراءة بيانات السكري من ملف CSV
- تدريب موديل KNN
- حفظ الموديل في ملف `diabetes_model.pkl`
- حفظ الـ Scaler في ملف `scaler.pkl`

This will:
- Read diabetes data from CSV file
- Train KNN model
- Save model to `diabetes_model.pkl`
- Save scaler to `scaler.pkl`

---

### الخطوة 2: تشغيل خادم API / Step 2: Run API Server

```bash
python api.py
```

الخادم سيعمل على العنوان:

Server will run on:

```
http://localhost:5000
```

---

## 🔌 API Endpoints

### 1️⃣ الصفحة الرئيسية / Home
```
GET http://localhost:5000/
```

**الاستجابة / Response:**
```json
{
  "status": "running",
  "message": "JARVIS Medical AI API is running",
  "message_ar": "خادم API للذكاء الاصطناعي الطبي JARVIS يعمل"
}
```

---

### 2️⃣ فحص الحالة الصحية للخادم / Health Check
```
GET http://localhost:5000/health
```

**الاستجابة / Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "scaler_loaded": true
}
```

---

### 3️⃣ التنبؤ بمرض السكري / Diabetes Prediction
```
POST http://localhost:5000/predict
Content-Type: application/json
```

**المدخلات / Request Body:**
```json
{
  "pregnancies": 1,
  "glucose": 100,
  "bloodPressure": 70,
  "skinThickness": 20,
  "insulin": 80,
  "bmi": 25,
  "diabetesPedigree": 0.5,
  "age": 30
}
```

**الاستجابة / Response:**
```json
{
  "prediction": 0,
  "risk_percentage": 15.5,
  "probability": {
    "normal": 84.5,
    "diabetes": 15.5
  },
  "risk_level": {
    "en": "Normal",
    "ar": "سليم",
    "color": "green"
  },
  "message": {
    "en": "Prediction: Normal",
    "ar": "النتيجة: طبيعي"
  },
  "recommendation": {
    "en": "Continue healthy lifestyle",
    "ar": "استمر في نمط حياة صحي"
  }
}
```

---

### 4️⃣ التنبؤ الجماعي / Batch Prediction
```
POST http://localhost:5000/predict-batch
Content-Type: application/json
```

**المدخلات / Request Body:**
```json
{
  "cases": [
    {
      "name": "أحمد",
      "pregnancies": 1,
      "glucose": 100,
      "bloodPressure": 70,
      "skinThickness": 20,
      "insulin": 80,
      "bmi": 25,
      "diabetesPedigree": 0.5,
      "age": 30
    },
    {
      "name": "فاطمة",
      "pregnancies": 6,
      "glucose": 148,
      "bloodPressure": 72,
      "skinThickness": 35,
      "insulin": 0,
      "bmi": 33.6,
      "diabetesPedigree": 0.627,
      "age": 50
    }
  ]
}
```

---

## 🧪 اختبار API باستخدام cURL / Testing with cURL

### اختبار بسيط / Simple Test
```bash
curl http://localhost:5000/health
```

### اختبار التنبؤ / Prediction Test
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "pregnancies": 1,
    "glucose": 100,
    "bloodPressure": 70,
    "skinThickness": 20,
    "insulin": 80,
    "bmi": 25,
    "diabetesPedigree": 0.5,
    "age": 30
  }'
```

---

## 🔗 ربط React بـ API / Connect React to API

الواجهة React ستتصل تلقائياً بالـ API على العنوان:

The React interface will automatically connect to the API at:

```
http://localhost:5000/predict
```

تأكد من أن:
1. خادم Python يعمل على المنفذ 5000
2. خادم React يعمل على منفذ مختلف (عادة 5173)
3. CORS مفعّل في API (موجود بالفعل في الكود)

Make sure:
1. Python server is running on port 5000
2. React server is running on a different port (usually 5173)
3. CORS is enabled in the API (already included in the code)

---

## 📊 البيانات المطلوبة / Required Data

| الحقل / Field | النطاق / Range | الوصف / Description |
|--------------|-----------------|---------------------|
| **pregnancies** | 0-17 | عدد مرات الحمل / Number of pregnancies |
| **glucose** | 0-200 | مستوى الجلوكوز / Glucose level |
| **bloodPressure** | 0-122 | ضغط الدم / Blood pressure |
| **skinThickness** | 0-99 | سُمك الجلد / Skin thickness |
| **insulin** | 0-846 | مستوى الإنسولين / Insulin level |
| **bmi** | 0-67 | مؤشر كتلة الجسم / Body Mass Index |
| **diabetesPedigree** | 0.078-2.42 | نسبة الوراثة / Diabetes pedigree |
| **age** | 21-81 | العمر / Age |

---

## ⚠️ استكشاف الأخطاء / Troubleshooting

### المشكلة: ModuleNotFoundError
**الحل:** تأكد من تثبيت جميع المكتبات المطلوبة

**Solution:** Make sure all required libraries are installed
```bash
pip install -r requirements.txt
```

---

### المشكلة: FileNotFoundError - diabetes.csv
**الحل:** ضع ملف diabetes.csv في مجلد python_api

**Solution:** Place diabetes.csv file in python_api folder

أو يمكنك استخدام البيانات التجريبية المدمجة في الكود

Or use the sample data built into the code

---

### المشكلة: Port 5000 already in use
**الحل:** أوقف البرنامج الذي يستخدم المنفذ 5000 أو غيّر المنفذ في api.py

**Solution:** Stop the program using port 5000 or change the port in api.py
```python
app.run(host='0.0.0.0', port=5001, debug=True)  # غيّر 5000 إلى 5001
```

---

### المشكلة: CORS Error في المتصفح
**الحل:** تأكد من تثبيت flask-cors

**Solution:** Make sure flask-cors is installed
```bash
pip install flask-cors
```

---

## 🎯 ملاحظات مهمة / Important Notes

1. **الأمان / Security:**
   - هذا API للتطوير فقط (Debug Mode)
   - للإنتاج، استخدم Gunicorn أو uWSGI
   - أضف مصادقة (Authentication) للإنتاج

2. **الأداء / Performance:**
   - الموديل محمّل في الذاكرة لسرعة الاستجابة
   - يمكن التعامل مع عدة طلبات في نفس الوقت

3. **البيانات / Data:**
   - لا يتم حفظ بيانات المرضى
   - كل تنبؤ مستقل عن الآخر

---

## 📞 الدعم / Support

للمساعدة أو الاستفسارات:

For help or questions:

- تحقق من أن جميع الملفات في مكانها الصحيح
- تأكد من تشغيل model.py أولاً قبل api.py
- راجع سجلات الأخطاء في Terminal

---

## 🌟 Next Steps

بعد تشغيل API بنجاح:

After successfully running the API:

1. ✅ شغّل واجهة React
2. ✅ اضغط على زر "فحص الحالة"
3. ✅ شاهد النتائج في الوقت الفعلي

1. ✅ Run React interface
2. ✅ Click "Analyze" button
3. ✅ See real-time results

---

**Built with ❤️ for JARVIS Medical AI System**

**صُمم بـ ❤️ لنظام الذكاء الاصطناعي الطبي JARVIS**
