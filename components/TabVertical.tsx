import React, { useState } from 'react';
import { Cpu, Database, AlertTriangle, ArrowUpCircle } from 'lucide-react';
import { Card } from './ui/Card';
import { ServerStats } from '../types';

export const TabVertical: React.FC = () => {
  const [stats, setStats] = useState<ServerStats>({
    cpu: 2,
    ram: 4,
    cost: 100
  });
  const [error, setError] = useState<string | null>(null);

  const MAX_CPU = 128;
  const MAX_RAM = 1024; // 1TB

  const upgradeCpu = () => {
    if (stats.cpu >= MAX_CPU) {
      setError("MOTHERBOARD LIMIT REACHED: Cannot install more CPUs.");
      return;
    }
    setStats(prev => ({ ...prev, cpu: prev.cpu * 2, cost: prev.cost + 500 }));
    setError(null);
  };

  const upgradeRam = () => {
    if (stats.ram >= MAX_RAM) {
      setError("SLOT LIMIT REACHED: No more DIMM slots available.");
      return;
    }
    setStats(prev => ({ ...prev, ram: prev.ram * 2, cost: prev.cost + 200 }));
    setError(null);
  };

  // Calculate visual size based on stats (logarithmic scale for better visual fit)
  const visualScale = 1 + (Math.log2(stats.cpu) * 0.1) + (Math.log2(stats.ram) * 0.05);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">The Beast (Vertical)</h2>
          <p className="text-slate-400 text-sm">
            Vertical scaling means making a single machine more powerful. It's often the easiest way to scale initially but hits hard limits.
          </p>
        </div>

        <Card title="Hardware Upgrade Shop">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-800 rounded border border-slate-700">
              <div className="flex items-center gap-3">
                <Cpu className="text-neon-blue" />
                <div>
                  <p className="text-sm font-bold text-white">Upgrade CPU</p>
                  <p className="text-xs text-slate-400">Doubles Core Count</p>
                </div>
              </div>
              <button 
                onClick={upgradeCpu}
                disabled={stats.cpu >= MAX_CPU}
                className="px-3 py-1 bg-neon-blue text-slate-900 text-xs font-bold rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                $500
              </button>
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-800 rounded border border-slate-700">
              <div className="flex items-center gap-3">
                <Database className="text-neon-green" />
                <div>
                  <p className="text-sm font-bold text-white">Upgrade RAM</p>
                  <p className="text-xs text-slate-400">Doubles Capacity</p>
                </div>
              </div>
              <button 
                onClick={upgradeRam}
                disabled={stats.ram >= MAX_RAM}
                className="px-3 py-1 bg-neon-green text-slate-900 text-xs font-bold rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                $200
              </button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-slate-400 text-sm">Total Cost</p>
                <p className="text-2xl font-mono text-white">${stats.cost.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        {error && (
          <div className="bg-red-500/10 border border-red-500 p-4 rounded-lg flex items-start gap-3 animate-pulse">
            <AlertTriangle className="text-red-500 shrink-0" />
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}
      </div>

      <div className="lg:col-span-2 flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden min-h-[400px]">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        {/* Server Visualization */}
        <div 
          className="relative bg-slate-900 border-2 border-slate-600 rounded-lg shadow-2xl transition-all duration-500 flex flex-col items-center justify-between p-4 z-10"
          style={{ 
            width: `${200 * visualScale}px`, 
            height: `${240 * visualScale}px`,
            maxWidth: '90%',
            maxHeight: '90%'
          }}
        >
          {/* Server Lights */}
          <div className="w-full flex justify-between px-2 mb-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">SRV-01</span>
          </div>

          {/* Inner Hardware Visuals */}
          <div className="w-full flex-1 bg-slate-800 rounded border border-slate-700 p-2 grid grid-cols-2 gap-2 overflow-hidden">
             {/* Visualize CPU Cores approx */}
             <div className="bg-slate-900 rounded p-1 flex flex-wrap content-start gap-0.5 overflow-hidden">
                {Array.from({ length: Math.min(stats.cpu, 64) }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-neon-blue rounded-[1px]"></div>
                ))}
             </div>
             {/* Visualize RAM sticks approx */}
             <div className="bg-slate-900 rounded p-1 flex flex-col gap-0.5 overflow-hidden">
                {Array.from({ length: Math.min(stats.ram / 4, 32) }).map((_, i) => (
                  <div key={i} className="w-full h-1 bg-neon-green rounded-[1px]"></div>
                ))}
             </div>
          </div>

          {/* Stats Label */}
          <div className="w-full mt-2 bg-black/50 rounded p-2 text-center backdrop-blur-sm">
             <div className="text-neon-blue font-mono text-sm md:text-lg font-bold">{stats.cpu} Cores</div>
             <div className="text-neon-green font-mono text-sm md:text-lg font-bold">{stats.ram} GB RAM</div>
          </div>
        </div>

        {/* Comparison Ghost (Original Size) */}
        <div className="absolute bottom-4 right-4 opacity-30 pointer-events-none">
           <div className="w-[200px] h-[240px] border border-dashed border-white rounded-lg flex items-center justify-center">
              <span className="text-xs text-white">Original</span>
           </div>
        </div>
      </div>
    </div>
  );
};