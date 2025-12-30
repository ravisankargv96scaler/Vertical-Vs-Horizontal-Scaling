import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { Card } from './ui/Card';

export const TabDecision: React.FC = () => {
  const [factors, setFactors] = useState({
    highAvailability: false,
    budgetConstraint: false,
    complexLogic: false,
    rapidSpikes: false,
  });

  const [recommendation, setRecommendation] = useState<'vertical' | 'horizontal' | 'hybrid'>('vertical');

  useEffect(() => {
    const { highAvailability, budgetConstraint, complexLogic, rapidSpikes } = factors;
    
    if (highAvailability && rapidSpikes) {
      setRecommendation('horizontal');
    } else if (budgetConstraint && !highAvailability && !rapidSpikes) {
      setRecommendation('vertical');
    } else if (complexLogic && highAvailability) {
      setRecommendation('hybrid'); // Complex often needs big boxes, HA needs scale
    } else if (rapidSpikes) {
      setRecommendation('horizontal');
    } else {
      setRecommendation('vertical');
    }
  }, [factors]);

  const toggle = (key: keyof typeof factors) => {
    setFactors(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">The Architect's Calculator</h2>
          <p className="text-slate-400 text-sm">Input your project constraints to get a scaling strategy recommendation.</p>
        </div>

        <div className="space-y-3">
          {[
            { key: 'highAvailability', label: 'Need High Availability (99.99% uptime)?', sub: 'System cannot go down even if a server fails.' },
            { key: 'rapidSpikes', label: 'Expect Rapid Traffic Spikes?', sub: 'Black Friday sales, viral posts, etc.' },
            { key: 'budgetConstraint', label: 'Tight Budget / Startup?', sub: 'Engineering time is expensive. Hardware is cheap.' },
            { key: 'complexLogic', label: 'Monolithic / Legacy App?', sub: 'Hard to split into microservices.' },
          ].map((item) => (
            <div 
              key={item.key}
              onClick={() => toggle(item.key as keyof typeof factors)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-4 ${
                factors[item.key as keyof typeof factors] 
                  ? 'bg-neon-blue/10 border-neon-blue' 
                  : 'bg-slate-800 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${
                 factors[item.key as keyof typeof factors] ? 'bg-neon-blue border-neon-blue' : 'border-slate-500'
              }`}>
                {factors[item.key as keyof typeof factors] && <CheckCircle size={14} className="text-slate-900" />}
              </div>
              <div>
                <h4 className={`font-bold ${factors[item.key as keyof typeof factors] ? 'text-white' : 'text-slate-300'}`}>
                  {item.label}
                </h4>
                <p className="text-xs text-slate-500 mt-1">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <Card className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-slate-600">
           <div className="mb-6">
              {recommendation === 'vertical' && <div className="text-6xl mb-4">🏢</div>}
              {recommendation === 'horizontal' && <div className="text-6xl mb-4">🏙️</div>}
              {recommendation === 'hybrid' && <div className="text-6xl mb-4">🏰</div>}
           </div>
           
           <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Recommended Strategy</h3>
           <h2 className="text-4xl font-bold text-white mb-6 capitalize text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-green">
             {recommendation} Scaling
           </h2>

           <div className="text-left bg-slate-950 p-6 rounded-lg w-full">
             <h4 className="text-white font-bold mb-2">Why?</h4>
             <ul className="space-y-2 text-sm text-slate-400">
               {recommendation === 'vertical' && (
                 <>
                   <li className="flex gap-2"><CheckCircle size={16} className="text-neon-green" /> Simplest to implement.</li>
                   <li className="flex gap-2"><CheckCircle size={16} className="text-neon-green" /> No network overhead/latency.</li>
                   <li className="flex gap-2"><CheckCircle size={16} className="text-neon-green" /> Best for tight budgets or MVPs.</li>
                 </>
               )}
               {recommendation === 'horizontal' && (
                 <>
                   <li className="flex gap-2"><CheckCircle size={16} className="text-neon-green" /> Handles traffic spikes by adding nodes.</li>
                   <li className="flex gap-2"><CheckCircle size={16} className="text-neon-green" /> If one node dies, others survive (HA).</li>
                   <li className="flex gap-2"><CheckCircle size={16} className="text-neon-green" /> Theoretically infinite scale.</li>
                 </>
               )}
               {recommendation === 'hybrid' && (
                 <>
                   <li className="flex gap-2"><CheckCircle size={16} className="text-neon-green" /> Combines raw power with redundancy.</li>
                   <li className="flex gap-2"><CheckCircle size={16} className="text-neon-green" /> Optimizes license costs (fewer nodes).</li>
                   <li className="flex gap-2"><CheckCircle size={16} className="text-neon-green" /> Good for heavy-compute apps needing HA.</li>
                 </>
               )}
             </ul>
           </div>
        </Card>
      </div>
    </div>
  );
};