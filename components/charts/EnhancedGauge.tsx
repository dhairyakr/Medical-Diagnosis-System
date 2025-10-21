import React from 'react';
import { motion } from 'framer-motion';

interface EnhancedGaugeProps {
  value: number;
  max?: number;
  min?: number;
  label: string;
  size?: number;
  thresholds?: {
    excellent: number;
    good: number;
    fair: number;
  };
}

export function EnhancedGauge({
  value,
  max = 100,
  min = 0,
  label,
  size = 200,
  thresholds = { excellent: 80, good: 60, fair: 40 }
}: EnhancedGaugeProps) {
  const normalizedValue = ((value - min) / (max - min)) * 100;
  const angle = (normalizedValue / 100) * 180 - 90;

  const getColor = (val: number) => {
    if (val >= thresholds.excellent) return { start: '#10B981', end: '#059669', glow: 'rgba(16, 185, 129, 0.4)' };
    if (val >= thresholds.good) return { start: '#3B82F6', end: '#2563EB', glow: 'rgba(59, 130, 246, 0.4)' };
    if (val >= thresholds.fair) return { start: '#F59E0B', end: '#D97706', glow: 'rgba(245, 158, 11, 0.4)' };
    return { start: '#EF4444', end: '#DC2626', glow: 'rgba(239, 68, 68, 0.4)' };
  };

  const colors = getColor(normalizedValue);
  const radius = (size - 40) / 2;
  const strokeWidth = 18;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedValue / 100) * circumference;

  const center = size / 2;
  const needleLength = radius - 10;
  const needleX = center + needleLength * Math.cos((angle * Math.PI) / 180);
  const needleY = center + needleLength * Math.sin((angle * Math.PI) / 180);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size * 0.65} viewBox={`0 0 ${size} ${size * 0.65}`}>
        <defs>
          <linearGradient id={`gauge-gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.start} />
            <stop offset="100%" stopColor={colors.end} />
          </linearGradient>
          <filter id={`glow-${label}`}>
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <path
          d={`M ${center - radius} ${center} A ${radius} ${radius} 0 0 1 ${center + radius} ${center}`}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        <motion.path
          d={`M ${center - radius} ${center} A ${radius} ${radius} 0 0 1 ${center + radius} ${center}`}
          fill="none"
          stroke={`url(#gauge-gradient-${label})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          filter={`url(#glow-${label})`}
        />

        <motion.circle
          cx={center}
          cy={center}
          r="8"
          fill="#374151"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        />

        <motion.line
          x1={center}
          y1={center}
          x2={needleX}
          y2={needleY}
          stroke="#374151"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ rotate: -90 }}
          animate={{ rotate: angle }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {[0, 25, 50, 75, 100].map((tick) => {
          const tickAngle = (tick / 100) * 180 - 90;
          const innerRadius = radius - strokeWidth / 2 - 5;
          const outerRadius = radius - strokeWidth / 2 + 5;
          const x1 = center + innerRadius * Math.cos((tickAngle * Math.PI) / 180);
          const y1 = center + innerRadius * Math.sin((tickAngle * Math.PI) / 180);
          const x2 = center + outerRadius * Math.cos((tickAngle * Math.PI) / 180);
          const y2 = center + outerRadius * Math.sin((tickAngle * Math.PI) / 180);

          return (
            <line
              key={tick}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#9CA3AF"
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      <div className="absolute" style={{ top: '55%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center"
        >
          <div className="text-4xl font-bold" style={{ color: colors.start }}>
            {Math.round(value)}
          </div>
          <div className="text-sm text-gray-600 mt-1">{label}</div>
        </motion.div>
      </div>
    </div>
  );
}
