import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, Globe, Server, ArrowRight, Loader2, Key, RefreshCw, CheckCircle2, X, User, ChevronRight } from 'lucide-react';

export default function Calculator({ onComplete }) {
  const [isCalculating, setIsCalculating] = useState(false);
  const [syncState, setSyncState] = useState('idle');
  const [loadingText, setLoadingText] = useState('');
  const [showOAuthModal, setShowOAuthModal] = useState(false);
  const [showEmailPicker, setShowEmailPicker] = useState(false);

  // Simulated Device Emails
  const myEmails = [
    "lavya.engineering@gmail.com",
    "aaryamaan.dev@outlook.com",
    "student.project@college.edu"
  ];

  const [formData, setFormData] = useState({
    model: 'gemini-2.5-flash',
    requests: 5000,
    tokens: 1024,
    region: 'us-east-1'
  });

  useEffect(() => {
    if (!isCalculating || syncState !== 'idle') return;
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
  }, [isCalculating, syncState]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAutoSync = async (user = "Authorized User") => {
    setShowOAuthModal(false);
    setShowEmailPicker(false);
    setIsCalculating(true);
    
    setSyncState('auth');
    setLoadingText(`Authenticating ${user}...`);
    await new Promise(r => setTimeout(r, 1200));
    
    setSyncState('fetching');
    setLoadingText('Extracting telemetry & billing logs...');
    await new Promise(r => setTimeout(r, 2000));
    
    setSyncState('done');
    setLoadingText('Generating report...');
    await new Promise(r => setTimeout(r, 800));

    const massiveRequests = 145000;
    const kwh = (massiveRequests * 0.0002 * (2500 / 100));
    
    onComplete({
      score: 42, 
      totalKwh: kwh.toFixed(2),
      totalCo2: (kwh * 400).toFixed(2),
      totalWater: (kwh * 1.8).toFixed(2),
      recommendations: [
        "Your AI usage spikes at 2 AM EST. Batching non-critical jobs to off-peak hours reduces emissions by 14%.",
        "Semantic caching could cut compute energy by 40%.",
        "Switch tasks to Gemini 2.5 Flash for 65% energy reduction per 1k tokens."
      ],
      comparisonData: [
        { name: 'Your Usage', co2: parseFloat((kwh * 400).toFixed(2)) },
        { name: 'Optimized', co2: parseFloat((kwh * 400 * 0.4).toFixed(2)) },
        { name: 'Industry Avg', co2: 85000 }
      ],
      trendData: Array.from({length: 7}, (_, i) => ({
          day: `Day ${i+1}`,
          emissions: parseFloat(((kwh * 400 / 7) * (1 + (Math.random() * 0.4 - 0.2))).toFixed(2)),
          water: parseFloat(((kwh * 1.8 / 7) * (1 + (Math.random() * 0.4 - 0.2))).toFixed(2))
      }))
    });
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
      if (!response.ok) throw new Error('Backend offline');
      const data = await response.json();
      setTimeout(() => { setIsCalculating(false); onComplete(data); }, 1500);
    } catch (error) {
      // Manual Fallback Math
      const kwh = (formData.requests * 0.0002 * (formData.tokens / 100));
      const fallbackData = {
        score: 68, totalKwh: kwh.toFixed(2), totalCo2: (kwh * 400).toFixed(2), totalWater: (kwh * 1.8).toFixed(2),
        recommendations: ["Batch requests.", "Switch regions.", "Use lighter models."],
        comparisonData: [{ name: 'Usage', co2: kwh * 400 }, { name: 'Optimized', co2: kwh * 400 * 0.4 }, { name: 'Avg', co2: 180 }],
        trendData: Array.from({length: 7}, (_, i) => ({ day: `Day ${i+1}`, emissions: (kwh * 400 / 7) * (1 + Math.random()), water: (kwh * 1.8 / 7) * (1 + Math.random()) }))
      };
      setTimeout(() => { setIsCalculating(false); onComplete(fallbackData); }, 2500);
    }
  };

  if (isCalculating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-rta-bg">
        <Loader2 className={`w-24 h-24 mb-8 animate-spin ${syncState !== 'idle' ? 'text-rta-yellow' : 'text-rta-blue'}`} />
        <h2 className="text-3xl md:text-4xl font-black text-rta-black animate-pulse text-center">{loadingText}</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 md:p-12 relative">
      <AnimatePresence>
        {showOAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border-4 border-rta-black rounded-3xl p-6 md:p-8 max-w-md w-full shadow-[8px_8px_0px_0px_#171717]"
            >
              {!showEmailPicker ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-black">Authorization</h3>
                    <button onClick={() => setShowOAuthModal(false)}><X className="w-6 h-6" /></button>
                  </div>
                  <div className="space-y-3">
                    <button onClick={() => handleAutoSync("Aaryamaan")} className="w-full flex items-center gap-4 p-4 bg-rta-bg border-2 border-rta-black rounded-xl hover:shadow-[4px_4px_0px_0px_#2563EB] transition-all text-left">
                      <div className="w-12 h-12 rounded-full bg-rta-blue flex items-center justify-center text-white font-black">AR</div>
                      <div className="flex-grow">
                        <div className="font-black text-rta-black uppercase text-xs tracking-widest mb-1">Account 01</div>
                        <div className="font-black text-rta-black text-lg leading-none">Aaryamaan</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                    <button onClick={() => handleAutoSync("Lavya")} className="w-full flex items-center gap-4 p-4 bg-rta-bg border-2 border-rta-black rounded-xl hover:shadow-[4px_4px_0px_0px_#2563EB] transition-all text-left">
                      <div className="w-12 h-12 rounded-full bg-rta-blue flex items-center justify-center text-white font-black">LV</div>
                      <div className="flex-grow">
                        <div className="font-black text-rta-black uppercase text-xs tracking-widest mb-1">Account 02</div>
                        <div className="font-black text-rta-black text-lg leading-none">Lavya</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                    <button onClick={() => setShowEmailPicker(true)} className="w-full flex items-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-rta-black transition-all text-left">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center"><User className="w-6 h-6 text-gray-500" /></div>
                      <div className="font-bold text-gray-500">Use another account</div>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <button onClick={() => setShowEmailPicker(false)} className="text-rta-blue font-bold text-sm">← Back</button>
                    <h3 className="text-xl font-black">System Accounts</h3>
                    <button onClick={() => setShowOAuthModal(false)}><X className="w-6 h-6" /></button>
                  </div>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {myEmails.map((email, i) => (
                      <button key={i} onClick={() => handleAutoSync(email)} className="w-full flex items-center gap-3 p-3 hover:bg-rta-bg rounded-lg border border-transparent hover:border-gray-200 transition-all text-left">
                        <div className="w-8 h-8 rounded-full bg-rta-yellow flex items-center justify-center text-[10px] font-black">{email[0].toUpperCase()}</div>
                        <span className="font-medium text-sm text-gray-700 truncate">{email}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl w-full">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-rta-black mb-4">Select Data Source</h2>
          <p className="text-gray-600 font-medium text-xl">Connect your account or input parameters manually.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* PATH 1: Auto-Sync */}
          <div className="bg-rta-yellow border-4 border-rta-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_#171717] h-full flex flex-col justify-between">
            <div>
              <div className="inline-block bg-rta-black text-white text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">Recommended</div>
              <h3 className="text-3xl font-black mb-4 flex items-center gap-3"><RefreshCw className="w-8 h-8" /> Auto-Sync</h3>
              <p className="font-medium mb-8 leading-relaxed text-lg">Extract 30-day telemetry securely via OpenAI/Anthropic OAuth.</p>
              <ul className="space-y-3 mb-8 font-bold text-rta-black/80">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-rta-blue"/> Secure Handshake</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-rta-blue"/> Token Log Extraction</li>
              </ul>
            </div>
            <button onClick={() => setShowOAuthModal(true)} className="w-full py-5 bg-white border-4 border-rta-black font-black text-xl rounded-xl shadow-[6px_6px_0px_0px_#171717] hover:bg-rta-bg transition-all flex items-center justify-center gap-3">
              <Key className="w-6 h-6" /> Connect Account
            </button>
          </div>

          {/* PATH 2: Full Manual Form */}
          <div className="bg-white border-4 border-rta-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_#171717]">
             <h3 className="text-2xl font-black mb-6 flex items-center gap-2"><ArrowRight className="w-6 h-6 text-rta-blue" /> Manual Entry</h3>
             <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-bold text-rta-black"><Cpu className="w-4 h-4 text-rta-blue" /> AI Model</label>
                    <select name="model" value={formData.model} onChange={handleChange} className="w-full p-4 bg-rta-bg border-2 border-rta-black rounded-xl font-bold cursor-pointer">
                      <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                      <option value="gpt-4o">GPT-4o</option>
                      <option value="claude-3-sonnet">Claude 3.5 Sonnet</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-bold text-rta-black"><Globe className="w-4 h-4 text-rta-yellow" /> Region</label>
                    <select name="region" value={formData.region} onChange={handleChange} className="w-full p-4 bg-rta-bg border-2 border-rta-black rounded-xl font-bold cursor-pointer">
                      <option value="us-east-1">US East (Virginia)</option>
                      <option value="eu-west-3">Europe (Frankfurt) 🟢</option>
                      <option value="ap-south-1">Asia Pacific (Mumbai)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-bold text-rta-black"><Zap className="w-4 h-4 text-rta-red" /> Daily Requests</label>
                    <input type="number" name="requests" value={formData.requests} onChange={handleChange} className="w-full p-4 bg-rta-bg border-2 border-rta-black rounded-xl font-bold"/>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-bold text-rta-black"><Server className="w-4 h-4 text-rta-cyan" /> Avg Tokens</label>
                    <input type="number" name="tokens" value={formData.tokens} onChange={handleChange} className="w-full p-4 bg-rta-bg border-2 border-rta-black rounded-xl font-bold"/>
                  </div>
                </div>
                <button type="submit" className="w-full py-5 bg-rta-black text-white text-xl font-black rounded-xl shadow-[8px_8px_0px_0px_#2563EB] hover:shadow-[4px_4px_0px_0px_#FBBF24] transition-all">
                  Analyze Footprint
                </button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
}