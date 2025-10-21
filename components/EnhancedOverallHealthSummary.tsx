import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { DiseaseCategory, DiagnosisStatus, ProblematicParameter, CategoryData } from '../types';
import { Activity, Heart, Shield, AlertCircle, CheckCircle, AlertTriangle, Grid3x3, TrendingUp } from 'lucide-react';
import { HealthHeatmap } from './charts/HealthHeatmap';
import { HealthScatterPlot } from './charts/HealthScatterPlot';
import {
  generateCorrelationHeatmap,
  generateScatterPlotData
} from '../utils/chartDataTransformers';

interface EnhancedOverallHealthSummaryProps {
  diagnosisResults: Record<DiseaseCategory, DiagnosisStatus>;
  problematicParameters: Record<DiseaseCategory, ProblematicParameter[]>;
  categoryData: Record<DiseaseCategory, CategoryData>;
}

type TabType = 'overview' | 'analysis';

export function EnhancedOverallHealthSummary({
  diagnosisResults,
  problematicParameters,
  categoryData
}: EnhancedOverallHealthSummaryProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const getStatusScore = (status: DiagnosisStatus): number => {
    switch (status) {
      case 'healthy': return 1;
      case 'at-risk': return 2;
      case 'disease-detected': return 3;
      default: return 0;
    }
  };

  const radarData = Object.entries(diagnosisResults)
    .filter(([_, status]) => status !== null)
    .map(([category, status]) => ({
      category: categoryData[category as DiseaseCategory]?.title || category,
      riskLevel: getStatusScore(status),
      status: status
    }));

  const totalCategories = Object.values(diagnosisResults).filter(status => status !== null).length;
  const healthyCount = Object.values(diagnosisResults).filter(status => status === 'healthy').length;
  const atRiskCount = Object.values(diagnosisResults).filter(status => status === 'at-risk').length;
  const diseaseCount = Object.values(diagnosisResults).filter(status => status === 'disease-detected').length;

  const donutData = [
    { name: 'Healthy', value: healthyCount, color: '#10B981', percentage: (healthyCount / totalCategories) * 100 },
    { name: 'At Risk', value: atRiskCount, color: '#F59E0B', percentage: (atRiskCount / totalCategories) * 100 },
    { name: 'Disease Detected', value: diseaseCount, color: '#EF4444', percentage: (diseaseCount / totalCategories) * 100 }
  ].filter(item => item.value > 0);

  const healthScore = totalCategories > 0
    ? Math.round(((healthyCount * 100 + atRiskCount * 60 + diseaseCount * 20) / totalCategories))
    : 0;

  const getParameterStatusDistribution = () => {
    const distribution: any[] = [];

    Object.entries(diagnosisResults).forEach(([category, status]) => {
      if (status !== null) {
        const categoryTitle = categoryData[category as DiseaseCategory]?.title || category;
        const parameters = categoryData[category as DiseaseCategory]?.parameters || [];

        let healthyParams = 0;
        let atRiskParams = 0;
        let diseaseParams = 0;

        parameters.forEach(param => {
          const value = parseFloat(param.value);
          if (!isNaN(value)) {
            if (value >= param.thresholds.healthy[0] && value <= param.thresholds.healthy[1]) {
              healthyParams++;
            } else if (value >= param.thresholds.atRisk[0] && value <= param.thresholds.atRisk[1]) {
              atRiskParams++;
            } else {
              diseaseParams++;
            }
          }
        });

        distribution.push({
          category: categoryTitle,
          healthy: healthyParams,
          atRisk: atRiskParams,
          disease: diseaseParams,
          total: healthyParams + atRiskParams + diseaseParams
        });
      }
    });

    return distribution.filter(item => item.total > 0);
  };

  const stackedBarData = getParameterStatusDistribution();

  const getPriorityRecommendations = () => {
    const recommendations: { category: string; recommendation: string; priority: number }[] = [];

    Object.entries(diagnosisResults).forEach(([category, status]) => {
      if (status && status !== 'healthy') {
        const categoryTitle = categoryData[category as DiseaseCategory]?.title || category;
        const categoryRecs = categoryData[category as DiseaseCategory]?.recommendations[status] || [];

        categoryRecs.slice(0, 2).forEach(rec => {
          recommendations.push({
            category: categoryTitle,
            recommendation: rec,
            priority: status === 'disease-detected' ? 3 : 2
          });
        });
      }
    });

    return recommendations.sort((a, b) => b.priority - a.priority).slice(0, 8);
  };

  const getCriticalParameters = () => {
    const critical: ProblematicParameter[] = [];

    Object.entries(problematicParameters).forEach(([category, params]) => {
      params.forEach(param => {
        if (param.status.includes('disease')) {
          critical.push({ ...param, category: categoryData[category as DiseaseCategory]?.title || category } as any);
        }
      });
    });

    return critical.slice(0, 5);
  };

  const priorityRecommendations = getPriorityRecommendations();
  const criticalParameters = getCriticalParameters();

  const heatmapData = generateCorrelationHeatmap(categoryData);
  const scatterData = generateScatterPlotData(categoryData, diagnosisResults);

  const CustomDonutLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-sm font-bold drop-shadow-lg"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (totalCategories === 0) {
    return (
      <div className="mt-8 p-8 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50">
        <div className="text-center">
          <Activity className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Health Data Available</h3>
          <p className="text-gray-500">Complete at least one health assessment to view your overall summary.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'analysis', label: 'Deep Analysis', icon: Grid3x3 }
  ];

  return (
    <div className="mt-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-50 via-white to-purple-50 backdrop-blur-md rounded-xl shadow-xl border border-gray-100/50 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Overall Health Dashboard
            </h2>
            <p className="text-gray-600">Comprehensive analysis across {totalCategories} health categories</p>
          </div>
        </div>

        <div className="flex gap-2 border-b border-gray-200 mb-6 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 font-medium transition-all relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm sm:text-base">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 p-4 sm:p-6"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Activity className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600 mr-2" />
                    Risk Level Analysis
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={radarData}>
                      <defs>
                        <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                          <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.3} />
                        </linearGradient>
                      </defs>
                      <PolarGrid stroke="#E5E7EB" />
                      <PolarAngleAxis
                        dataKey="category"
                        tick={{ fontSize: 11, fill: '#6B7280' }}
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 3]}
                        tick={{ fontSize: 10, fill: '#9CA3AF' }}
                        tickCount={4}
                      />
                      <Radar
                        name="Risk Level"
                        dataKey="riskLevel"
                        stroke="#3B82F6"
                        fill="url(#radarGradient)"
                        fillOpacity={0.6}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 p-4 sm:p-6"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Heart className="h-4 sm:h-5 w-4 sm:w-5 text-rose-600 mr-2" />
                    Health Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <defs>
                        {donutData.map((entry, index) => (
                          <linearGradient key={index} id={`donut-gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                            <stop offset="100%" stopColor={entry.color} stopOpacity={0.7} />
                          </linearGradient>
                        ))}
                      </defs>
                      <Pie
                        data={donutData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={CustomDonutLabel}
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={3}
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={800}
                      >
                        {donutData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={`url(#donut-gradient-${index})`}
                            stroke="#fff"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    {donutData.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-gray-700">{item.name}</span>
                        </div>
                        <span className="font-medium text-gray-900">{item.value} ({item.percentage.toFixed(0)}%)</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {stackedBarData.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 p-4 sm:p-6"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600 mr-2" />
                    Parameter Status Distribution by Category
                  </h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart
                      data={stackedBarData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                    >
                      <defs>
                        <linearGradient id="healthyGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
                          <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
                        </linearGradient>
                        <linearGradient id="atRiskGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.9} />
                          <stop offset="100%" stopColor="#D97706" stopOpacity={0.8} />
                        </linearGradient>
                        <linearGradient id="diseaseGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#EF4444" stopOpacity={0.9} />
                          <stop offset="100%" stopColor="#DC2626" stopOpacity={0.8} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis
                        dataKey="category"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        interval={0}
                        tick={{ fontSize: 11, fill: '#6B7280' }}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: '#6B7280' }}
                        label={{ value: 'Number of Parameters', angle: -90, position: 'insideLeft', style: { fill: '#6B7280', fontSize: 12 } }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Legend
                        wrapperStyle={{ paddingTop: '20px' }}
                        formatter={(value: string) => {
                          return value === 'healthy' ? 'Healthy' :
                                 value === 'atRisk' ? 'At Risk' : 'Disease Detected';
                        }}
                      />
                      <Bar dataKey="healthy" stackId="a" fill="url(#healthyGrad)" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="atRisk" stackId="a" fill="url(#atRiskGrad)" />
                      <Bar dataKey="disease" stackId="a" fill="url(#diseaseGrad)" />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              )}

              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                {criticalParameters.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 p-4 sm:p-6"
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <AlertCircle className="h-4 sm:h-5 w-4 sm:w-5 text-red-600 mr-2" />
                      Critical Parameters
                    </h3>
                    <div className="space-y-3">
                      {criticalParameters.map((param, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border-l-4 border-red-500 shadow-sm"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900">{param.name}</p>
                              <p className="text-sm text-gray-600">{(param as any).category}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-red-600">{param.value} {param.unit}</p>
                              <p className="text-xs text-red-500">Critical</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 p-4 sm:p-6"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600 mr-2" />
                    Priority Recommendations
                  </h3>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {priorityRecommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.05 }}
                        className={`p-3 rounded-lg border-l-4 shadow-sm ${
                          rec.priority === 3
                            ? 'bg-gradient-to-r from-red-50 to-red-100 border-red-400'
                            : 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-400'
                        }`}
                      >
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 mr-3 ${
                            rec.priority === 3 ? 'bg-red-500' : 'bg-yellow-500'
                          }`} />
                          <div>
                            <p className="text-sm font-medium text-gray-800 mb-1">{rec.category}</p>
                            <p className="text-sm text-gray-700">{rec.recommendation}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 p-4 sm:p-6"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-4 sm:h-5 w-4 sm:w-5 text-green-600 mr-2" />
                  Health Status Overview
                </h3>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md"
                  >
                    <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-green-600">{healthyCount}</p>
                    <p className="text-sm text-gray-600 mt-1">Healthy Categories</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-md"
                  >
                    <AlertTriangle className="h-10 w-10 text-yellow-600 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-yellow-600">{atRiskCount}</p>
                    <p className="text-sm text-gray-600 mt-1">At-Risk Categories</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-md"
                  >
                    <AlertCircle className="h-10 w-10 text-red-600 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-red-600">{diseaseCount}</p>
                    <p className="text-sm text-gray-600 mt-1">Disease Detected</p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'analysis' && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {heatmapData.length === 0 && scatterData.length === 0 ? (
                <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 p-12">
                  <div className="text-center">
                    <Grid3x3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Deep Analysis Available</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Complete multiple health assessments across different categories to enable correlation analysis and multi-parameter insights.
                    </p>
                    <p className="text-sm text-gray-400 mt-4">
                      Minimum: 2 categories with parameter values
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {heatmapData.length > 0 && (
                    <HealthHeatmap
                      data={heatmapData}
                      title="Category Correlation Matrix"
                      xLabel="Health Categories"
                      yLabel="Health Categories"
                    />
                  )}

                  {scatterData.length > 0 && (
                    <HealthScatterPlot
                      data={scatterData}
                      xLabel="Primary Parameter"
                      yLabel="Secondary Parameter"
                      title="Multi-Parameter Health Analysis"
                    />
                  )}

                  {(heatmapData.length === 0 || scatterData.length === 0) && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <strong>Tip:</strong> Add parameter values to more health categories to see comprehensive correlation and multi-parameter analysis.
                      </p>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
