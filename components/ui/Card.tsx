import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  active?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, title, className = '', active = false }) => {
  return (
    <div className={`bg-slate-900 border ${active ? 'border-neon-blue shadow-[0_0_15px_rgba(0,210,255,0.2)]' : 'border-slate-700'} rounded-xl p-6 transition-all duration-300 ${className}`}>
      {title && (
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          {active && <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse"></span>}
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};