import React from 'react';
import { motion } from 'framer-motion';

interface HeatmapCell {
  x: string;
  y: string;
  value: number;
  label?: string;
}

interface HealthHeatmapProps {
  data: HeatmapCell[];
  title: string;
  xLabel?: string;
  yLabel?: string;
}

export function HealthHeatmap({ data, title, xLabel, yLabel }: HealthHeatmapProps) {
  const uniqueX = Array.from(new Set(data.map(d => d.x)));
  const uniqueY = Array.from(new Set(data.map(d => d.y)));

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));

  const getColor = (value: number) => {
    const normalized = (value - minValue) / (maxValue - minValue);

    if (normalized > 0.75) return { bg: 'bg-red-500', intensity: 0.9 };
    if (normalized > 0.5) return { bg: 'bg-orange-400', intensity: 0.7 };
    if (normalized > 0.25) return { bg: 'bg-yellow-400', intensity: 0.5 };
    return { bg: 'bg-green-400', intensity: 0.3 };
  };

  const getCellData = (x: string, y: string) => {
    return data.find(d => d.x === x && d.y === y);
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="flex">
            <div className="w-24 flex-shrink-0" />

            <div className="flex-1">
              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${uniqueX.length}, minmax(60px, 1fr))` }}>
                {uniqueX.map((x, i) => (
                  <div key={i} className="text-xs font-medium text-gray-600 text-center pb-2 truncate" title={x}>
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {uniqueY.map((y, yIndex) => (
            <div key={yIndex} className="flex items-stretch mb-1">
              <div className="w-24 flex-shrink-0 pr-2 flex items-center justify-end">
                <span className="text-xs font-medium text-gray-600 truncate" title={y}>{y}</span>
              </div>

              <div className="flex-1">
                <div className="grid gap-1 h-full" style={{ gridTemplateColumns: `repeat(${uniqueX.length}, minmax(60px, 1fr))` }}>
                  {uniqueX.map((x, xIndex) => {
                    const cellData = getCellData(x, y);
                    const color = cellData ? getColor(cellData.value) : { bg: 'bg-gray-100', intensity: 0.1 };

                    return (
                      <motion.div
                        key={`${xIndex}-${yIndex}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: (xIndex + yIndex) * 0.02 }}
                        whileHover={{ scale: 1.1, zIndex: 10 }}
                        className={`${color.bg} rounded-lg aspect-square flex items-center justify-center cursor-pointer relative group transition-all duration-200`}
                        style={{ opacity: color.intensity }}
                      >
                        {cellData && (
                          <>
                            <span className="text-xs font-semibold text-white drop-shadow-md">
                              {cellData.value}
                            </span>

                            <div className="absolute invisible group-hover:visible bg-gray-900 text-white text-xs rounded-lg px-3 py-2 -top-12 left-1/2 transform -translate-x-1/2 z-20 whitespace-nowrap shadow-xl">
                              <div className="font-semibold">{cellData.label || `${x} - ${y}`}</div>
                              <div className="text-gray-300">Value: {cellData.value}</div>
                              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900" />
                            </div>
                          </>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6 text-xs">
        <span className="text-gray-600">Low Risk</span>
        <div className="flex gap-1">
          {[0.3, 0.5, 0.7, 0.9].map((opacity, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-500"
              style={{ opacity }}
            />
          ))}
        </div>
        <span className="text-gray-600">High Risk</span>
      </div>

      {(xLabel || yLabel) && (
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500 italic">
          {yLabel && <span>{yLabel}</span>}
          {xLabel && <span>{xLabel}</span>}
        </div>
      )}
    </div>
  );
}
