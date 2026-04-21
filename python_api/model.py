import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from xgboost import XGBClassifier  # تأكد من تثبيتها: pip install xgboost
import pickle
import os

# ================== 1. DATA LOADING & CLEANING ==================
try:
    if os.path.exists('diabetes.csv'):
        data = pd.read_csv('diabetes.csv')
        print("✅ تم تحميل ملف diabetes.csv بنجاح.")
    else:
        print("⚠️ ملف diabetes.csv غير موجود. سيتم استخدام بيانات عشوائية ضخمة للتدريب.")
        # توليد بيانات وهمية أكبر لتحسين قدرة الموديل في حال غياب الملف
        data = pd.DataFrame(np.random.randint(0, 100, size=(500, 8)), 
                            columns=['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'])
        data['Outcome'] = np.random.randint(0, 2, size=500)

    # --- تنظيف البيانات (الخطوة الأهم لرفع الدقة) ---
    # استبدال الأصفار غير المنطقية بالوسيط (Median)
    cols_to_fix = ['Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI']
    for col in cols_to_fix:
        data[col] = data[col].replace(0, np.nan)
        data[col] = data[col].fillna(data[col].median())

except Exception as e:
    print(f"❌ خطأ في معالجة البيانات: {e}")
    raise

# ================== 2. PREPROCESSING ==================
X = data.drop('Outcome', axis=1)
y = data['Outcome']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# ================== 3. ADVANCED ENSEMBLE MODEL ==================
# دمج خوارزميتين قويتين للحصول على أدق نتيجة ممكنة
rf_model = RandomForestClassifier(n_estimators=200, max_depth=10, random_state=42)
xgb_model = XGBClassifier(n_estimators=100, learning_rate=0.1, random_state=42)

# استخدام VotingClassifier لدمج النتائج
final_model = VotingClassifier(
    estimators=[('rf', rf_model), ('xgb', xgb_model)],
    voting='soft' # استخدام الاحتمالات لترجيح النتيجة
)

final_model.fit(X_train_scaled, y_train)

# حساب الدقة
accuracy = final_model.score(X_test_scaled, y_test)
print(f"📊 الدقة النهائية للموديل المطور: {accuracy * 100:.2f}%")

# ================== 4. SAVE MODEL ==================
with open('model.pkl', 'wb') as f:
    pickle.dump(final_model, f)

with open('scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)

print("💾 تم حفظ الموديل الجديد باسم model.pkl")

# ================== 5. ENHANCED PREDICTION FUNCTION ==================
def predict_diabetes_pro(input_data):
    """
    وظيفة التنبؤ الاحترافية
    """
    # تحويل المدخلات وتطبيق الـ Scaler
    scaled = scaler.transform([input_data])
    prediction = final_model.predict(scaled)[0]
    probability = final_model.predict_proba(scaled)[0]
    
    risk_score = round(probability[1] * 100, 2)
    
    result = "High Risk (خطر مرتفع)" if prediction == 1 else "Normal (طبيعي)"
    return {
        'status': result,
        'risk_percentage': f"{risk_score}%",
        'confidence': f"{round(max(probability)*100, 2)}%"
    }

# اختبار سريع
if __name__ == "__main__":
    test_case = [6, 148, 72, 35, 155, 33.6, 0.627, 50] # حالة واقعية
    print(f"\n🧪 نتيجة اختبار الموديل المطور:")
    print(predict_diabetes_pro(test_case))
