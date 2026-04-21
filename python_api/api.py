from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # للسماح بالطلبات من React

# ================== LOAD MODEL ==================
try:
    with open('diabetes_model.pkl', 'rb') as f:
        model = pickle.load(f)
    
    with open('scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
    
    print("✅ تم تحميل الموديل بنجاح!")
    print("✅ Model loaded successfully!")
except FileNotFoundError:
    print("⚠️ لم يتم العثور على ملفات الموديل. يرجى تشغيل model.py أولاً!")
    print("⚠️ Model files not found. Please run model.py first!")
    model = None
    scaler = None

# ================== API ROUTES ==================

@app.route('/', methods=['GET'])
def home():
    """الصفحة الرئيسية / Home Page"""
    return jsonify({
        'status': 'running',
        'message': 'JARVIS Medical AI API is running',
        'message_ar': 'خادم API للذكاء الاصطناعي الطبي JARVIS يعمل',
        'endpoints': {
            '/predict': 'POST - للتنبؤ بمرض السكري / For diabetes prediction',
            '/health': 'GET - للتحقق من حالة الخادم / Server health check'
        }
    })

@app.route('/health', methods=['GET'])
def health():
    """فحص حالة الخادم / Health Check"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'scaler_loaded': scaler is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    """
    التنبؤ بمرض السكري
    Diabetes Prediction
    
    المدخلات المطلوبة / Required Input:
    {
        "pregnancies": number,
        "glucose": number,
        "bloodPressure": number,
        "skinThickness": number,
        "insulin": number,
        "bmi": number,
        "diabetesPedigree": number,
        "age": number
    }
    """
    
    if model is None or scaler is None:
        return jsonify({
            'error': 'Model not loaded',
            'error_ar': 'الموديل غير محمل. يرجى تشغيل model.py أولاً!',
            'message': 'Please run model.py to train and save the model first'
        }), 500
    
    try:
        # استقبال البيانات
        data = request.get_json()
        
        # التحقق من وجود جميع الحقول المطلوبة
        required_fields = [
            'pregnancies', 'glucose', 'bloodPressure', 'skinThickness',
            'insulin', 'bmi', 'diabetesPedigree', 'age'
        ]
        
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'error': f'Missing field: {field}',
                    'error_ar': f'حقل مفقود: {field}',
                    'required_fields': required_fields
                }), 400
        
        # تحضير البيانات للتنبؤ
        input_data = np.array([[
            float(data['pregnancies']),
            float(data['glucose']),
            float(data['bloodPressure']),
            float(data['skinThickness']),
            float(data['insulin']),
            float(data['bmi']),
            float(data['diabetesPedigree']),
            float(data['age'])
        ]])
        
        # تطبيق التطبيع
        scaled_data = scaler.transform(input_data)
        
        # التنبؤ
        prediction = model.predict(scaled_data)[0]
        probability = model.predict_proba(scaled_data)[0]
        
        # تحديد مستوى الخطورة بناءً على الاحتمالية
        risk_percentage = probability[1] * 100
        
        if risk_percentage < 30:
            risk_level = {
                'en': 'Normal',
                'ar': 'سليم',
                'color': 'green'
            }
        elif risk_percentage < 60:
            risk_level = {
                'en': 'Moderate Risk',
                'ar': 'خطر متوسط',
                'color': 'yellow'
            }
        else:
            risk_level = {
                'en': 'High Risk',
                'ar': 'خطر مرتفع',
                'color': 'red'
            }
        
        # إعداد النتيجة
        result = {
            'prediction': int(prediction),
            'risk_percentage': round(risk_percentage, 2),
            'probability': {
                'normal': round(probability[0] * 100, 2),
                'diabetes': round(probability[1] * 100, 2)
            },
            'risk_level': risk_level,
            'message': {
                'en': f"Prediction: {'High Risk' if prediction == 1 else 'Normal'}",
                'ar': f"النتيجة: {'خطر مرتفع' if prediction == 1 else 'طبيعي'}"
            },
            'recommendation': {
                'en': 'Medical consultation recommended' if prediction == 1 else 'Continue healthy lifestyle',
                'ar': 'يُنصح باستشارة طبية' if prediction == 1 else 'استمر في نمط حياة صحي'
            }
        }
        
        return jsonify(result)
    
    except ValueError as e:
        return jsonify({
            'error': 'Invalid input values',
            'error_ar': 'قيم مدخلة غير صحيحة',
            'details': str(e)
        }), 400
    
    except Exception as e:
        return jsonify({
            'error': 'Internal server error',
            'error_ar': 'خطأ في الخادم',
            'details': str(e)
        }), 500

# ================== BATCH PREDICTION ==================
@app.route('/predict-batch', methods=['POST'])
def predict_batch():
    """
    التنبؤ لعدة حالات مرة واحدة
    Batch Prediction for Multiple Cases
    """
    
    if model is None or scaler is None:
        return jsonify({
            'error': 'Model not loaded',
            'error_ar': 'الموديل غير محمل'
        }), 500
    
    try:
        data = request.get_json()
        cases = data.get('cases', [])
        
        if not cases:
            return jsonify({
                'error': 'No cases provided',
                'error_ar': 'لم يتم توفير حالات للفحص'
            }), 400
        
        results = []
        
        for case in cases:
            input_data = np.array([[
                float(case['pregnancies']),
                float(case['glucose']),
                float(case['bloodPressure']),
                float(case['skinThickness']),
                float(case['insulin']),
                float(case['bmi']),
                float(case['diabetesPedigree']),
                float(case['age'])
            ]])
            
            scaled_data = scaler.transform(input_data)
            prediction = model.predict(scaled_data)[0]
            probability = model.predict_proba(scaled_data)[0]
            
            results.append({
                'patient_name': case.get('name', 'Unknown'),
                'prediction': int(prediction),
                'risk_percentage': round(probability[1] * 100, 2)
            })
        
        return jsonify({
            'total_cases': len(cases),
            'results': results
        })
    
    except Exception as e:
        return jsonify({
            'error': 'Batch prediction failed',
            'error_ar': 'فشل التنبؤ الجماعي',
            'details': str(e)
        }), 500

# ================== RUN SERVER ==================
if __name__ == '__main__':
    print("\n" + "="*60)
    print("🚀 تشغيل خادم API للذكاء الاصطناعي الطبي JARVIS")
    print("🚀 Starting JARVIS Medical AI API Server")
    print("="*60)
    print(f"📍 الخادم يعمل على / Server running on: http://localhost:5000")
    print(f"📍 للاختبار / To test: http://localhost:5000/health")
    print("="*60 + "\n")
    
    # تشغيل الخادم
    app.run(
        host='0.0.0.0',  # للسماح بالوصول من أي جهاز على الشبكة
        port=5000,
        debug=True
    )
