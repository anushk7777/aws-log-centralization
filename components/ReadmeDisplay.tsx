
import React from 'react';
import { README_CONTENT } from '../constants';

const ReadmeDisplay: React.FC = () => {
    // A simple markdown-like parser for this specific content
    const formatContent = (text: string) => {
        const lines = text.trim().split('\n');
        return lines.map((line, index) => {
            if (line.startsWith('## ')) {
                return <h3 key={index} className="text-lg font-bold mt-6 mb-2 text-slate-200">{line.substring(3)}</h3>;
            }
            if (line.startsWith('# ')) {
                 return <h2 key={index} className="text-xl font-bold mt-8 mb-4 text-cyan-400 border-b border-slate-600 pb-2">{line.substring(2)}</h2>;
            }
            if (line.startsWith('* **')) {
                 const boldText = line.match(/\*\*(.*?)\*\*/);
                 const restOfText = line.split('**')[2];
                 return <p key={index} className="my-1 text-slate-300"><strong className="text-slate-100">{boldText ? boldText[1] : ''}</strong>{restOfText}</p>;
            }
            if (line.match(/^\d+\./)) {
                return <li key={index} className="ml-5 list-decimal text-slate-300 my-1">{line.substring(line.indexOf(' ') + 1)}</li>
            }
             if (line.startsWith('`')) {
                return <pre key={index} className="bg-slate-900 p-3 rounded-md text-xs text-slate-300 font-mono my-2 whitespace-pre-wrap">{line.replace(/`/g, '')}</pre>;
            }
            if (line.trim() === '---' || line.trim() === '```') return null; // ignore dividers and code block fences

            return <p key={index} className="my-2 text-slate-300">{line}</p>;
        });
    }

  return (
    <section>
        <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-cyan-400">Project README</h2>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 prose prose-invert prose-sm max-w-none">
            {formatContent(README_CONTENT)}
        </div>
    </section>
  );
};

export default ReadmeDisplay;
