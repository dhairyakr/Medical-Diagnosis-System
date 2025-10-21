import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';
import { DiseaseCategory, DiagnosisStatus, ProblematicParameter, CategoryData } from '../types';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, AlertCircle, Activity, Heart, Shield } from 'lucide-react';

interface OverallHealthSummaryProps {
  diagnosisResults: Record<DiseaseCategory, DiagnosisStatus>;
  problematicParameters: Record<DiseaseCategory, ProblematicParameter[]>;
  categoryData: Record<DiseaseCategory, CategoryData>;
}

export function OverallHealthSummary({ 
  diagnosisResults, 
  problematicParameters, 
  categoryData 
}: OverallHealthSummaryProps) {
  // Convert diagnosis status to numerical values for radar chart
  const getStatusScore = (status: DiagnosisStatus): number => {
    switch (status) {
      case 'healthy': return 1;
      case 'at-risk': return 2;
      case 'disease-detected': return 3;
      default: return 0;
    }
  };

  // Prepare radar chart data
  const radarData = Object.entries(diagnosisResults)
    .filter(([_, status]) => status !== null)
    .map(([category, status]) => ({
      category: categoryData[category as DiseaseCategory]?.title || category,
      riskLevel: getStatusScore(status),
      status: status
    }));

  // Calculate overall health metrics
  const totalCategories = Object.values(diagnosisResults).filter(status => status !== null).length;
  const healthyCount = Object.values(diagnosisResults).filter(status => status === 'healthy').length;
  const atRiskCount = Object.values(diagnosisResults).filter(status => status === 'at-risk').length;
  const diseaseCount = Object.values(diagnosisResults).filter(status => status === 'disease-detected').length;

  // Prepare pie chart data
  const pieData = [
    { name: 'Healthy', value: healthyCount, color: '#10B981' },
    { name: 'At Risk', value: atRiskCount, color: '#F59E0B' },
    { name: 'Disease Detected', value: diseaseCount, color: '#EF4444' }
  ].filter(item => item.value > 0);

  // Calculate health score
  const healthScore = totalCategories > 0 
    ? Math.round(((healthyCount * 100 + atRiskCount * 60 + diseaseCount * 20) / totalCategories))
    : 0;

  // Prepare gauge chart data
  const gaugeData = [
    {
      name: 'Health Score',
      value: healthScore,
      fill: healthScore >= 80 ? '#10B981' : healthScore >= 60 ? '#F59E0B' : '#EF4444'
    }
  ];

  // Prepare stacked bar chart data
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

  // Get priority recommendations
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

  // Get critical parameters
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

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-8 w-8 text-green-600" />;
    if (score >= 60) return <AlertTriangle className="h-8 w-8 text-yellow-600" />;
    return <AlertCircle className="h-8 w-8 text-red-600" />;
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

  return (
    <div className="mt-8 space-y-6">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Overall Health Summary</h2>
            <p className="text-gray-600">Comprehensive analysis across {totalCategories} health categories</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Radar Chart */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="h-5 w-5 text-indigo-600 mr-2" />
            Risk Level Analysis
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis 
                dataKey="category" 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                className="text-xs"
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
                stroke="#6366F1"
                fill="#6366F1"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-4 flex justify-center space-x-6 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              <span>Healthy (1)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
              <span>At Risk (2)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
              <span>Disease (3)</span>
            </div>
          </div>
        </div>

        {/* Health Distribution */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Heart className="h-5 w-5 text-rose-600 mr-2" />
            Health Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} categories`, 'Count']}
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
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Parameter Status Distribution */}
      {stackedBarData.length > 0 && (
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="h-5 w-5 text-blue-600 mr-2" />
            Parameter Status Distribution by Category
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={stackedBarData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="category" 
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                label={{ value: 'Number of Parameters', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number, name: string) => {
                  const displayName = name === 'healthy' ? 'Healthy' : 
                                    name === 'atRisk' ? 'At Risk' : 'Disease Detected';
                  return [`${value} parameters`, displayName];
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value: string) => {
                  return value === 'healthy' ? 'Healthy' : 
                         value === 'atRisk' ? 'At Risk' : 'Disease Detected';
                }}
              />
              <Bar dataKey="healthy" stackId="a" fill="#10B981" name="healthy" />
              <Bar dataKey="atRisk" stackId="a" fill="#F59E0B" name="atRisk" />
              <Bar dataKey="disease" stackId="a" fill="#EF4444" name="disease" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-gray-600">
            <p>This chart shows the distribution of parameter statuses within each health category. 
            Each bar represents a category, with segments showing how many parameters fall into healthy, at-risk, or disease ranges.</p>
          </div>
        </div>
      )}

      {/* Critical Parameters & Recommendations */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Critical Parameters */}
        {criticalParameters.length > 0 && (
          <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              Critical Parameters
            </h3>
            <div className="space-y-3">
              {criticalParameters.map((param, index) => (
                <div key={index} className="p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
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
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Priority Recommendations */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="h-5 w-5 text-blue-600 mr-2" />
            Priority Recommendations
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {priorityRecommendations.map((rec, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                rec.priority === 3 ? 'bg-red-50 border-red-400' : 'bg-yellow-50 border-yellow-400'
              }`}>
                <div className="flex items-start">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 mr-3 ${
                    rec.priority === 3 ? 'bg-red-400' : 'bg-yellow-400'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 mb-1">{rec.category}</p>
                    <p className="text-sm text-gray-700">{rec.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Health Trends */}
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
          Health Status Overview
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{healthyCount}</p>
            <p className="text-sm text-gray-600">Healthy Categories</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-600">{atRiskCount}</p>
            <p className="text-sm text-gray-600">At-Risk Categories</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-600">{diseaseCount}</p>
            <p className="text-sm text-gray-600">Disease Detected</p>
          </div>
        </div>
      </div>
    </div>
  );
}