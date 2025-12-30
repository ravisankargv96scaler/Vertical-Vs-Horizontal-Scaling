import React, { useState } from 'react';
import { Tab } from './types';
import { TabCore } from './components/TabCore';
import { TabVertical } from './components/TabVertical';
import { TabHorizontal } from './components/TabHorizontal';
import { TabDecision } from './components/TabDecision';
import { TabHybrid } from './components/TabHybrid';
import { TabQuiz } from './components/TabQuiz';
import { Server, LayoutGrid, Scale, Calculator, Layers, Award } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.CORE_CONCEPT);

  const tabs = [
    { id: Tab.CORE_CONCEPT, label: 'Concept', icon: Scale },
    { id: Tab.VERTICAL, label: 'Vertical', icon: Server },
    { id: Tab.HORIZONTAL, label: 'Horizontal', icon: LayoutGrid },
    { id: Tab.DECISION, label: 'Decision', icon: Calculator },
    { id: Tab.HYBRID, label: 'Hybrid', icon: Layers },
    { id: Tab.QUIZ, label: 'Quiz', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans selection:bg-neon-blue selection:text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-neon-blue to-neon-green p-2 rounded-lg">
              <Server className="text-slate-900" size={20} />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Scale<span className="text-neon-blue">Master</span></h1>
          </div>
          <div className="text-xs text-slate-500 font-mono hidden sm:block">
            SYSTEM_DESIGN_101
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        
        {/* Mobile Navigation (Dropdown) */}
        <div className="md:hidden mb-6">
          <select 
            value={activeTab} 
            onChange={(e) => setActiveTab(e.target.value as Tab)}
            className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-neon-blue outline-none appearance-none"
          >
            {tabs.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </div>

        {/* Desktop Navigation (Tabs) */}
        <div className="hidden md:flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
                  ${isActive 
                    ? 'bg-slate-800 text-neon-blue shadow-[inset_0_0_0_1px_rgba(0,210,255,0.3)]' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'}
                `}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Container */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 min-h-[600px] shadow-2xl relative overflow-hidden">
           {/* Decorative Background Elements */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/5 rounded-full blur-3xl -z-10"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-green/5 rounded-full blur-3xl -z-10"></div>

           {/* Tab Rendering */}
           {activeTab === Tab.CORE_CONCEPT && <TabCore />}
           {activeTab === Tab.VERTICAL && <TabVertical />}
           {activeTab === Tab.HORIZONTAL && <TabHorizontal />}
           {activeTab === Tab.DECISION && <TabDecision />}
           {activeTab === Tab.HYBRID && <TabHybrid />}
           {activeTab === Tab.QUIZ && <TabQuiz />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2024 ScaleMaster Interactive. Built for Educational Purposes.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;