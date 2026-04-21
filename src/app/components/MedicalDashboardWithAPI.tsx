import { useState } from "react";
import { motion } from "motion/react";
import { Activity, Brain, Heart, Droplets, TrendingUp, User, Wifi, WifiOff } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { HealthMeter } from "./HealthMeter";
import { DataLog, LogEntry } from "./DataLog";

interface PatientData {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  diabetesPedigree: number;
  age: number;
}

const initialData: PatientData = {
  pregnancies: 1,
  glucose: 100,
  bloodPressure: 70,
  skinThickness: 20,
  insulin: 80,
  bmi: 25,
  diabetesPedigree: 0.5,
  age: 30,
};

// API Configuration
const API_URL = "http://localhost:5000";
const USE_API = true; // غيّر إلى false لاستخدام الخوارزمية المحلية

export function MedicalDashboardWithAPI() {
  const [patientData, setPatientData] = useState<PatientData>(initialData);
  const [patientName, setPatientName] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [riskLevel, setRiskLevel] = useState(0);
  const [apiConnected, setApiConnected] = useState(false);
  const [useApiMode, setUseApiMode] = useState(USE_API);

  const addLog = (message: string, type: LogEntry["type"] = "info") => {
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

    setLogs((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        timestamp,
        message,
        type,
      },
    ]);
  };

  // التحقق من اتصال API
  const checkApiConnection = async () => {
    try {
      const response = await fetch(`${API_URL}/health`);
      const data = await response.json();
      if (data.status === "healthy" && data.model_loaded) {
        setApiConnected(true);
        addLog("✅ متصل بخادم Python API", "success");
        addLog("✅ Connected to Python API server", "success");
        return true;
      }
      return false;
    } catch (error) {
      setApiConnected(false);
      addLog("⚠️ خادم API غير متصل - استخدام الوضع المحلي", "warning");
      addLog("⚠️ API server disconnected - Using local mode", "warning");
      return false;
    }
  };

  // التنبؤ باستخدام Python API
  const predictWithAPI = async (data: PatientData) => {
    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const result = await response.json();
      
      addLog(`🤖 AI Analysis: ${result.message.ar}`, result.prediction === 1 ? "error" : "success");
      addLog(`🤖 AI Analysis: ${result.message.en}`, result.prediction === 1 ? "error" : "success");
      addLog(`📊 ${result.recommendation.ar}`, "info");
      addLog(`📊 ${result.recommendation.en}`, "info");
      
      return result.risk_percentage;
    } catch (error) {
      addLog("❌ فشل الاتصال بـ API", "error");
      addLog("❌ API connection failed", "error");
      throw error;
    }
  };

  // الخوارزمية المحلية (Fallback)
  const predictLocally = (data: PatientData): number => {
    let score = 0;

    if (data.glucose > 140) score += 30;
    else if (data.glucose > 120) score += 20;
    else if (data.glucose > 100) score += 10;

    if (data.bmi > 30) score += 20;
    else if (data.bmi > 25) score += 10;

    if (data.age > 50) score += 15;
    else if (data.age > 40) score += 10;

    if (data.bloodPressure > 80) score += 10;
    if (data.insulin > 150) score += 10;
    if (data.diabetesPedigree > 0.5) score += 15;
    if (data.pregnancies > 5) score += 5;

    return Math.min(score, 100);
  };

  const calculateHealthPercentage = (
    value: number,
    min: number,
    max: number,
    optimal: number
  ): number => {
    const distance = Math.abs(value - optimal);
    const range = max - min;
    const percentage = Math.max(0, 100 - (distance / range) * 200);
    return percentage;
  };

  const handleAnalyze = async () => {
    setIsScanning(true);
    const name = patientName || "مريض غير معروف";

    addLog(`بدء تحليل البيانات للمريض: ${name}`, "info");
    addLog("Initializing AI medical analysis...", "info");

    try {
      let risk = 0;

      // محاولة استخدام API أولاً
      if (useApiMode) {
        const isConnected = await checkApiConnection();
        
        if (isConnected) {
          addLog("🔗 استخدام موديل Python KNN", "info");
          addLog("🔗 Using Python KNN model", "info");
          risk = await predictWithAPI(patientData);
        } else {
          addLog("⚠️ التبديل إلى الخوارزمية المحلية", "warning");
          addLog("⚠️ Switching to local algorithm", "warning");
          risk = predictLocally(patientData);
        }
      } else {
        addLog("🔧 استخدام الخوارزمية المحلية", "info");
        addLog("🔧 Using local algorithm", "info");
        risk = predictLocally(patientData);
      }

      setTimeout(() => {
        setRiskLevel(risk);

        let status = "";
        let statusEn = "";
        let type: LogEntry["type"] = "info";

        if (risk < 30) {
          status = "✅ حالة طبيعية - لا يوجد خطر";
          statusEn = "Normal - No Risk";
          type = "success";
        } else if (risk < 60) {
          status = "⚠️ خطر متوسط - يُنصح بالمتابعة";
          statusEn = "Moderate Risk - Follow-up Recommended";
          type = "warning";
        } else {
          status = "🚨 خطر مرتفع - يتطلب تدخل طبي";
          statusEn = "High Risk - Medical Intervention Required";
          type = "error";
        }

        addLog(status, type);
        addLog(statusEn, type);
        addLog(
          `مستوى الخطورة: ${risk.toFixed(0)}% | Risk Level: ${risk.toFixed(0)}%`,
          type
        );

        const metrics = [
          {
            name: "الجلوكوز",
            value: calculateHealthPercentage(patientData.glucose, 70, 200, 100),
          },
          {
            name: "ضغط الدم",
            value: calculateHealthPercentage(patientData.bloodPressure, 40, 120, 70),
          },
          {
            name: "BMI",
            value: calculateHealthPercentage(patientData.bmi, 15, 40, 22),
          },
          {
            name: "الإنسولين",
            value: calculateHealthPercentage(patientData.insulin, 0, 300, 80),
          },
        ];

        addLog(
          `القراءات: ${metrics.map((m) => `${m.name}:${m.value.toFixed(0)}%`).join(" | ")}`,
          "info"
        );

        setIsScanning(false);
      }, 1500);
    } catch (error) {
      addLog("❌ حدث خطأ في التحليل", "error");
      addLog("❌ Analysis error occurred", "error");
      
      // Fallback إلى الخوارزمية المحلية
      const risk = predictLocally(patientData);
      setRiskLevel(risk);
      setIsScanning(false);
    }
  };

  const handleClearLog = () => {
    setLogs([]);
    addLog("تم مسح السجل", "info");
    addLog("Log cleared", "info");
  };

  const updateField = (field: keyof PatientData, value: number) => {
    setPatientData((prev) => ({ ...prev, [field]: value }));
  };

  const getRiskColor = () => {
    if (riskLevel < 30) return "from-green-500 to-cyan-500";
    if (riskLevel < 60) return "from-yellow-500 to-orange-500";
    return "from-orange-500 to-pink-500";
  };

  const getRiskText = () => {
    if (riskLevel < 30) return { ar: "سليم", en: "Normal" };
    if (riskLevel < 60) return { ar: "خطر متوسط", en: "Moderate Risk" };
    return { ar: "خطر مرتفع", en: "High Risk" };
  };

  const toggleApiMode = () => {
    setUseApiMode(!useApiMode);
    addLog(
      !useApiMode ? "🔗 تم تفعيل وضع API" : "🔧 تم تفعيل الوضع المحلي",
      "info"
    );
    addLog(
      !useApiMode ? "🔗 API mode enabled" : "🔧 Local mode enabled",
      "info"
    );
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <Brain className="w-12 h-12 text-cyan-400" />
          <h1
            className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 
            bg-clip-text text-transparent"
          >
            JARVIS
          </h1>
          <Brain className="w-12 h-12 text-cyan-400" />
        </div>
        <h2 className="text-3xl font-bold text-cyan-400 mb-2">
          نظام الذكاء الاصطناعي الطبي
        </h2>
        <p className="text-cyan-300/60 text-lg">
          Medical AI Diagnostic System
        </p>
        
        {/* API Status Indicator */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <motion.button
            onClick={toggleApiMode}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              useApiMode
                ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                : "bg-gray-500/20 border-gray-500/50 text-gray-400"
            }`}
          >
            {useApiMode ? (
              <Wifi className="w-4 h-4" />
            ) : (
              <WifiOff className="w-4 h-4" />
            )}
            <span className="text-sm font-bold">
              {useApiMode ? "API Mode" : "Local Mode"}
            </span>
          </motion.button>
          
          {apiConnected && useApiMode && (
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Python API Connected</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Patient Input Panel */}
        <div className="lg:col-span-2">
          <GlassPanel>
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-cyan-400" />
              <h3 className="text-2xl font-bold text-cyan-400">
                بيانات المريض
              </h3>
              <span className="text-cyan-300/60 text-sm">Patient Data</span>
            </div>

            {/* Patient Name */}
            <div className="mb-6">
              <label className="block text-cyan-300 mb-2 font-bold">
                اسم المريض / Patient Name
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="أدخل اسم المريض"
                className="w-full bg-black/40 border border-cyan-500/30 rounded-lg px-4 py-3 
                  text-white placeholder-cyan-500/30 focus:outline-none focus:border-cyan-500
                  focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            {/* Medical Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  key: "pregnancies" as keyof PatientData,
                  labelAr: "عدد مرات الحمل",
                  labelEn: "Pregnancies",
                  icon: Activity,
                },
                {
                  key: "glucose" as keyof PatientData,
                  labelAr: "الجلوكوز",
                  labelEn: "Glucose",
                  icon: Droplets,
                },
                {
                  key: "bloodPressure" as keyof PatientData,
                  labelAr: "ضغط الدم",
                  labelEn: "Blood Pressure",
                  icon: Heart,
                },
                {
                  key: "skinThickness" as keyof PatientData,
                  labelAr: "سُمك الجلد",
                  labelEn: "Skin Thickness",
                  icon: Activity,
                },
                {
                  key: "insulin" as keyof PatientData,
                  labelAr: "الإنسولين",
                  labelEn: "Insulin",
                  icon: Droplets,
                },
                {
                  key: "bmi" as keyof PatientData,
                  labelAr: "BMI",
                  labelEn: "Body Mass Index",
                  icon: TrendingUp,
                },
                {
                  key: "diabetesPedigree" as keyof PatientData,
                  labelAr: "نسبة الوراثة",
                  labelEn: "Diabetes Pedigree",
                  icon: Activity,
                  step: 0.01,
                },
                {
                  key: "age" as keyof PatientData,
                  labelAr: "العمر",
                  labelEn: "Age",
                  icon: User,
                },
              ].map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.key}>
                    <label className="flex items-center gap-2 text-cyan-300 mb-2">
                      <Icon className="w-4 h-4" />
                      <span className="font-bold">{field.labelAr}</span>
                      <span className="text-cyan-300/50 text-sm">
                        {field.labelEn}
                      </span>
                    </label>
                    <input
                      type="number"
                      value={patientData[field.key]}
                      onChange={(e) =>
                        updateField(field.key, parseFloat(e.target.value) || 0)
                      }
                      step={field.step || 1}
                      className="w-full bg-black/40 border border-cyan-500/30 rounded-lg px-4 py-2 
                        text-white focus:outline-none focus:border-cyan-500
                        focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>
                );
              })}
            </div>

            {/* Analyze Button */}
            <motion.button
              onClick={handleAnalyze}
              disabled={isScanning}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-purple-500 
                text-white font-bold py-4 px-8 rounded-lg text-xl
                hover:from-cyan-400 hover:to-purple-400 transition-all
                disabled:opacity-50 disabled:cursor-not-allowed
                shadow-lg shadow-cyan-500/50"
            >
              {isScanning ? (
                <span className="flex items-center justify-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  />
                  جاري المسح... Scanning...
                </span>
              ) : (
                <span>🔍 فحص الحالة / Analyze</span>
              )}
            </motion.button>
          </GlassPanel>

          {/* Data Log */}
          <GlassPanel className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold text-cyan-400">
                  سجل النظام
                </h3>
                <span className="text-cyan-300/60 text-sm">System Log</span>
              </div>
              <motion.button
                onClick={handleClearLog}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-pink-500/20 border border-pink-500/50 text-pink-400 
                  px-4 py-2 rounded-lg text-sm font-bold hover:bg-pink-500/30 transition-all"
              >
                🗑️ مسح السجل
              </motion.button>
            </div>
            <DataLog entries={logs} />
          </GlassPanel>
        </div>

        {/* Health Monitoring Panel */}
        <div>
          <GlassPanel>
            <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
              تحليل الحالة الصحية
            </h3>
            <p className="text-cyan-300/60 text-center mb-6">
              Health Status Analysis
            </p>

            {/* Risk Meter */}
            <div className="mb-8">
              <div className="text-center mb-4">
                <div className="text-cyan-400 font-bold mb-2">نسبة الخطورة</div>
                <div className="text-cyan-300/60 text-sm mb-4">Risk Level</div>

                {/* Risk Bar */}
                <div className="relative h-8 bg-black/40 rounded-full overflow-hidden border border-cyan-500/30">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${getRiskColor()}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${riskLevel}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                      boxShadow: `0 0 20px ${
                        riskLevel < 30
                          ? "#39ff14"
                          : riskLevel < 60
                          ? "#ffeb3b"
                          : "#ff2bd6"
                      }`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                    {riskLevel.toFixed(0)}%
                  </div>
                </div>

                <div className="mt-4 text-xl font-bold">
                  <div
                    className="text-transparent bg-clip-text bg-gradient-to-r"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${
                        riskLevel < 30
                          ? "#39ff14, #00eaff"
                          : riskLevel < 60
                          ? "#ffeb3b, #ff9800"
                          : "#ff9800, #ff2bd6"
                      })`,
                    }}
                  >
                    {getRiskText().ar}
                  </div>
                  <div className="text-cyan-300/60 text-sm">
                    {getRiskText().en}
                  </div>
                </div>
              </div>
            </div>

            {/* Health Meters */}
            <div className="grid grid-cols-2 gap-6">
              <HealthMeter
                value={calculateHealthPercentage(
                  patientData.glucose,
                  70,
                  200,
                  100
                )}
                label="الجلوكوز"
                labelEn="Glucose"
              />
              <HealthMeter
                value={calculateHealthPercentage(
                  patientData.bloodPressure,
                  40,
                  120,
                  70
                )}
                label="ضغط الدم"
                labelEn="Blood Pressure"
              />
              <HealthMeter
                value={calculateHealthPercentage(patientData.bmi, 15, 40, 22)}
                label="BMI"
                labelEn="Body Mass"
              />
              <HealthMeter
                value={calculateHealthPercentage(
                  patientData.insulin,
                  0,
                  300,
                  80
                )}
                label="الإنسولين"
                labelEn="Insulin"
              />
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
