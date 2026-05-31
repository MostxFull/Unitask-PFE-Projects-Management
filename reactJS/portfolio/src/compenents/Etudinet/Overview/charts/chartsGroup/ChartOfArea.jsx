'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// Données de vente des produits
const productSales = [
  {
    name: 'Jan',
    product1: 4000,
    
  },
  {
    name: 'Feb',
    product1: 3000,
    
  },
  {
    name: 'Mar',
    product1: 2000,
    
  },
  {
    name: 'Apr',
    product1: 2780,
   
  },
  {
    name: 'May',
    product1: 1890,
  },
  {
    name: 'Jun',
    product1: 2390,
  },
];

// Composant principal du graphique
const Chart = () => {
  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          data={productSales}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          <Area
            type="monotone"
            dataKey="product1"
            stroke="#2563eb"
            fill="#3b82f6"
            stackId="1"
          />
          
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Tooltip personnalisé
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-2 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Product 1: <span className="ml-2">${payload[0].value}</span>
        </p>
        
      </div>
    );
  }

  return null;
};

export default Chart;
