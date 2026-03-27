import React, { useState } from 'react';
import Landing from './components/Landing';
import Calculator from './components/Calculator';
import Dashboard from './components/Dashboard';

export default function App() {
  const [currentStep, setCurrentStep] = useState('landing');
  const [reportData, setReportData] = useState(null);

  const handleStart = () => setCurrentStep('calculator');
  
  const handleCalculate = (data) => {
    setReportData(data);
    setCurrentStep('dashboard');
  };

  const handleReset = () => {
    setReportData(null);
    setCurrentStep('landing');
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden selection:bg-rta-yellow selection:text-rta-black">
      {currentStep === 'landing' && <Landing onStart={handleStart} />}
      {currentStep === 'calculator' && <Calculator onComplete={handleCalculate} />}
      {currentStep === 'dashboard' && <Dashboard data={reportData} onReset={handleReset} />}
    </main>
  );
}