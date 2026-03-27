import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, 
  AreaChart, Area, CartesianGrid, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowLeft, Download, Zap, Leaf, ShieldAlert, Cloud, CheckCircle2, Loader2, Droplets, Cpu, Coins, Award } from 'lucide-react';

export default function Dashboard({ data, onReset }) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [credits, setCredits] = useState(0);

  // Destructure the payload
  const { score, totalKwh, totalCo2, totalWater, jpt, recommendations, trendData, radarData } = data;
  
  // Enterprise Carbon Credit Sync Logic
  const handleEnterpriseSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      
      // If the score is high (>75), grant credits. Otherwise, encourage optimization.
      if (score > 75) {
        const earned = Math.floor(score * 1.5);
        setCredits(earned);
        toast.success(`AWS Billing Verified! You earned ${earned} Carbon Credits for your low-impact usage.`, {
          position: "bottom-right",
          theme: "colored",
          style: { backgroundColor: '#171717', color: '#FDF9F1', border: '2px solid #FBBF24' }
        });
      } else {
        toast.info('AWS Billing Synced. To qualify for Carbon Credits, follow the optimization insights to raise your score above 75.', {
          position: "bottom-right",
          theme: "colored",
          style: { backgroundColor: '#171717', color: '#FDF9F1', border: '2px solid #2563EB' }
        });
      }
    }, 2000);
  };

  const handleExport = () => window.print();

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 pb-24">
      <ToastContainer />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 print:hidden gap-4">
        <button onClick={onReset} className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-rta-black rounded-xl font-bold hover:bg-rta-bg shadow-[4px_4px_0px_0px_#171717] transition-all">
          <ArrowLeft className="w-5 h-5" /> Re-calculate
        </button>
        <h1 className="text-3xl font-black hidden md:block text-rta-black uppercase italic">GenAI Impact Report</h1>
        <button onClick={handleExport} className="flex items-center gap-2 px-6 py-3 bg-rta-yellow text-rta-black border-2 border-rta-black rounded-xl font-bold hover:bg-rta-black hover:text-white shadow-[4px_4px_0px_0px_#171717] transition-all">
          <Download className="w-5 h-5" /> Export PDF Report
        </button>
      </div>

      <motion.div variants={containerVars} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div variants={itemVars} className="bg-white border-4 border-rta-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_#2563EB]">
            <div className="flex items-center gap-3 mb-2">
              <ShieldAlert className="w-8 h-8 text-rta-blue" />
              <h3 className="text-xl font-bold text-gray-600">Sustainability</h3>
            </div>
            <div className="text-5xl font-black text-rta-black">{score}<span className="text-xl text-gray-400">/100</span></div>
          </motion.div>

          <motion.div variants={itemVars} className="bg-white border-4 border-rta-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_#FBBF24]">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-8 h-8 text-rta-yellow" />
              <h3 className="text-xl font-bold text-gray-600">Energy</h3>
            </div>
            <div className="text-5xl font-black text-rta-black">{totalKwh} <span className="text-xl text-gray-400">kWh</span></div>
          </motion.div>

          <motion.div variants={itemVars} className="bg-white border-4 border-rta-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_#EF4444]">
            <div className="flex items-center gap-3 mb-2">
              <Leaf className="w-8 h-8 text-rta-red" />
              <h3 className="text-xl font-bold text-gray-600">Carbon</h3>
            </div>
            <div className="text-5xl font-black text-rta-black">{totalCo2} <span className="text-xl text-gray-400">g</span></div>
          </motion.div>

          <motion.div variants={itemVars} className="bg-white border-4 border-rta-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_#06B6D4]">
            <div className="flex items-center gap-3 mb-2">
              <Droplets className="w-8 h-8 text-[#06B6D4]" />
              <h3 className="text-xl font-bold text-gray-600">Water</h3>
            </div>
            <div className="text-5xl font-black text-rta-black">{totalWater} <span className="text-xl text-gray-400">L</span></div>
          </motion.div>
        </div>

        {/* Gemini AI Recommendations */}
        <motion.div variants={itemVars} className="bg-rta-black text-white border-4 border-rta-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_#2563EB]">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
            <span className="w-4 h-4 rounded-full bg-rta-yellow animate-pulse"></span>
            Gemini AI Optimization Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations && recommendations.map((rec, index) => (
              <div key={index} className="bg-white/10 p-5 rounded-2xl border border-white/20">
                <p className="font-medium text-lg leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Historical Trends */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div variants={itemVars} className="bg-white border-4 border-rta-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_#171717]">
              <h3 className="text-xl font-black mb-2 uppercase">7-Day Emissions (g CO₂)</h3>
              <div className="h-[250px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#FBBF24" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontWeight: 'bold'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontWeight: 'bold'}} />
                    <RechartsTooltip contentStyle={{ borderRadius: '12px', border: '2px solid #171717', fontWeight: 'bold' }} />
                    <Area type="monotone" dataKey="emissions" stroke="#FBBF24" strokeWidth={4} fillOpacity={1} fill="url(#colorCo2)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={itemVars} className="bg-white border-4 border-rta-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_#06B6D4]">
              <h3 className="text-xl font-black mb-2 flex items-center gap-2 uppercase">
                <Droplets className="w-6 h-6 text-[#06B6D4]" /> 7-Day Water Cooling (L)
              </h3>
              <div className="h-[250px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontWeight: 'bold'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontWeight: 'bold'}} />
                    <RechartsTooltip cursor={{fill: 'rgba(6, 182, 212, 0.1)'}} contentStyle={{ borderRadius: '12px', border: '2px solid #171717', fontWeight: 'bold' }} />
                    <Bar dataKey="water" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Enterprise Analysis & Rewards */}
          <div className="space-y-6 flex flex-col">
            
            {/* AWS Carbon Credit Sync Card */}
            <motion.div variants={itemVars} className="bg-white border-4 border-rta-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_#171717] print:hidden">
              <div className="flex items-center gap-3 mb-4">
                <Cloud className="w-6 h-6 text-rta-blue" />
                <h3 className="text-xl font-black uppercase tracking-tight">AWS Billing Sync</h3>
              </div>
              <p className="text-gray-600 font-medium mb-6 text-sm">Verify your cloud footprint to qualify for enterprise carbon credits. Enterprises with scores above 75 receive direct billing offsets.</p>
              <button 
                onClick={handleEnterpriseSync} 
                disabled={isSyncing} 
                className="w-full flex justify-center items-center gap-2 py-4 bg-rta-yellow border-2 border-rta-black rounded-xl font-bold hover:bg-white transition-all disabled:opacity-70 shadow-[4px_4px_0px_0px_#171717]"
              >
                {isSyncing ? <Loader2 className="w-5 h-5 animate-spin text-rta-blue" /> : <RefreshCw className="w-5 h-5" />}
                {isSyncing ? 'Syncing...' : 'Sync for Credits'}
              </button>
            </motion.div>

            {/* NEW: Carbon Credit Wallet (Replaces Benchmark) */}
            <motion.div variants={itemVars} className="bg-rta-black text-white border-4 border-rta-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_#FBBF24] flex flex-col items-center justify-center text-center">
              <Award className="w-12 h-12 text-rta-yellow mb-4" />
              <h3 className="text-xl font-black uppercase mb-1">Carbon Wallet</h3>
              <p className="text-gray-400 text-xs font-bold mb-6 tracking-widest uppercase">Available Credits</p>
              
              <div className="flex items-center gap-3">
                <Coins className="w-10 h-10 text-rta-yellow" />
                <span className="text-6xl font-black">{credits}</span>
              </div>
              
              <div className="mt-8 p-3 bg-white/10 rounded-xl w-full border border-white/10">
                <p className="text-xs font-bold text-rta-yellow uppercase tracking-tighter">Status: {score > 75 ? 'Qualified' : 'Pending Optimization'}</p>
              </div>
            </motion.div>

            {/* Hardware Telemetry / Radar Chart */}
            <motion.div variants={itemVars} className="bg-white border-4 border-rta-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_#171717] flex-grow flex flex-col">
              <h3 className="text-xl font-black mb-4 flex items-center gap-2 uppercase tracking-tighter">
                <Cpu className="w-6 h-6 text-rta-blue" /> Efficiency
              </h3>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#171717', fontSize: 10, fontWeight: 'bold' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Efficiency"
                      dataKey="A"
                      stroke="#2563EB"
                      fill="#2563EB"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-2 bg-rta-bg border-2 border-rta-black rounded-xl text-center">
                <div className="text-[10px] font-black uppercase text-gray-500 tracking-widest leading-none mb-1">Hardware JPT</div>
                <div className="text-xl font-black text-rta-black">{jpt} <span className="text-xs">J/T</span></div>
              </div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

// Missing icon import needed for the sync button
import { RefreshCw } from 'lucide-react';