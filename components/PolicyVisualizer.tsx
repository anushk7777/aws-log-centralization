
import React from 'react';
import { S3Policy } from '../types';
import PolicyStatementCard from './PolicyStatementCard';
import { CodeBracketIcon } from './icons/CodeBracketIcon';

interface PolicyVisualizerProps {
  policy: S3Policy;
}

const PolicyVisualizer: React.FC<PolicyVisualizerProps> = ({ policy }) => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <CodeBracketIcon className="w-6 h-6 text-cyan-400" />
        <h2 className="text-xl font-bold text-cyan-400">S3 Bucket Policy Breakdown</h2>
      </div>
      <div className="space-y-4">
        {policy.Statement.map((statement, index) => (
          <PolicyStatementCard key={index} statement={statement} />
        ))}
      </div>
    </section>
  );
};

export default PolicyVisualizer;
