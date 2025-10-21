import { DiseaseCategory, DiagnosisStatus, CategoryData, ProblematicParameter } from '../types';

export interface TimeSeriesPoint {
  date: string;
  value: number;
  category: string;
}

export function generateParameterTrendData(
  categoryData: Record<DiseaseCategory, CategoryData>
): TimeSeriesPoint[] {
  const data: TimeSeriesPoint[] = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  Object.entries(categoryData).forEach(([category, catData]) => {
    catData.parameters.forEach(param => {
      if (param.value) {
        const currentValue = parseFloat(param.value);
        if (!isNaN(currentValue)) {
          months.forEach((month, index) => {
            const variation = (Math.random() - 0.5) * 10;
            data.push({
              date: month,
              value: currentValue + variation * (index / months.length),
              category: `${catData.title} - ${param.name}`
            });
          });
        }
      }
    });
  });

  return data;
}

export function generateCorrelationHeatmap(
  categoryData: Record<DiseaseCategory, CategoryData>
) {
  const data: Array<{ x: string; y: string; value: number; label: string }> = [];
  const categories = Object.entries(categoryData)
    .filter(([_, cat]) => cat.parameters.some(p => p.value))
    .slice(0, 6);

  categories.forEach(([catKey1, cat1], i) => {
    categories.forEach(([catKey2, cat2], j) => {
      const correlation = i === j ? 100 : Math.round(Math.random() * 60 + 20);
      data.push({
        x: cat1.title,
        y: cat2.title,
        value: correlation,
        label: `${cat1.title} vs ${cat2.title}`
      });
    });
  });

  return data;
}

export function generateScatterPlotData(
  categoryData: Record<DiseaseCategory, CategoryData>,
  diagnosisResults: Record<DiseaseCategory, DiagnosisStatus>
) {
  const data: Array<{
    x: number;
    y: number;
    z?: number;
    category: string;
    label: string;
  }> = [];

  Object.entries(categoryData).forEach(([key, cat]) => {
    if (cat.parameters.length >= 2) {
      const param1 = cat.parameters[0];
      const param2 = cat.parameters[1];

      if (param1.value && param2.value) {
        const x = parseFloat(param1.value);
        const y = parseFloat(param2.value);

        if (!isNaN(x) && !isNaN(y)) {
          const status = diagnosisResults[key as DiseaseCategory];
          const categoryLabel = status === 'healthy' ? 'Healthy' :
                               status === 'at-risk' ? 'At Risk' : 'Disease';

          data.push({
            x,
            y,
            z: Math.random() * 50 + 50,
            category: categoryLabel,
            label: cat.title
          });
        }
      }
    }
  });

  return data;
}

export function generateTreeMapData(
  diagnosisResults: Record<DiseaseCategory, DiagnosisStatus>,
  categoryData: Record<DiseaseCategory, CategoryData>
) {
  const statusGroups: { [key: string]: any[] } = {
    healthy: [],
    'at-risk': [],
    disease: []
  };

  try {
    Object.entries(diagnosisResults).forEach(([key, status]) => {
      if (status) {
        const cat = categoryData[key as DiseaseCategory];
        if (!cat || !cat.parameters || !Array.isArray(cat.parameters)) {
          return;
        }

        const paramCount = cat.parameters.filter(p => p && p.value).length;

        if (paramCount > 0) {
          const statusKey = status === 'disease-detected' ? 'disease' : status;
          statusGroups[statusKey].push({
            name: cat.title || key,
            size: paramCount * 10,
            status: statusKey
          });
        }
      }
    });
  } catch (error) {
    console.error('Error generating tree map data:', error);
  }

  const children = [
    ...(statusGroups.healthy.length > 0 ? [{
      name: 'Healthy',
      children: statusGroups.healthy,
      status: 'healthy'
    }] : []),
    ...(statusGroups['at-risk'].length > 0 ? [{
      name: 'At Risk',
      children: statusGroups['at-risk'],
      status: 'at-risk'
    }] : []),
    ...(statusGroups.disease.length > 0 ? [{
      name: 'Disease',
      children: statusGroups.disease,
      status: 'disease'
    }] : [])
  ];

  return children.length > 0 ? [
    {
      name: 'Health Overview',
      children
    }
  ] : [];
}

export function generateWaterfallData(
  diagnosisResults: Record<DiseaseCategory, DiagnosisStatus>
) {
  const startScore = 100;
  const data: Array<{ name: string; value: number; isTotal?: boolean }> = [
    { name: 'Baseline', value: startScore, isTotal: true }
  ];

  try {
    let runningTotal = startScore;
    let hasData = false;

    Object.entries(diagnosisResults).forEach(([key, status]) => {
      if (status) {
        const impact = status === 'healthy' ? 0 :
                      status === 'at-risk' ? -Math.round(Math.random() * 10 + 5) :
                      -Math.round(Math.random() * 15 + 10);

        if (impact !== 0) {
          hasData = true;
          runningTotal += impact;
          data.push({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            value: impact
          });
        }
      }
    });

    if (hasData) {
      data.push({ name: 'Final Score', value: runningTotal - startScore, isTotal: true });
    }
  } catch (error) {
    console.error('Error generating waterfall data:', error);
  }

  return data.length > 1 ? data : [];
}

export function generateBulletChartData(
  categoryData: Record<DiseaseCategory, CategoryData>
) {
  const bullets: Array<{
    title: string;
    subtitle: string;
    value: number;
    target: number;
    ranges: {
      poor: [number, number];
      average: [number, number];
      good: [number, number];
    };
    unit: string;
  }> = [];

  try {
    Object.entries(categoryData).forEach(([key, cat]) => {
      if (!cat || !cat.parameters || !Array.isArray(cat.parameters)) {
        return;
      }

      cat.parameters.slice(0, 3).forEach(param => {
        if (!param || !param.value || !param.thresholds) {
          return;
        }

        const value = parseFloat(param.value);
        if (!isNaN(value) && value > 0) {
          const healthy = param.thresholds.healthy;
          const atRisk = param.thresholds.atRisk;

          if (!healthy || !atRisk || healthy.length < 2 || atRisk.length < 2) {
            return;
          }

          const target = (healthy[0] + healthy[1]) / 2;
          const max = Math.max(healthy[1], atRisk[1], value) * 1.2;

          if (max > 0 && target >= 0) {
            bullets.push({
              title: param.name,
              subtitle: cat.title,
              value,
              target,
              ranges: {
                poor: [0, Math.max(0, healthy[0])],
                average: [Math.max(0, healthy[0]), healthy[1]],
                good: [healthy[1], max]
              },
              unit: param.unit || ''
            });
          }
        }
      });
    });
  } catch (error) {
    console.error('Error generating bullet chart data:', error);
  }

  return bullets;
}
