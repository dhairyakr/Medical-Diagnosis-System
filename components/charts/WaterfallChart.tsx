import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';

interface WaterfallDataPoint {
  name: string;
  value: number;
  isTotal?: boolean;
}

interface WaterfallChartProps {
  data: WaterfallDataPoint[];
  title: string;
  startLabel?: string;
  endLabel?: string;
}

export function WaterfallChart({ data, title, startLabel = 'Start', endLabel = 'End' }: WaterfallChartProps) {
  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="text-center text-gray-500 py-8">No data available</div>
      </motion.div>
    );
  }

  const processedData = data.map((item, index) => {
    let start = 0;
    for (let i = 0; i < index; i++) {
      start += data[i].value;
    }

    return {
      name: item.name,
      start: item.isTotal ? 0 : start,
      value: item.value,
      end: item.isTotal ? start + item.value : start + item.value,
      isPositive: item.value >= 0,
      isTotal: item.isTotal || false
    };
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-xl">
          <p className="font-semibold text-gray-900 mb-1">{data.name}</p>
          <p className="text-sm text-gray-600">
            Change: <span className={`font-medium ${data.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {data.isPositive ? '+' : ''}{data.value}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Total: <span className="font-medium text-blue-600">{data.end}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={processedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
            tick={{ fontSize: 11, fill: '#6B7280' }}
          />
          <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={0} stroke="#9CA3AF" strokeWidth={2} />

          <Bar dataKey="start" stackId="a" fill="transparent" />
          <Bar dataKey="value" stackId="a" radius={[4, 4, 0, 0]}>
            {processedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.isTotal
                    ? 'url(#totalGradient)'
                    : entry.isPositive
                    ? 'url(#positiveGradient)'
                    : 'url(#negativeGradient)'
                }
              />
            ))}
          </Bar>

          <defs>
            <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
            </linearGradient>
            <linearGradient id="negativeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#DC2626" stopOpacity={0.8} />
            </linearGradient>
            <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#2563EB" stopOpacity={0.8} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-b from-green-500 to-green-600" />
          <span className="text-xs text-gray-600">Improvement</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-b from-red-500 to-red-600" />
          <span className="text-xs text-gray-600">Decline</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-b from-blue-500 to-blue-600" />
          <span className="text-xs text-gray-600">Total</span>
        </div>
      </div>
    </motion.div>
  );
}
