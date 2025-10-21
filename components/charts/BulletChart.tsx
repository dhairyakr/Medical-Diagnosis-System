import React from 'react';
import { motion } from 'framer-motion';

interface BulletChartProps {
  title: string;
  subtitle?: string;
  value: number;
  target: number;
  ranges: {
    poor: [number, number];
    average: [number, number];
    good: [number, number];
  };
  unit?: string;
}

export function BulletChart({ title, subtitle, value, target, ranges, unit = '' }: BulletChartProps) {
  const max = Math.max(ranges.good[1], target, value) * 1.1;

  const getPercentage = (val: number) => (val / max) * 100;

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300">
      <div className="mb-3">
        <div className="flex items-baseline justify-between">
          <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
          <div className="flex items-baseline gap-3 text-xs">
            <span className="text-gray-600">
              Target: <span className="font-medium text-gray-800">{target}{unit}</span>
            </span>
            <span className="text-gray-600">
              Current: <span className="font-bold text-blue-600">{value}{unit}</span>
            </span>
          </div>
        </div>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>

      <div className="relative h-12">
        <div className="absolute inset-0 flex">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${getPercentage(ranges.poor[1])}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-red-200 to-red-300 rounded-l-lg"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${getPercentage(ranges.average[1]) - getPercentage(ranges.poor[1])}%` }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-yellow-200 to-yellow-300"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${getPercentage(ranges.good[1]) - getPercentage(ranges.average[1])}%` }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-green-200 to-green-300 rounded-r-lg"
          />
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="absolute h-8 top-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded shadow-lg"
          style={{
            left: 0,
            width: `${getPercentage(value)}%`,
            transformOrigin: 'left',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
          }}
        />

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute h-12 w-1 bg-gray-800 top-0 shadow-md"
          style={{ left: `${getPercentage(target)}%` }}
        >
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800" />
        </motion.div>
      </div>

      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>0</span>
        <span>{Math.round(max)}{unit}</span>
      </div>
    </div>
  );
}
