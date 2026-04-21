import { HolographicBackground } from "./components/HolographicBackground";
import { MedicalDashboardWithAPI } from "./components/MedicalDashboardWithAPI";

function App() {
  return (
    <div className="relative min-h-screen bg-[#05010f] overflow-hidden">
      {/* Animated holographic background */}
      <HolographicBackground />

      {/* Main dashboard content */}
      <div className="relative z-10">
        <MedicalDashboardWithAPI />
      </div>
    </div>
  );
}

export default App;