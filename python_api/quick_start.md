# 🚀 دليل البدء السريع / Quick Start Guide

## خطوات التشغيل السريعة / Quick Setup Steps

### 1️⃣ تثبيت Python والمكتبات
```bash
# تأكد من وجود Python 3.8+
python --version

# الانتقال لمجلد API
cd python_api

# تثبيت المكتبات المطلوبة
pip install flask flask-cors pandas scikit-learn numpy
```

---

### 2️⃣ تحضير البيانات
```bash
# إذا كان لديك ملف diabetes.csv، ضعه في مجلد python_api
# أو استخدم ملف diabetes_sample.csv المرفق
# أو دع الكود يستخدم البيانات التجريبية المدمجة
```

---

### 3️⃣ تدريب الموديل
```bash
python model.py
```

**ستظهر رسالة:**
```
✅ تم تدريب الموديل بنجاح!
✅ Model trained successfully!
📊 دقة الموديل / Model Accuracy: 75.32%
💾 تم حفظ الموديل في diabetes_model.pkl
```

---

### 4️⃣ تشغيل خادم API
```bash
python api.py
```

**ستظهر رسالة:**
```
🚀 تشغيل خادم API للذكاء الاصطناعي الطبي JARVIS
📍 الخادم يعمل على / Server running on: http://localhost:5000
```

---

### 5️⃣ تشغيل واجهة React (في نافذة Terminal منفصلة)
```bash
# ارجع للمجلد الرئيسي
cd ..

# شغّل React
npm run dev
```

---

### 6️⃣ اختبر النظام! 🎉

افتح المتصفح على العنوان الذي يظهر (عادة http://localhost:5173)

**ستجد:**
- 🌌 خلفية هولوجرافية متحركة
- 🤖 نظام JARVIS الطبي
- 🔗 مؤشر اتصال API (أخضر = متصل)
- 📊 إدخال بيانات المريض
- 🔍 زر فحص الحالة
- 📈 عرض النتائج في الوقت الفعلي

---

## 🧪 اختبار API يدوياً

### اختبار 1: فحص الحالة
```bash
curl http://localhost:5000/health
```

### اختبار 2: تنبؤ بسيط
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "pregnancies": 6,
    "glucose": 148,
    "bloodPressure": 72,
    "skinThickness": 35,
    "insulin": 0,
    "bmi": 33.6,
    "diabetesPedigree": 0.627,
    "age": 50
  }'
```

---

## ⚙️ التحكم في وضع API

في واجهة React، يمكنك:

1. **النقر على زر "API Mode"** للتبديل بين:
   - 🔗 **API Mode**: يستخدم موديل Python KNN الحقيقي
   - 🔧 **Local Mode**: يستخدم خوارزمية JavaScript محلية

2. **مؤشر الاتصال**:
   - 🟢 نقطة خضراء = متصل بـ Python API
   - لا شيء = يعمل في الوضع المحلي

---

## ❓ حل المشاكل الشائعة

### المشكلة: خادم API لا يعمل
**الحل:**
```bash
# تأكد أنك في مجلد python_api
cd python_api

# تأكد من تثبيت المكتبات
pip install -r requirements.txt

# شغّل الخادم
python api.py
```

---

### المشكلة: واجهة React لا تتصل بـ API
**الحلول:**
1. تأكد أن Python API يعمل على http://localhost:5000
2. تأكد أن React يعمل على منفذ مختلف (5173)
3. افتح Console في المتصفح وشوف الأخطاء
4. استخدم "Local Mode" كـ fallback

---

### المشكلة: ملف diabetes.csv مفقود
**الحل:**
- الكود سيستخدم تلقائياً بيانات تجريبية مدمجة
- أو استخدم ملف `diabetes_sample.csv` المرفق
- أو ضع ملف diabetes.csv الحقيقي في المجلد

---

## 📊 تفاصيل الموديل

**نوع الموديل:** K-Nearest Neighbors (KNN)
**عدد الجيران:** 7
**الميزات المستخدمة:** 8 (Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigree, Age)
**التطبيع:** StandardScaler من scikit-learn
**الدقة المتوقعة:** ~75-78% (يعتمد على البيانات)

---

## 🎯 نصائح الاستخدام

1. **للتطوير:** استخدم API Mode لاختبار الموديل الحقيقي
2. **للعرض التوضيحي:** Local Mode يعمل بدون الحاجة لتشغيل Python
3. **للإنتاج:** استخدم خادم إنتاج مثل Gunicorn بدلاً من Flask debug mode

---

## 🌟 ميزات إضافية

- ✅ دعم كامل للغة العربية والإنجليزية
- ✅ واجهة Cyberpunk بتأثيرات هولوجرافية
- ✅ سجل مباشر للتحليلات
- ✅ مؤشرات صحية دائرية متحركة
- ✅ تبديل تلقائي بين API والوضع المحلي
- ✅ تحليل دقيق لمستوى الخطورة

---

**تم البناء بـ ❤️ لنظام JARVIS الطبي**
**Built with ❤️ for JARVIS Medical AI System**
