
import React from 'react';
import { ProjectDetails } from '../types';
import { AccountIcon } from './icons/AccountIcon';
import { S3Icon } from './icons/S3Icon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface ProjectOverviewProps {
  details: ProjectDetails;
}

const InfoCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="flex-1 bg-slate-800 rounded-lg p-4 flex items-center gap-4 border border-slate-700">
        {icon}
        <div>
            <p className="text-sm text-slate-400">{title}</p>
            <p className="font-mono text-sm md:text-base text-slate-200">{value}</p>
        </div>
    </div>
);


const ProjectOverview: React.FC<ProjectOverviewProps> = ({ details }) => {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4 text-cyan-400">Project Architecture</h2>
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <InfoCard title="Source Account (Development)" value={details.sourceAccount} icon={<AccountIcon className="w-8 h-8 text-blue-400" />} />
          <ArrowRightIcon className="w-8 h-8 text-slate-500 hidden md:block" />
          <InfoCard title="Destination Account (Log Archive)" value={details.destAccount} icon={<AccountIcon className="w-8 h-8 text-green-400" />} />
        </div>
        <div className="flex items-center justify-center pt-4">
            <InfoCard title="Log Archive S3 Bucket" value={details.s3BucketName} icon={<S3Icon className="w-8 h-8 text-orange-400" />} />
        </div>
        <p className="text-center text-sm text-slate-400 pt-2">Logs from CloudTrail and VPC Flow Logs in the <span className="text-blue-400 font-semibold">Source Account</span> are securely delivered to the S3 bucket in the <span className="text-green-400 font-semibold">Log Archive Account</span>.</p>
      </div>
    </section>
  );
};

export default ProjectOverview;
