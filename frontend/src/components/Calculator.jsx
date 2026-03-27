import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Globe, Server, ArrowRight, Loader2 } from 'lucide-react';

export default function Calculator({ onComplete }) {
  const [isCalculating, setIsCalculating] = useState(false);
  const [loadingText, setLoadingText] = useState('Initializing proxy math...');
  const [formData, setFormData] = useState({
    model: 'gemini-2.5-flash',
    requests: 5000,
    tokens: 1024,
    region: 'us-east-1'
  });

  useEffect(() => {
    if (!isCalculating) return;
    const texts = [
      'Calculating compute overhead...',
      'Mapping cloud region PUE...',
      'Analyzing cooling water footprint...',
      'Querying Gemini for insights...'
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setLoadingText(texts[i]);
    }, 800);
    return () => clearInterval(interval);
  }, [isCalculating]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCalculating(true);

    try {
      const response = await fetch('http://localhost:5000/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Backend unavailable');
      
      const data = await response.json();
      
      setTimeout(() => {
        setIsCalculating(false);
        onComplete(data);
      }, 1500);

    } catch (error) {
      console.warn("Backend failed or offline. Using Hackathon Fallback Data.");
      
      const kwh = (formData.requests * 0.0002 * (formData.tokens / 100));
      const fallbackData = {
        score: 68,
        totalKwh: kwh.toFixed(2),
        totalCo2: (kwh * 400).toFixed(2),
        totalWater: (kwh * 1.8).toFixed(2), // NEW: Water Fallback
        recommendations: [
          "Batch your prompts. Grouping multiple queries into a single API call reduces network overhead by 22%.",
          `Shift your workload from ${formData.region} to Europe-West3 (Frankfurt) to utilize 80% renewable grid energy.`,
          "Switch to Gemini 1.5 Flash for summarization tasks to cut compute energy by 60%."
        ],
        comparisonData: [
          { name: 'Your Usage', co2: 125.5 },
          { name: 'Optimized', co2: 45.2 },
          { name: 'Industry Avg', co2: 180.4 }
        ],
        trendData: [
  { day: 'Mon', emissions: 110, water: 0.5 }, { day: 'Tue', emissions: 125, water: 0.6 },
  { day: 'Wed', emissions: 105, water: 0.4 }, { day: 'Thu', emissions: 140, water: 0.7 },
  { day: 'Fri', emissions: 125, water: 0.6 }, { day: 'Sat', emissions: 80, water: 0.3 },
  { day: 'Sun', emissions: 85, water: 0.35 }
]
      };

      setTimeout(() => {
        setIsCalculating(false);
        onComplete(fallbackData);
      }, 2500); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white border-4 border-rta-black rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_0px_#171717]"
      >
        {isCalculating ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <Loader2 className="w-20 h-20 text-rta-blue animate-spin" />
            <h2 className="text-3xl font-black text-rta-black animate-pulse">
              {loadingText}
            </h2>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <h2 className="text-4xl font-black text-rta-black mb-3">Input Workload</h2>
              <p className="text-gray-600 font-medium text-lg">Define your Generative AI parameters.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-bold text-rta-black">
                    <Cpu className="w-5 h-5 text-rta-blue" /> AI Model
                  </label>
                  <select name="model" value={formData.model} onChange={handleChange} className="w-full p-4 bg-rta-bg border-2 border-rta-black rounded-xl font-medium focus:outline-none focus:ring-4 focus:ring-rta-yellow/50 transition-all cursor-pointer">
                    <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                    <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="claude-3-sonnet">Claude 3.5 Sonnet</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-bold text-rta-black">
                    <Globe className="w-5 h-5 text-rta-yellow" /> Cloud Region
                  </label>
                  <select name="region" value={formData.region} onChange={handleChange} className="w-full p-4 bg-rta-bg border-2 border-rta-black rounded-xl font-medium focus:outline-none focus:ring-4 focus:ring-rta-yellow/50 transition-all cursor-pointer">
                    <option value="us-east-1">US East (N. Virginia)</option>
                    <option value="us-west-2">US West (Oregon)</option>
                    <option value="eu-west-3">Europe (Frankfurt) - 🟢 Eco</option>
                    <option value="ap-south-1">Asia Pacific (Mumbai)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-bold text-rta-black">
                    <Zap className="w-5 h-5 text-rta-red" /> Daily Requests
                  </label>
                  <input type="number" name="requests" value={formData.requests} onChange={handleChange} className="w-full p-4 bg-rta-bg border-2 border-rta-black rounded-xl font-medium focus:outline-none focus:ring-4 focus:ring-rta-yellow/50 transition-all"/>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-bold text-rta-black">
                    <Server className="w-5 h-5 text-rta-blue" /> Avg Tokens / Request
                  </label>
                  <input type="number" name="tokens" value={formData.tokens} onChange={handleChange} className="w-full p-4 bg-rta-bg border-2 border-rta-black rounded-xl font-medium focus:outline-none focus:ring-4 focus:ring-rta-yellow/50 transition-all"/>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98, y: 0 }}
                type="submit"
                className="w-full mt-8 group relative flex items-center justify-center gap-3 px-8 py-5 bg-rta-blue text-white text-xl font-bold rounded-xl shadow-[6px_6px_0px_0px_#171717] hover:shadow-[8px_8px_0px_0px_#FBBF24] hover:bg-rta-black transition-all duration-300"
              >
                Analyze Impact
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}