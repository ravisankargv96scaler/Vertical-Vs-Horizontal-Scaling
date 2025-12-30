import React, { useState, useEffect } from 'react';
import { Server, Plus, Trash2, Network } from 'lucide-react';
import { Card } from './ui/Card';
import { ServerNode } from '../types';

export const TabHorizontal: React.FC = () => {
  const [servers, setServers] = useState<ServerNode[]>([
    { id: 'srv-1', status: 'active', load: 0 }
  ]);
  const [requestPulse, setRequestPulse] = useState(0);

  // Animation loop for requests
  useEffect(() => {
    const interval = setInterval(() => {
      setRequestPulse(p => p + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const addServer = () => {
    const newId = `srv-${servers.length + 1}-${Date.now().toString().slice(-4)}`;
    setServers(prev => [...prev, { id: newId, status: 'active', load: 0 }]);
  };

  const killServer = (id: string) => {
    setServers(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">The Fleet (Horizontal)</h2>
          <p className="text-slate-400 text-sm max-w-xl">
            Adding more machines to the pool. A <strong>Load Balancer</strong> distributes traffic. If one dies, others take over.
          </p>
        </div>
        <button 
          onClick={addServer}
          className="flex items-center gap-2 bg-neon-blue text-slate-900 px-4 py-2 rounded-lg font-bold hover:bg-white transition shadow-[0_0_15px_rgba(0,210,255,0.4)]"
        >
          <Plus size={18} /> Provision Instance
        </button>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 relative min-h-[500px] flex flex-col items-center">
        
        {/* Load Balancer */}
        <div className="relative z-20 mb-16">
          <div className="w-24 h-24 bg-slate-800 border-2 border-neon-green rounded-full flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,255,157,0.15)] relative">
            <Network className="text-neon-green" size={32} />
            <span className="text-[10px] text-neon-green font-mono mt-1">Load Balancer</span>
            
            {/* Incoming Traffic Source */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <span className="text-xs text-slate-500 mb-1">Internet</span>
                <div className="h-8 w-0.5 bg-slate-700"></div>
            </div>
          </div>
        </div>

        {/* Server Grid */}
        {servers.length === 0 ? (
          <div className="text-red-500 font-mono animate-pulse mt-12 flex flex-col items-center">
             <span className="text-4xl mb-2">⚠️</span>
             SERVICE UNAVAILABLE (503)
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full px-4">
            {servers.map((server, index) => (
              <div key={server.id} className="relative group">
                
                {/* Connection Line (CSS logic to draw line from top center to this node) */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-neon-green/50 to-slate-700 -z-10"></div>
                
                {/* Request Particle Simulation */}
                <div 
                   className="absolute -top-16 left-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] z-0"
                   style={{
                     animation: `flow 1s linear infinite`,
                     animationDelay: `${index * 0.2}s`
                   }}
                ></div>

                {/* Server Node */}
                <div className="bg-slate-900 border border-slate-700 hover:border-neon-blue p-4 rounded-lg flex flex-col items-center gap-3 transition-all duration-300 relative group-hover:-translate-y-1 group-hover:shadow-lg">
                  <div className="w-2 h-2 rounded-full bg-neon-green absolute top-3 right-3 animate-pulse"></div>
                  <Server className="text-slate-300" size={32} />
                  <div className="text-center">
                    <div className="text-xs font-mono text-slate-500">{server.id}</div>
                    <div className="text-[10px] text-neon-blue mt-1">Active</div>
                  </div>
                  
                  <button 
                    onClick={() => killServer(server.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    title="Terminate Instance"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <h4 className="text-slate-400 text-xs font-bold uppercase mb-2">Total Capacity</h4>
          <p className="text-2xl font-mono text-white">{servers.length} Nodes</p>
        </Card>
        <Card className="md:col-span-1">
          <h4 className="text-slate-400 text-xs font-bold uppercase mb-2">Resilience</h4>
          <p className="text-2xl font-mono text-white">
            {servers.length > 1 ? 'High Availability' : 'Risk of Downtime'}
          </p>
        </Card>
        <Card className="md:col-span-1">
          <h4 className="text-slate-400 text-xs font-bold uppercase mb-2">Complexity</h4>
          <div className="w-full bg-slate-800 h-2 rounded-full mt-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(100, servers.length * 15)}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 mt-1">Management overhead increases with node count</p>
        </Card>
      </div>
    </div>
  );
};