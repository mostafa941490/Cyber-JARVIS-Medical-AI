"""
اختبار API - Test Script
هذا السكريبت يختبر جميع endpoints في API
This script tests all API endpoints
"""

import requests
import json

API_URL = "http://localhost:5000"

def print_header(text):
    """طباعة عنوان منسق"""
    print("\n" + "="*60)
    print(f"  {text}")
    print("="*60)

def test_home():
    """اختبار الصفحة الرئيسية"""
    print_header("🏠 اختبار الصفحة الرئيسية / Testing Home Endpoint")
    
    try:
        response = requests.get(f"{API_URL}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ خطأ / Error: {e}")
        return False

def test_health():
    """اختبار فحص الحالة"""
    print_header("❤️ اختبار فحص الحالة / Testing Health Check")
    
    try:
        response = requests.get(f"{API_URL}/health")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ خطأ / Error: {e}")
        return False

def test_predict_normal():
    """اختبار تنبؤ - حالة طبيعية"""
    print_header("✅ اختبار تنبؤ - حالة طبيعية / Testing Prediction - Normal Case")
    
    data = {
        "pregnancies": 1,
        "glucose": 100,
        "bloodPressure": 70,
        "skinThickness": 20,
        "insulin": 80,
        "bmi": 25,
        "diabetesPedigree": 0.5,
        "age": 30
    }
    
    try:
        response = requests.post(
            f"{API_URL}/predict",
            json=data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2, ensure_ascii=False)}")
        
        if response.status_code == 200:
            print(f"\n📊 النتيجة / Result:")
            print(f"   - التنبؤ / Prediction: {result['prediction']}")
            print(f"   - نسبة الخطورة / Risk: {result['risk_percentage']}%")
            print(f"   - المستوى / Level: {result['risk_level']['ar']} / {result['risk_level']['en']}")
            print(f"   - التوصية / Recommendation: {result['recommendation']['ar']}")
        
        return response.status_code == 200
    except Exception as e:
        print(f"❌ خطأ / Error: {e}")
        return False

def test_predict_high_risk():
    """اختبار تنبؤ - حالة خطر مرتفع"""
    print_header("🚨 اختبار تنبؤ - خطر مرتفع / Testing Prediction - High Risk Case")
    
    data = {
        "pregnancies": 6,
        "glucose": 148,
        "bloodPressure": 72,
        "skinThickness": 35,
        "insulin": 0,
        "bmi": 33.6,
        "diabetesPedigree": 0.627,
        "age": 50
    }
    
    try:
        response = requests.post(
            f"{API_URL}/predict",
            json=data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2, ensure_ascii=False)}")
        
        if response.status_code == 200:
            print(f"\n📊 النتيجة / Result:")
            print(f"   - التنبؤ / Prediction: {result['prediction']}")
            print(f"   - نسبة الخطورة / Risk: {result['risk_percentage']}%")
            print(f"   - المستوى / Level: {result['risk_level']['ar']} / {result['risk_level']['en']}")
            print(f"   - التوصية / Recommendation: {result['recommendation']['ar']}")
        
        return response.status_code == 200
    except Exception as e:
        print(f"❌ خطأ / Error: {e}")
        return False

def test_predict_batch():
    """اختبار التنبؤ الجماعي"""
    print_header("📦 اختبار التنبؤ الجماعي / Testing Batch Prediction")
    
    data = {
        "cases": [
            {
                "name": "أحمد محمد",
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
                "name": "فاطمة علي",
                "pregnancies": 6,
                "glucose": 148,
                "bloodPressure": 72,
                "skinThickness": 35,
                "insulin": 0,
                "bmi": 33.6,
                "diabetesPedigree": 0.627,
                "age": 50
            },
            {
                "name": "سارة حسن",
                "pregnancies": 3,
                "glucose": 120,
                "bloodPressure": 75,
                "skinThickness": 25,
                "insulin": 100,
                "bmi": 28,
                "diabetesPedigree": 0.4,
                "age": 35
            }
        ]
    }
    
    try:
        response = requests.post(
            f"{API_URL}/predict-batch",
            json=data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2, ensure_ascii=False)}")
        
        if response.status_code == 200:
            print(f"\n📊 النتائج / Results:")
            print(f"   - عدد الحالات / Total Cases: {result['total_cases']}")
            for i, case_result in enumerate(result['results'], 1):
                print(f"   {i}. {case_result['patient_name']}: {case_result['risk_percentage']}%")
        
        return response.status_code == 200
    except Exception as e:
        print(f"❌ خطأ / Error: {e}")
        return False

def test_invalid_input():
    """اختبار مدخلات غير صحيحة"""
    print_header("⚠️ اختبار مدخلات غير صحيحة / Testing Invalid Input")
    
    data = {
        "pregnancies": 1,
        "glucose": 100
        # بيانات ناقصة / Missing fields
    }
    
    try:
        response = requests.post(
            f"{API_URL}/predict",
            json=data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
        
        # نتوقع خطأ 400
        return response.status_code == 400
    except Exception as e:
        print(f"❌ خطأ / Error: {e}")
        return False

def run_all_tests():
    """تشغيل جميع الاختبارات"""
    print("\n" + "🧪"*30)
    print("  بدء اختبار API للذكاء الاصطناعي الطبي JARVIS")
    print("  Starting JARVIS Medical AI API Tests")
    print("🧪"*30)
    
    tests = [
        ("الصفحة الرئيسية / Home", test_home),
        ("فحص الحالة / Health Check", test_health),
        ("تنبؤ طبيعي / Normal Prediction", test_predict_normal),
        ("تنبؤ خطر مرتفع / High Risk Prediction", test_predict_high_risk),
        ("تنبؤ جماعي / Batch Prediction", test_predict_batch),
        ("مدخلات غير صحيحة / Invalid Input", test_invalid_input),
    ]
    
    results = []
    
    for test_name, test_func in tests:
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"❌ فشل الاختبار / Test failed: {test_name}")
            print(f"الخطأ / Error: {e}")
            results.append((test_name, False))
    
    # ملخص النتائج / Summary
    print_header("📊 ملخص الاختبارات / Tests Summary")
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ نجح / Passed" if result else "❌ فشل / Failed"
        print(f"{status}: {test_name}")
    
    print(f"\n📈 النتيجة الإجمالية / Overall Result: {passed}/{total} نجح / passed")
    
    if passed == total:
        print("\n🎉 جميع الاختبارات نجحت! / All tests passed!")
        print("✅ API جاهز للاستخدام / API is ready to use")
    else:
        print(f"\n⚠️ {total - passed} اختبار(ات) فشلت / test(s) failed")
        print("تحقق من الأخطاء أعلاه / Check errors above")

if __name__ == "__main__":
    print("\n⚡ تأكد من تشغيل الخادم أولاً باستخدام:")
    print("⚡ Make sure the server is running first using:")
    print("   python api.py\n")
    
    input("اضغط Enter للبدء / Press Enter to start...")
    
    run_all_tests()
