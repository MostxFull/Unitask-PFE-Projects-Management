// Indication.jsx
import React from 'react';

function Indication({ icon, title, value, progress, color }) {
    return (
        <div className={`${color} p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200`}>
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-white shadow">
                    {icon}
                </div>
                <h3 className="font-medium text-gray-700">{title}</h3>
            </div>

            <div className="flex justify-between items-end">
                <span className="text-2xl font-bold text-gray-800">{value}</span>
                <div className="text-right">
                    <div className="h-2 w-20 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-current transition-all duration-500"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                    </div>
                    <span className="text-sm text-gray-500 mt-1 block">
            {progress.toFixed(1)}%
          </span>
                </div>
            </div>
        </div>
    );
}

export default Indication;