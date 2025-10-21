import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ZAxis } from 'recharts';
import { motion } from 'framer-motion';

interface ScatterPoint {
  x: number;
  y: number;
  z?: number;
  category: string;
  label: string;
  color?: string;
}

interface HealthScatterPlotProps {
  data: ScatterPoint[];
  xLabel: string;
  yLabel: string;
  title: string;
}

export function HealthScatterPlot({ data, xLabel, yLabel, title }: HealthScatterPlotProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(data.map(d => d.category)));
  const categoryColors: { [key: string]: string } = {
    'Healthy': '#10B981',
    'At Risk': '#F59E0B',
    'Disease': '#EF4444',
    'Normal': '#3B82F6',
    'Abnormal': '#EC4899'
  };

  const filteredData = selectedCategory
    ? data.filter(d => d.category === selectedCategory)
    : data;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-xl">
          <p className="font-semibold text-gray-900 mb-1">{point.label}</p>
          <p className="text-sm text-gray-600">Category: <span className="font-medium">{point.category}</span></p>
          <p className="text-sm text-gray-600">{xLabel}: <span className="font-medium">{point.x}</span></p>
          <p className="text-sm text-gray-600">{yLabel}: <span className="font-medium">{point.y}</span></p>
          {point.z && <p className="text-sm text-gray-600">Size: <span className="font-medium">{point.z}</span></p>}
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
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              selectedCategory === null
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            type="number"
            dataKey="x"
            name={xLabel}
            label={{ value: xLabel, position: 'bottom', offset: 40, style: { fill: '#6B7280', fontSize: 12 } }}
            tick={{ fill: '#6B7280', fontSize: 11 }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name={yLabel}
            label={{ value: yLabel, angle: -90, position: 'left', offset: 40, style: { fill: '#6B7280', fontSize: 12 } }}
            tick={{ fill: '#6B7280', fontSize: 11 }}
          />
          <ZAxis type="number" dataKey="z" range={[64, 400]} />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
          <Scatter
            data={filteredData}
            animationBegin={0}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {filteredData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || categoryColors[entry.category] || '#3B82F6'}
                fillOpacity={0.8}
                stroke={entry.color || categoryColors[entry.category] || '#3B82F6'}
                strokeWidth={2}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-6 mt-4 flex-wrap">
        {categories.map(cat => (
          <div key={cat} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: categoryColors[cat] || '#3B82F6' }}
            />
            <span className="text-xs text-gray-600">{cat}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
