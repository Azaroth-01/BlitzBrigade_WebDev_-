import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bug, Zap, Leaf, Droplets } from 'lucide-react';

export default function Landing({ onStart }) {
  return (
    <div className="bg-[#FDF9F1] min-h-screen overflow-x-hidden pb-20">
      
      {/* 1. Sleek Small Header (Fixed or Absolute) */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm">
        <div className="bg-white border-2 border-rta-black rounded-full px-6 py-2 flex items-center justify-center shadow-[4px_4px_0px_0px_#171717]">
          <div className="flex items-center gap-3">
            <div className="bg-rta-yellow p-1 rounded-lg border-2 border-rta-black">
              <Bug className="w-5 h-5 text-rta-black" />
            </div>
            <span className="text-3xl font-black text-rta-black tracking-tighter">ऋत</span>
          </div>
        </div>
      </nav>

      {/* Main Content Wrapper */}
      <div className="max-w-7xl mx-auto pt-32 px-6 flex flex-col items-center gap-16">
        
        {/* 2. Hero Heading Section */}
        <header className="text-center">
          <h1 
            className="text-6xl md:text-[8rem] font-black text-rta-black leading-[0.85] tracking-tighter uppercase"
            style={{ textShadow: '10px 10px 0px #2563EB' }}
          >
            DON'T LET AI<br />
            <span className="text-rta-red" style={{ textShadow: '10px 10px 0px #171717' }}>KILL YOUR</span><br />
            PLANET.
          </h1>
        </header>

        {/* 3. The Assessment Card (Static & High Impact) */}
        <div className="bg-white border-4 border-rta-black rounded-[40px] w-full max-w-5xl p-8 md:p-16 shadow-[20px_20px_0px_0px_#171717] flex flex-col md:flex-row items-center gap-12">
          
          {/* Floating Bee (Kept the float for "juice") */}
          <div className="relative w-64 h-64 flex-shrink-0 flex items-center justify-center">
            <motion.div
              animate={{ y: [-15, 15, -15], rotateY: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative z-10"
            >
              <Bug className="w-48 h-48 text-rta-yellow drop-shadow-[15px_15px_0px_rgba(0,0,0,0.1)]" />
              <div className="absolute inset-0 bg-rta-yellow/30 blur-[50px] -z-10 rounded-full" />
            </motion.div>
            <div className="absolute border-2 border-dashed border-rta-black/10 w-full h-full rounded-full animate-spin-slow" />
          </div>

          {/* Content */}
          <div className="flex-grow text-center md:text-left space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-rta-black leading-tight">
              Sustainable <br /><span className="text-rta-blue">Intelligence.</span>
            </h2>
            <p className="text-gray-500 text-xl font-bold leading-tight max-w-md">
              Audit your stack. Measure Joules per Token (JPT) in real-time. Restore the natural order.
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <div className="flex items-center gap-2 px-5 py-2 bg-rta-bg border-2 border-rta-black rounded-2xl font-black text-sm shadow-[3px_3px_0px_0px_#171717]">
                <Leaf className="w-4 h-4 text-green-600" /> Carbon
              </div>
              <div className="flex items-center gap-2 px-5 py-2 bg-rta-bg border-2 border-rta-black rounded-2xl font-black text-sm shadow-[3px_3px_0px_0px_#171717]">
                <Droplets className="w-4 h-4 text-rta-blue" /> Water
              </div>
              <div className="flex items-center gap-2 px-5 py-2 bg-rta-bg border-2 border-rta-black rounded-2xl font-black text-sm shadow-[3px_3px_0px_0px_#171717]">
                <Zap className="w-4 h-4 text-rta-yellow" /> JPT
              </div>
            </div>

            <button
              onClick={onStart}
              className="group flex items-center gap-3 px-10 py-5 bg-rta-black text-white text-2xl font-black rounded-2xl shadow-[6px_6px_0px_0px_#2563EB] hover:bg-rta-blue hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              Launch Assessment
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform text-rta-yellow" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}