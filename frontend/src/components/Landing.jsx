import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Zap, ArrowRight, BarChart3 } from 'lucide-react';

export default function Landing({ onStart }) {
  // Framer Motion variants for a staggered entrance
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Decorative Background Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0] }} 
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-32 h-32 bg-rta-yellow rounded-full blur-3xl opacity-40 -z-10"
      />
      <motion.div 
        animate={{ y: [0, 20, 0] }} 
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-48 h-48 bg-rta-blue rounded-full blur-3xl opacity-30 -z-10"
      />

      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="max-w-4xl w-full text-center space-y-10"
      >
        {/* Badge */}
        <motion.div variants={itemVars} className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-rta-black font-bold text-sm shadow-[4px_4px_0px_0px_rgba(23,23,23,1)]">
            <span className="w-2 h-2 rounded-full bg-rta-red animate-pulse"></span>
            Project Rta v1.0
          </div>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1 variants={itemVars} className="text-6xl md:text-8xl font-black tracking-tight text-rta-black leading-[1.1]">
          Measure your <br/>
          <span className="text-rta-blue">GenAI</span> footprint.
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={itemVars} className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto font-medium">
          The autonomous tool to evaluate, monitor, and reduce the ecological impact of your AI workloads. Fast, visual, and highly actionable.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVars} className="pt-8">
          <motion.button
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95, y: 0 }}
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-rta-black text-white text-xl font-bold rounded-2xl shadow-[8px_8px_0px_0px_#2563EB] hover:shadow-[12px_12px_0px_0px_#FBBF24] transition-all duration-300"
          >
            Start Assessment
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Feature Grid */}
        <motion.div variants={itemVars} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
          {[
            { icon: <Zap className="w-6 h-6 text-rta-yellow" />, title: "Energy Tracking", desc: "Calculate kWh across multiple LLMs." },
            { icon: <Leaf className="w-6 h-6 text-rta-red" />, title: "CO₂ Estimation", desc: "Convert compute into real-world emissions." },
            { icon: <BarChart3 className="w-6 h-6 text-rta-blue" />, title: "Smart Insights", desc: "Gemini-powered tips to reduce footprint." }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white border-2 border-rta-black rounded-3xl p-6 text-left shadow-[4px_4px_0px_0px_rgba(23,23,23,1)]">
              <div className="w-12 h-12 rounded-xl bg-rta-bg border-2 border-rta-black flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 font-medium">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}