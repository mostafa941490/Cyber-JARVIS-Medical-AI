# 🧠 JARVIS - نظام الذكاء الاصطناعي الطبي المتطور
# JARVIS - Advanced Medical AI System

<div align="center">

![JARVIS](https://img.shields.io/badge/JARVIS-Medical%20AI-00eaff?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.8+-green?style=for-the-badge&logo=python)
![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Flask](https://img.shields.io/badge/Flask-3.0-black?style=for-the-badge&logo=flask)

**نظام ذكاء اصطناعي طبي متكامل للتنبؤ بمرض السكري**

**Complete Medical AI System for Diabetes Prediction**

[العربية](#-النظام-بالعربي) • [English](#-system-overview)

</div>

---

## 🌟 نظرة عامة / Overview

JARVIS هو نظام ذكاء اصطناعي طبي متطور يجمع بين:
- 🎨 واجهة مستخدم فوتوريستية بتصميم Cyberpunk
- 🤖 موديل تعلم آلي KNN مدرب على بيانات حقيقية
- 🌐 API متكامل باستخدام Flask
- 🌍 دعم كامل للغتين العربية والإنجليزية

JARVIS is an advanced medical AI system combining:
- 🎨 Futuristic Cyberpunk UI design
- 🤖 KNN Machine Learning model trained on real data
- 🌐 Complete Flask API
- 🌍 Full Arabic and English language support

---

## 🎬 المميزات / Features

### 🌌 الواجهة الفوتوريستية / Futuristic Interface
- ✨ خلفية هولوجرافية متحركة مع جزيئات عائمة
- ✨ شبكة منظورية ثلاثية الأبعاد متحركة
- ✨ موجات طاقة نيون متدفقة
- ✨ تأثير المطر الرقمي (Digital Rain)
- ✨ إضاءة حجمية وتوهج سينمائي
- ✨ لوحات زجاجية شفافة (Glassmorphism)

### 🤖 الذكاء الاصطناعي / Artificial Intelligence
- 🧠 موديل K-Nearest Neighbors (KNN) مدرب
- 🧠 دقة تصل إلى ~75% على بيانات الاختبار
- 🧠 تطبيع البيانات باستخدام StandardScaler
- 🧠 8 معايير طبية للتحليل
- 🧠 تنبؤ بنسبة الخطورة مع توصيات

### 🌐 API متكامل / Complete API
- 🔗 RESTful API باستخدام Flask
- 🔗 دعم CORS للاتصال من React
- 🔗 تنبؤ فردي وجماعي
- 🔗 معالجة شاملة للأخطاء
- 🔗 استجابات ثنائية اللغة

### 🌍 دعم لغوي / Language Support
- 🇸🇦 واجهة عربية كاملة بخط Cairo
- 🇺🇸 واجهة إنجليزية مع خط Orbitron
- 🔄 تبديل تلقائي بين اللغتين
- 📝 جميع الرسائل والتوصيات بلغتين

---

## 📁 هيكل المشروع / Project Structure

```
jarvis-medical-ai/
│
├── src/
│   ├── app/
│   │   ├── App.tsx                          # المكون الرئيسي
│   │   └── components/
│   │       ├── HolographicBackground.tsx    # الخلفية المتحركة
│   │       ├── MedicalDashboardWithAPI.tsx  # لوحة التحكم الرئيسية
│   │       ├── GlassPanel.tsx               # لوحة زجاجية قابلة لإعادة الاستخدام
│   │       ├── HealthMeter.tsx              # مؤشرات دائرية للصحة
│   │       └── DataLog.tsx                  # سجل البيانات المباشر
│   └── styles/
│       ├── fonts.css                        # خطوط عربية وإنجليزية
│       └── theme.css                        # نظام الألوان والثيمات
│
├── python_api/                              # 📦 مجلد Python API
│   ├── model.py                             # تدريب الموديل
│   ├── api.py                               # خادم Flask
│   ├── requirements.txt                     # المكتبات المطلوبة
│   ├── test_api.py                          # اختبارات شاملة
│   ├── diabetes_sample.csv                  # بيانات تجريبية
│   ├── run.bat                              # تشغيل تلقائي (Windows)
│   ├── run.sh                               # تشغيل تلقائي (Mac/Linux)
│   ├── README_API.md                        # توثيق API بالإنجليزية
│   ├── quick_start.md                       # دليل البدء السريع
│   └── تعليمات_التشغيل.md                   # دليل كامل بالعربية
│
└── JARVIS_README.md                         # هذا الملف
```

---

## 🚀 البدء السريع / Quick Start

### الطريقة السريعة / Fast Method

#### Windows:
```bash
cd python_api
run.bat
```

#### Mac/Linux:
```bash
cd python_api
chmod +x run.sh
./run.sh
```

---

### الطريقة التفصيلية / Detailed Method

#### 1️⃣ تثبيت المتطلبات / Install Requirements

**Python Backend:**
```bash
cd python_api
pip install -r requirements.txt
```

**React Frontend:**
```bash
npm install
```

---

#### 2️⃣ تدريب الموديل / Train Model
```bash
cd python_api
python model.py
```

**الناتج المتوقع / Expected Output:**
```
✅ تم تدريب الموديل بنجاح!
✅ Model trained successfully!
📊 دقة الموديل / Model Accuracy: 75.32%
💾 تم حفظ الموديل في diabetes_model.pkl
```

---

#### 3️⃣ تشغيل API / Run API Server
```bash
python api.py
```

**سيعمل على / Running on:**
```
http://localhost:5000
```

---

#### 4️⃣ تشغيل واجهة React / Run React App
```bash
# في Terminal منفصل / In separate terminal
cd ..
npm run dev
```

**سيفتح على / Opens on:**
```
http://localhost:5173
```

---

#### 5️⃣ افتح المتصفح / Open Browser
```
http://localhost:5173
```

**🎉 استمتع بنظام JARVIS! / Enjoy JARVIS!**

---

## 🎮 كيفية الاستخدام / How to Use

### 1️⃣ وضع API / API Mode
- تأكد من تشغيل Python API على المنفذ 5000
- سترى مؤشر اتصال أخضر: 🟢 "Python API Connected"
- النظام سيستخدم موديل KNN الحقيقي

### 2️⃣ الوضع المحلي / Local Mode
- اضغط على زر "Local Mode"
- يعمل بدون الحاجة لـ Python API
- يستخدم خوارزمية JavaScript محلية

### 3️⃣ إدخال البيانات / Input Data
أدخل البيانات الطبية للمريض:
- 👤 اسم المريض (اختياري)
- 🤰 عدد مرات الحمل (0-17)
- 💉 مستوى الجلوكوز (0-200)
- ❤️ ضغط الدم (0-122)
- 📏 سُمك الجلد (0-99)
- 💊 مستوى الإنسولين (0-846)
- ⚖️ مؤشر كتلة الجسم BMI (0-67)
- 🧬 نسبة الوراثة (0.078-2.42)
- 🎂 العمر (21-81)

### 4️⃣ تحليل / Analyze
- اضغط على زر "🔍 فحص الحالة / Analyze"
- شاهد الرسوم المتحركة للمسح
- اقرأ النتائج في:
  - 📊 مؤشر نسبة الخطورة
  - 🎯 المؤشرات الدائرية للصحة
  - 📝 سجل النظام التفصيلي

---

## 📊 فهم النتائج / Understanding Results

### نسبة الخطورة / Risk Level
- 🟢 **0-30%**: حالة طبيعية / Normal
- 🟡 **30-60%**: خطر متوسط / Moderate Risk  
- 🔴 **60-100%**: خطر مرتفع / High Risk

### المؤشرات الصحية / Health Meters
- **الجلوكوز / Glucose**: المستوى المثالي 100
- **ضغط الدم / Blood Pressure**: المستوى المثالي 70
- **BMI**: المستوى المثالي 22
- **الإنسولين / Insulin**: المستوى المثالي 80

---

## 🔌 API Endpoints

### 1. الصفحة الرئيسية / Home
```
GET http://localhost:5000/
```

### 2. فحص الحالة / Health Check
```
GET http://localhost:5000/health
```

### 3. التنبؤ الفردي / Single Prediction
```
POST http://localhost:5000/predict
Content-Type: application/json

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

### 4. التنبؤ الجماعي / Batch Prediction
```
POST http://localhost:5000/predict-batch
Content-Type: application/json

{
  "cases": [
    {
      "name": "أحمد",
      "pregnancies": 1,
      "glucose": 100,
      ...
    }
  ]
}
```

---

## 🧪 الاختبار / Testing

### اختبار تلقائي / Automated Testing
```bash
cd python_api
python test_api.py
```

### اختبار يدوي / Manual Testing
```bash
# Health Check
curl http://localhost:5000/health

# Prediction
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"pregnancies":1,"glucose":100,"bloodPressure":70,"skinThickness":20,"insulin":80,"bmi":25,"diabetesPedigree":0.5,"age":30}'
```

---

## 🎨 التقنيات المستخدمة / Technologies Used

### Frontend
- ⚛️ React 18.3
- 📘 TypeScript 5.0
- 🎭 Motion (Framer Motion)
- 🎨 Tailwind CSS v4
- 🎯 Lucide React (Icons)
- 📊 Recharts (للرسوم البيانية المستقبلية)

### Backend
- 🐍 Python 3.8+
- 🌶️ Flask 3.0
- 🤖 scikit-learn 1.3.2
- 🐼 Pandas 2.1.3
- 🔢 NumPy 1.26.2

### AI/ML
- 🧠 K-Nearest Neighbors (KNN)
- 📊 StandardScaler للتطبيع
- 🎯 دقة ~75% على بيانات الاختبار

---

## ⚙️ التخصيص / Customization

### تغيير عدد الجيران في KNN
في `python_api/model.py`:
```python
model = KNeighborsClassifier(n_neighbors=7)  # جرّب: 3, 5, 9, 11
```

### استخدام موديل مختلف
```python
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=100)
```

### تغيير ألوان الواجهة
في `src/app/components/HolographicBackground.tsx` و المكونات الأخرى:
```typescript
const NEON_BLUE = "#00eaff";    // سيان نيون
const NEON_GREEN = "#39ff14";   // أخضر نيون
const NEON_PINK = "#ff2bd6";    // وردي نيون
```

---

## 🐛 حل المشاكل / Troubleshooting

### المشكلة: Python API لا يعمل
**الحل:**
```bash
cd python_api
pip install -r requirements.txt
python model.py
python api.py
```

### المشكلة: React لا يتصل بـ API
**الحل:**
1. تأكد أن Python API يعمل على المنفذ 5000
2. افتح Console في المتصفح للأخطاء
3. استخدم "Local Mode" كحل بديل

### المشكلة: Port 5000 مستخدم
**الحل:**
غيّر المنفذ في `api.py` و `MedicalDashboardWithAPI.tsx`

---

## 📚 الوثائق / Documentation

- 📖 [دليل API الكامل](python_api/README_API.md)
- 📖 [دليل البدء السريع](python_api/quick_start.md)
- 📖 [التعليمات بالعربية](python_api/تعليمات_التشغيل.md)

---

## 🔒 الأمان والخصوصية / Security & Privacy

- ⚠️ هذا النظام للأغراض التعليمية والتجريبية فقط
- ⚠️ لا يُستخدم كبديل للتشخيص الطبي الفعلي
- ⚠️ لا يتم حفظ أي بيانات مرضى
- ⚠️ جميع التحليلات تتم بشكل مستقل

---

## 📝 الترخيص / License

هذا المشروع مفتوح المصدر للأغراض التعليمية

This project is open source for educational purposes

---

## 🙏 الشكر والتقدير / Acknowledgments

- 💡 مستوحى من نظام JARVIS في أفلام Iron Man
- 💡 تصميم Cyberpunk متقدم
- 💡 دعم كامل للغة العربية
- 💡 موديل KNN من scikit-learn

---

## 📞 الدعم / Support

للمساعدة أو الاستفسارات:
- 📧 تحقق من ملفات التوثيق
- 🐛 استخدم test_api.py لتحديد المشاكل
- 💬 اقرأ قسم حل المشاكل

---

## 🎯 الخطوات القادمة / Next Steps

### ميزات مستقبلية محتملة:
- [ ] إضافة المزيد من الموديلات (Random Forest, Neural Networks)
- [ ] رسوم بيانية تفاعلية باستخدام Recharts
- [ ] حفظ سجل المرضى (مع Supabase)
- [ ] تصدير التقارير PDF
- [ ] تطبيق جوال (React Native)
- [ ] دعم لغات إضافية

---

<div align="center">

## ⭐ إذا أعجبك المشروع / If you like this project

**اعمل Star ⭐ للمشروع**

**Give it a Star ⭐**

---

**صُمم بـ ❤️ لنظام الذكاء الاصطناعي الطبي JARVIS**

**Built with ❤️ for JARVIS Medical AI System**

---

![JARVIS](https://img.shields.io/badge/JARVIS-Ready%20to%20Serve-00eaff?style=for-the-badge)

</div>
