
import React from 'react';
import { VideoStep } from '../types';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface ImplementationGuideProps {
  steps: VideoStep[];
}

const ImplementationGuide: React.FC<ImplementationGuideProps> = ({ steps }) => {
  return (
    <section>
        <div className="flex items-center gap-2 mb-4">
            <BookOpenIcon className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-cyan-400">Implementation Guide</h2>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 space-y-4">
            {steps.map((step, index) => (
                <div key={index} className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                    <p className="text-xs font-bold uppercase text-cyan-400">{step.part}</p>
                    <h3 className="font-semibold text-slate-200 mt-1">{step.title}</h3>
                    <p className="text-sm text-slate-400 mt-1 mb-3">{step.description}</p>
                    <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <CheckCircleIcon className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                                <span>{detail}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </section>
  );
};

export default ImplementationGuide;
