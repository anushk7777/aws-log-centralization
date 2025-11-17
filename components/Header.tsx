
import React from 'react';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center gap-4">
        <ShieldCheckIcon className="w-10 h-10 text-cyan-400" />
        <div>
            <h1 className="text-2xl font-bold text-slate-100">AWS S3 Policy Visualizer</h1>
            <p className="text-sm text-slate-400">Demystifying Cross-Account Log Centralization</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
