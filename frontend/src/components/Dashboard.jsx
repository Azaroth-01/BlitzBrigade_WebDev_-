import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, 
  AreaChart, Area, CartesianGrid, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowLeft, Download, Zap, Leaf, ShieldAlert, Cloud, CheckCircle2, Loader2, Droplets, Cpu, Coins, Award, RefreshCw } from 'lucide-react';

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
      
      // If the score is high (>75), grant credits.
      if (score > 75) {
        const earned = Math.floor(score * 1.5);
        setCredits(earned);
        toast.success(`AWS Billing Verified! You earned ${earned} Carbon Credits.`, {
          position: "bottom-right",
          theme: "colored",
          style: { backgroundColor: '#171717', color: '#FDF9F1', border: '2px solid #FBBF24' }
        });
      } else {
        toast.info('AWS Billing Synced. Score must be > 75 to earn credits.', {
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
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 print:hidden gap-4">
        <button onClick={onReset} className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-rta-black rounded-xl font-bold hover:bg-rta-bg shadow-[4px_4px_0px_0px_#171717] transition-all">
          <ArrowLeft className="w-5 h-5" /> Re-calculate
        </button>
        <h1 className="text-3xl font-black hidden md:block text-rta-black uppercase italic tracking-tighter">GenAI Impact Report</h1>
        <button onClick={handleExport} className="flex items-center gap-2 px-6 py-3 bg-rta-yellow text-rta-black border-2 border-rta-black rounded-xl font-bold hover:bg-rta-black hover:text-white shadow-[4px_4px_0px_0px_#171717] transition-all">
          <Download className="w-5 h-5" /> Export PDF Report
        </button>
      </div>

      <motion.div variants={containerVars} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-8">
        
        {/* TOP METRICS ROW */}
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

        {/* GEMINI INSIGHTS */}
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

        {/* CHARTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: Trends + Financials */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Chart 1: CO2 */}
            <motion.div variants={itemVars} className="bg-white border-4 border-rta-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_#171717]">
              <h3 className="text-xl font-black mb-2 uppercase tracking-tighter">7-Day Emissions (g CO₂)</h3>
              <div className="h-[220px] w-full mt-4">
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

            {/* Chart 2: Water */}
            <motion.div variants={itemVars} className="bg-white border-4 border-rta-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_#06B6D4]">
              <h3 className="text-xl font-black mb-2 flex items-center gap-2 uppercase tracking-tighter">
                <Droplets className="w-6 h-6 text-[#06B6D4]" /> 7-Day Water Cooling (Liters)
              </h3>
              <div className="h-[220px] w-full mt-4">
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

            {/* NEW SUB-GRID: AWS Sync & Wallet side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* AWS Sync Card */}
              <motion.div variants={itemVars} className="bg-white border-4 border-rta-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_#171717] print:hidden flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Cloud className="w-6 h-6 text-rta-blue" />
                    <h3 className="text-xl font-black uppercase tracking-tight">AWS Billing Sync</h3>
                  </div>
                  <p className="text-gray-600 font-medium mb-6 text-sm">Verify your cloud footprint to qualify for enterprise carbon credits. Scores above 75 receive direct offsets.</p>
                </div>
                <button 
                  onClick={handleEnterpriseSync} 
                  disabled={isSyncing} 
                  className="w-full flex justify-center items-center gap-2 py-4 bg-rta-yellow border-2 border-rta-black rounded-xl font-bold hover:bg-white transition-all disabled:opacity-70 shadow-[4px_4px_0px_0px_#171717]"
                >
                  {isSyncing ? <Loader2 className="w-5 h-5 animate-spin text-rta-blue" /> : <RefreshCw className="w-5 h-5" />}
                  {isSyncing ? 'Syncing...' : 'Sync for Credits'}
                </button>
              </motion.div>

              {/* Carbon Wallet Card */}
              <motion.div variants={itemVars} className="bg-rta-black text-white border-4 border-rta-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_#FBBF24] flex flex-col items-center justify-center text-center h-full">
                <Award className="w-10 h-10 text-rta-yellow mb-2" />
                <h3 className="text-xl font-black uppercase mb-1">Carbon Wallet</h3>
                <p className="text-gray-400 text-[10px] font-bold mb-4 tracking-widest uppercase">Available Credits</p>
                
                <div className="flex items-center gap-3">
                  <Coins className="w-8 h-8 text-rta-yellow" />
                  <span className="text-5xl font-black">{credits}</span>
                </div>
                
                <div className="mt-6 p-2 bg-white/10 rounded-xl w-full border border-white/10">
                  <p className="text-[10px] font-bold text-rta-yellow uppercase tracking-tighter">Status: {score > 75 ? 'Qualified' : 'Pending Optimization'}</p>
                </div>
              </motion.div>

            </div>
          </div>

          {/* RIGHT COLUMN: Dedicated Full-Height Spider Radar Chart */}
          <motion.div variants={itemVars} className="bg-white border-4 border-rta-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_#171717] flex flex-col h-full">
            <h3 className="text-2xl font-black mb-4 flex items-center gap-2 uppercase tracking-tighter border-b-4 border-rta-black pb-4">
              <Cpu className="w-8 h-8 text-rta-blue" /> Efficiency
            </h3>
            
            <p className="text-gray-500 font-bold text-sm mb-6 leading-relaxed">
              Real-time hardware telemetry breakdown mapping the equilibrium between compute density, physical SLA, and environmental footprint.
            </p>

            <div className="flex-grow w-full min-h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="#e5e7eb" strokeWidth={2} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#171717', fontSize: 11, fontWeight: '900' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Efficiency"
                    dataKey="A"
                    stroke="#2563EB"
                    strokeWidth={4}
                    fill="#2563EB"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 p-4 bg-rta-bg border-4 border-rta-black rounded-2xl text-center shadow-[4px_4px_0px_0px_#171717]">
              <div className="text-xs font-black uppercase text-gray-500 tracking-widest leading-none mb-2">Hardware JPT</div>
              <div className="text-4xl font-black text-rta-black">{jpt} <span className="text-lg text-gray-400">J/Token</span></div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}