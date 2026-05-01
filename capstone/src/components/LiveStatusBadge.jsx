import React from 'react';
import clsx from 'clsx';
import { RefreshCw } from 'lucide-react';

const LiveStatusBadge = ({ status, onRefresh, isRefreshing }) => {
  const getStatusColor = () => {
    if (status === 'ON TIME') return 'bg-green-100 text-green-700 border-green-200';
    if (status?.includes('DELAYED')) return 'bg-red-100 text-red-700 border-red-200';
    if (status === 'ARRIVED') return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="flex items-center space-x-2">
      <span className={clsx(
        "px-2.5 py-1 text-xs font-bold rounded-full border flex items-center",
        getStatusColor()
      )}>
        <span className={clsx(
          "w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse",
          status === 'ON TIME' ? 'bg-green-500' : 
          status?.includes('DELAYED') ? 'bg-red-500' : 'bg-blue-500'
        )}></span>
        {status || 'UNKNOWN'}
      </span>
      {onRefresh && (
        <button 
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-1 text-gray-400 hover:text-primary transition-colors disabled:opacity-50"
          title="Refresh Live Status"
        >
          <RefreshCw className={clsx("w-4 h-4", isRefreshing && "animate-spin")} />
        </button>
      )}
    </div>
  );
};

export default LiveStatusBadge;
