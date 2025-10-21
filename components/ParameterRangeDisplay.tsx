import React from 'react';
import { Parameter } from '../types';

interface ParameterRangeDisplayProps {
  parameter: Parameter;
}

export function ParameterRangeDisplay({ parameter }: ParameterRangeDisplayProps) {
  const value = parseFloat(parameter.value) || 0;
  const hasValue = parameter.value !== '' && !isNaN(value);
  
  // Calculate ranges
  const healthyMin = parameter.thresholds.healthy[0];
  const healthyMax = parameter.thresholds.healthy[1];
  const atRiskMin = parameter.thresholds.atRisk[0];
  const atRiskMax = parameter.thresholds.atRisk[1];
  
  // Determine overall range for visualization
  const minRange = Math.min(healthyMin, atRiskMin, value) * 0.9;
  const maxRange = Math.max(healthyMax, atRiskMax, value) * 1.1;
  const totalRange = maxRange - minRange;
  
  // Calculate positions as percentages
  const getPosition = (val: number) => ((val - minRange) / totalRange) * 100;
  
  const healthyStartPos = getPosition(healthyMin);
  const healthyEndPos = getPosition(healthyMax);
  const atRiskStartPos = getPosition(atRiskMin);
  const atRiskEndPos = getPosition(atRiskMax);
  const valuePos = hasValue ? getPosition(value) : 0;
  
  // Determine status
  const getStatus = () => {
    if (!hasValue) return 'no-value';
    if (value >= healthyMin && value <= healthyMax) return 'healthy';
    if (value >= atRiskMin && value <= atRiskMax) return 'at-risk';
    return 'disease';
  };
  
  const status = getStatus();
  
  const statusConfig = {
    'healthy': { color: '#10B981', label: 'Healthy', bgColor: 'bg-green-50' },
    'at-risk': { color: '#F59E0B', label: 'At Risk', bgColor: 'bg-yellow-50' },
    'disease': { color: '#EF4444', label: 'Abnormal', bgColor: 'bg-red-50' },
    'no-value': { color: '#9CA3AF', label: 'No Value', bgColor: 'bg-gray-50' }
  };
  
  return (
    <div className={`p-4 rounded-lg border ${statusConfig[status].bgColor} transition-all duration-200`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">{parameter.name}</h4>
          <p className="text-sm text-gray-600">Normal: {parameter.normalRange} {parameter.unit}</p>
        </div>
        <div className="text-right">
          {hasValue ? (
            <>
              <div className="text-lg font-bold text-gray-900">
                {value} <span className="text-sm font-normal text-gray-600">{parameter.unit}</span>
              </div>
              <div 
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium`}
                style={{ 
                  backgroundColor: `${statusConfig[status].color}20`,
                  color: statusConfig[status].color 
                }}
              >
                {statusConfig[status].label}
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-500">Enter value</div>
          )}
        </div>
      </div>
      
      {/* Range Visualization */}
      <div className="relative">
        {/* Background track */}
        <div className="h-6 bg-gray-200 rounded-full relative overflow-hidden">
          {/* Healthy range */}
          <div 
            className="absolute h-full bg-green-300 opacity-60"
            style={{
              left: `${healthyStartPos}%`,
              width: `${healthyEndPos - healthyStartPos}%`
            }}
          />
          
          {/* At-risk range */}
          <div 
            className="absolute h-full bg-yellow-300 opacity-60"
            style={{
              left: `${atRiskStartPos}%`,
              width: `${atRiskEndPos - atRiskStartPos}%`
            }}
          />
          
          {/* Current value marker */}
          {hasValue && (
            <div 
              className="absolute top-0 h-full w-1 transform -translate-x-0.5 z-10"
              style={{
                left: `${valuePos}%`,
                backgroundColor: statusConfig[status].color
              }}
            >
              <div 
                className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white shadow-lg"
                style={{ backgroundColor: statusConfig[status].color }}
              />
            </div>
          )}
        </div>
        
        {/* Range labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>{minRange.toFixed(0)}</span>
          <div className="flex space-x-4">
            <span className="flex items-center">
              <div className="w-3 h-3 bg-green-300 rounded mr-1"></div>
              Healthy
            </span>
            <span className="flex items-center">
              <div className="w-3 h-3 bg-yellow-300 rounded mr-1"></div>
              At Risk
            </span>
          </div>
          <span>{maxRange.toFixed(0)}</span>
        </div>
      </div>
      
      {/* Value details */}
      {hasValue && (
        <div className="mt-3 text-xs text-gray-600">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="font-medium">Healthy Range:</span> {healthyMin}-{healthyMax} {parameter.unit}
            </div>
            <div>
              <span className="font-medium">At-Risk Range:</span> {atRiskMin}-{atRiskMax} {parameter.unit}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}