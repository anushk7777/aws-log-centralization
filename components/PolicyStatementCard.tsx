
import React from 'react';
import { PolicyStatement } from '../types';
import { CloudTrailIcon } from './icons/CloudTrailIcon';
import { VpcFlowLogsIcon } from './icons/VpcFlowLogsIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { BanIcon } from './icons/BanIcon';

interface PolicyStatementCardProps {
  statement: PolicyStatement;
}

const getServiceIcon = (service: string) => {
    if (service.includes('cloudtrail')) {
        return <CloudTrailIcon className="w-6 h-6 text-blue-400" />;
    }
    if (service.includes('delivery.logs')) {
        return <VpcFlowLogsIcon className="w-6 h-6 text-indigo-400" />;
    }
    return null;
}

const getServiceName = (service: string) => {
     if (service.includes('cloudtrail')) {
        return 'CloudTrail';
    }
    if (service.includes('delivery.logs')) {
        return 'VPC Flow Logs';
    }
    return service;
}


const PolicyStatementCard: React.FC<PolicyStatementCardProps> = ({ statement }) => {
    const { Sid, Effect, Principal, Action, Resource, Condition } = statement;
    const isAllow = Effect === 'Allow';
    const principalService = Array.isArray(Principal.Service) ? Principal.Service[0] : Principal.Service;

    const renderList = (items: string | string[]) => {
        const itemList = Array.isArray(items) ? items : [items];
        return (
            <div className="flex flex-wrap gap-2">
                {itemList.map(item => (
                    <span key={item} className="bg-slate-700 text-slate-300 text-xs font-mono px-2 py-1 rounded">{item}</span>
                ))}
            </div>
        )
    }

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden transition-all hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10">
      <div className="p-4 bg-slate-800/50 border-b border-slate-700 flex justify-between items-center">
        <h3 className="font-bold text-slate-200">{Sid}</h3>
        <span className={`flex items-center gap-1.5 text-sm font-semibold px-2.5 py-1 rounded-full ${isAllow ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
            {isAllow ? <CheckCircleIcon className="w-4 h-4" /> : <BanIcon className="w-4 h-4" />}
            {Effect}
        </span>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <p className="font-semibold text-slate-400 md:col-span-1">Principal</p>
            <div className="md:col-span-2 flex items-center gap-2">
                {getServiceIcon(principalService)}
                <span className="font-semibold text-slate-300">{getServiceName(principalService)}</span>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <p className="font-semibold text-slate-400 md:col-span-1">Action</p>
            <div className="md:col-span-2">{renderList(Action)}</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <p className="font-semibold text-slate-400 md:col-span-1">Resource</p>
            <div className="md:col-span-2">{renderList(Resource)}</div>
        </div>
        {Condition && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm pt-2 border-t border-slate-700/50">
                <p className="font-semibold text-amber-400 md:col-span-1">Condition</p>
                <div className="md:col-span-2 space-y-1">
                    {Object.entries(Condition).map(([conditionKey, conditionValue]) => (
                        <div key={conditionKey}>
                            <p className="font-mono text-xs text-slate-500">{conditionKey}</p>
                            {Object.entries(conditionValue).map(([key, value]) => (
                                <p key={key} className="font-mono text-slate-300 text-sm">
                                    <span className="text-slate-400">{key}:</span> "{value}"
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default PolicyStatementCard;
