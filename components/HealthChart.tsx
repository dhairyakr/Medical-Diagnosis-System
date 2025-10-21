import React from 'react';
import { Parameter } from '../types';
import { ParameterRangeDisplay } from './ParameterRangeDisplay';

interface HealthChartProps {
  parameters: Parameter[];
}

export function HealthChart({ parameters }: HealthChartProps) {
  return (
    <div className="space-y-4">
      {parameters.map((parameter, index) => (
        <ParameterRangeDisplay 
          key={`${parameter.name}-${index}`} 
          parameter={parameter} 
        />
      ))}
    </div>
  );
}