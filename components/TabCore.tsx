import React, { useState } from 'react';
import { Server, User, Weight, Users, ArrowRight } from 'lucide-react';
import { Card } from './ui/Card';

export const TabCore: React.FC = () => {
  const [load, setLoad] = useState<number>(30);

  const getVerticalScale = () => 1 + (load / 100) * 1.5;
  const getHorizontalCount = () => Math.max(1, Math.floor((load / 100) * 4) + 1);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Vertical vs. Horizontal Scaling</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Scale <strong>UP</strong> (Vertical) makes a single node stronger. Scale <strong>OUT</strong> (Horizontal) adds more nodes to the pool.
        </p>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Simulated Traffic Load: {load}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={load}
          onChange={(e) => setLoad(Number(e.target.value))}
          className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-neon-blue"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>Low Traffic</span>
          <span>Heavy Traffic</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vertical Scaling Side */}
        <Card title="Vertical Scaling (Scale Up)" active={load > 80}>
          <div className="h-64 flex flex-col items-center justify-center relative border-b border-slate-700 mb-4 pb-4">
            <div 
              className="bg-neon-blue/10 border-2 border-neon-blue rounded-lg flex items-center justify-center transition-all duration-300 ease-out"
              style={{ 
                width: `${64 * getVerticalScale()}px`, 
                height: `${64 * getVerticalScale()}px`,
                maxWidth: '100%' 
              }}
            >
              <Server 
                className="text-neon-blue transition-all duration-300" 
                size={32 * getVerticalScale()} 
              />
            </div>
            <p className="mt-4 text-sm text-neon-blue font-mono">
              Server Size: {(getVerticalScale() * 100).toFixed(0)}%
            </p>
          </div>
          
          <div className="bg-slate-950 p-4 rounded-lg">
            <h4 className="text-slate-400 text-sm font-bold mb-2 uppercase">The Analogy</h4>
            <div className="h-32 flex items-end justify-center gap-4">
              <div className="flex flex-col items-center">
                {load > 90 ? (
                  <span className="text-4xl animate-bounce">💥</span> 
                ) : (
                  <User size={32 + (load * 0.4)} className="text-white transition-all duration-300" />
                )}
                <div className="bg-slate-700 w-16 h-4 mt-2 rounded flex items-center justify-center text-[10px]">
                  Worker
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mb-8">
                 <Weight size={24 + (load * 0.6)} className="text-red-400 transition-all duration-300" />
                 <span className="text-xs text-red-400 mt-1">{load}kg Load</span>
              </div>
            </div>
            <p className="text-xs text-center text-slate-500 mt-2">
              One worker gets stronger, but eventually collapses under too much weight.
            </p>
          </div>
        </Card>

        {/* Horizontal Scaling Side */}
        <Card title="Horizontal Scaling (Scale Out)" active={load > 20}>
           <div className="h-64 flex flex-col items-center justify-center relative border-b border-slate-700 mb-4 pb-4">
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: getHorizontalCount() }).map((_, i) => (
                <div key={i} className="bg-neon-green/10 border border-neon-green p-3 rounded-lg flex items-center justify-center animate-fadeIn">
                   <Server className="text-neon-green" size={32} />
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-neon-green font-mono">
              Active Nodes: {getHorizontalCount()}
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg">
            <h4 className="text-slate-400 text-sm font-bold mb-2 uppercase">The Analogy</h4>
            <div className="h-32 flex items-end justify-center gap-2">
              <div className="flex gap-2 items-end">
                {Array.from({ length: Math.ceil(load / 25) }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <User size={32} className="text-white" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center justify-center mb-8 ml-4">
                 <div className="flex gap-1">
                  {Array.from({ length: Math.ceil(load / 25) }).map((_, i) => (
                    <Weight key={i} size={24} className="text-red-400" />
                  ))}
                 </div>
                 <span className="text-xs text-red-400 mt-1">Shared Load</span>
              </div>
            </div>
            <p className="text-xs text-center text-slate-500 mt-2">
              More workers are hired. The individual load stays manageable.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};