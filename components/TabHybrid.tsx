import React, { useState } from 'react';
import { Server, Check } from 'lucide-react';
import { HybridSlot, ServerSize } from '../types';
import { Card } from './ui/Card';

export const TabHybrid: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ServerSize>('medium');
  const [slots, setSlots] = useState<HybridSlot[]>([
    { id: 1, content: null },
    { id: 2, content: null },
    { id: 3, content: null },
  ]);

  const placeServer = (id: number) => {
    setSlots(prev => prev.map(s => s.id === id ? { ...s, content: selectedType } : s));
  };

  const isComplete = slots.every(s => s.content === 'large');

  const getSizeClass = (size: ServerSize | null) => {
    switch(size) {
      case 'small': return 'scale-75 text-slate-500';
      case 'medium': return 'scale-100 text-neon-blue';
      case 'large': return 'scale-125 text-neon-green filter drop-shadow-[0_0_8px_rgba(0,255,157,0.5)]';
      default: return '';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Hybrid Architecture Builder</h2>
        <p className="text-slate-400 text-sm">
          Sometimes you need both. Use <strong>Horizontal Scaling</strong> for reliability, but use powerful <strong>Vertical Scaled</strong> nodes to reduce the total number of machines needed.
        </p>
        <p className="text-neon-blue text-sm mt-2">Mission: Build a cluster of 3 LARGE servers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Tool Palette */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-sm uppercase">Server Inventory</h3>
          {(['small', 'medium', 'large'] as ServerSize[]).map((type) => (
            <div 
              key={type}
              onClick={() => setSelectedType(type)}
              className={`p-4 rounded-lg border cursor-pointer flex items-center justify-between transition-all ${
                selectedType === type 
                  ? 'bg-slate-800 border-neon-blue ring-1 ring-neon-blue' 
                  : 'bg-slate-900 border-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-4">
                <Server className={getSizeClass(type)} size={24} />
                <div>
                  <p className="text-white capitalize font-bold">{type} Instance</p>
                  <p className="text-xs text-slate-500">
                    {type === 'small' ? '1 Core / 2GB' : type === 'medium' ? '4 Core / 8GB' : '16 Core / 64GB'}
                  </p>
                </div>
              </div>
              {selectedType === type && <div className="w-3 h-3 rounded-full bg-neon-blue"></div>}
            </div>
          ))}
        </div>

        {/* Builder Area */}
        <div className="md:col-span-2 bg-slate-950 rounded-xl border-2 border-dashed border-slate-800 p-8 flex flex-col items-center justify-center relative">
          
          <h3 className="absolute top-4 left-4 text-slate-600 font-mono text-xs">CLUSTER_CONFIG_REGION_US_EAST</h3>
          
          <div className="flex gap-4 md:gap-8 items-end">
            {slots.map((slot) => (
              <div 
                key={slot.id}
                onClick={() => placeServer(slot.id)}
                className="w-24 h-32 md:w-32 md:h-40 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-800 transition-colors relative"
              >
                {slot.content ? (
                  <Server className={`transition-transform duration-300 ${getSizeClass(slot.content)}`} size={48} />
                ) : (
                   <span className="text-slate-700 text-xs text-center px-2">Click to Deploy</span>
                )}
                <div className="absolute -bottom-6 text-xs text-slate-500 font-mono">NODE_0{slot.id}</div>
              </div>
            ))}
          </div>

          {isComplete && (
            <div className="absolute inset-0 bg-slate-950/90 flex items-center justify-center rounded-xl animate-fadeIn">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-neon-green rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <Check className="text-slate-900" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Architecture Optimized!</h3>
                <p className="text-slate-400">You've successfully built a powerful, resilient hybrid cluster.</p>
                <button 
                  onClick={() => setSlots(slots.map(s => ({...s, content: null})))}
                  className="mt-6 text-sm text-neon-blue hover:underline"
                >
                  Reset Simulation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};