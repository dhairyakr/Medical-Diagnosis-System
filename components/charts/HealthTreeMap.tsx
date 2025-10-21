import React from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

interface TreeMapNode {
  name: string;
  size: number;
  children?: TreeMapNode[];
  status?: 'healthy' | 'at-risk' | 'disease';
}

interface HealthTreeMapProps {
  data: TreeMapNode[];
  title: string;
}

export function HealthTreeMap({ data, title }: HealthTreeMapProps) {
  if (!data || data.length === 0 || !data[0].children || data[0].children.length === 0) {
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

  const getColor = (status?: string) => {
    switch (status) {
      case 'healthy': return '#10B981';
      case 'at-risk': return '#F59E0B';
      case 'disease': return '#EF4444';
      default: return '#3B82F6';
    }
  };

  const CustomizedContent = (props: any) => {
    const { x, y, width, height, name, size, status } = props;

    if (width < 40 || height < 30) return null;

    return (
      <g>
        <motion.rect
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: getColor(status),
            stroke: '#fff',
            strokeWidth: 2,
            fillOpacity: 0.85
          }}
          rx={4}
        />
        {width > 60 && height > 40 && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - 8}
              textAnchor="middle"
              fill="#fff"
              fontSize={width > 100 ? 14 : 11}
              fontWeight="600"
            >
              {name.length > 15 ? `${name.substring(0, 12)}...` : name}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2 + 10}
              textAnchor="middle"
              fill="#fff"
              fontSize={width > 100 ? 12 : 10}
              opacity={0.9}
            >
              {size}
            </text>
          </>
        )}
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-xl">
          <p className="font-semibold text-gray-900 mb-1">{data.name}</p>
          <p className="text-sm text-gray-600">Value: <span className="font-medium">{data.size}</span></p>
          {data.status && (
            <p className="text-sm text-gray-600">
              Status: <span className={`font-medium ${
                data.status === 'healthy' ? 'text-green-600' :
                data.status === 'at-risk' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {data.status === 'healthy' ? 'Healthy' :
                 data.status === 'at-risk' ? 'At Risk' : 'Disease Detected'}
              </span>
            </p>
          )}
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
        <Treemap
          data={data}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="#fff"
          content={<CustomizedContent />}
          animationDuration={800}
        >
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span className="text-xs text-gray-600">Healthy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-yellow-500" />
          <span className="text-xs text-gray-600">At Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span className="text-xs text-gray-600">Disease Detected</span>
        </div>
      </div>
    </motion.div>
  );
}
