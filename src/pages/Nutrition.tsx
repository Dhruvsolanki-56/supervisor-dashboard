
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageTitle from '@/components/common/PageTitle';
import DashboardCard from '@/components/dashboard/DashboardCard';
import NutritionMap from '@/components/dashboard/NutritionMap';
import BarChart from '@/components/dashboard/BarChart';
import LineChart from '@/components/dashboard/LineChart';
import StatCard from '@/components/dashboard/StatCard';
import { Activity, AlertTriangle, TrendingDown } from 'lucide-react';

// Mock data
const mapLocations = [
  { id: 1, name: 'North District', severity: 'severe', x: 30, y: 30, count: 24 },
  { id: 2, name: 'South District', severity: 'moderate', x: 70, y: 60, count: 16 },
  { id: 3, name: 'East District', severity: 'mild', x: 80, y: 25, count: 10 },
  { id: 4, name: 'West District', severity: 'healthy', x: 20, y: 70, count: 5 },
  { id: 5, name: 'Central District', severity: 'moderate', x: 50, y: 45, count: 18 },
];

const nutritionStatusByCenter = [
  { center: 'Center 1', value: 24 },
  { center: 'Center 2', value: 18 },
  { center: 'Center 3', value: 12 },
  { center: 'Center 4', value: 9 },
  { center: 'Center 5', value: 15 },
  { center: 'Center 6', value: 7 },
];

const nutritionTrendByMonth = [
  { month: 'Jan', severe: 30, moderate: 45, mild: 60 },
  { month: 'Feb', severe: 28, moderate: 48, mild: 55 },
  { month: 'Mar', severe: 25, moderate: 42, mild: 58 },
  { month: 'Apr', severe: 22, moderate: 40, mild: 62 },
  { month: 'May', severe: 20, moderate: 38, mild: 65 },
  { month: 'Jun', severe: 18, moderate: 36, mild: 63 },
  { month: 'Jul', severe: 15, moderate: 35, mild: 60 },
];

const Nutrition = () => {
  return (
    <Layout>
      <PageTitle 
        title="Nutrition Management" 
        subtitle="Monitor and analyze nutrition status across centers"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard 
          title="Severe Malnutrition" 
          value="58"
          icon={AlertTriangle}
          variant="severe"
          change={{ value: "8% down", positive: true }}
          trend={[70, 65, 63, 60, 59, 58, 58]}
        />
        <StatCard 
          title="Moderate Cases" 
          value="124"
          icon={Activity}
          variant="moderate"
          change={{ value: "5% down", positive: true }}
          trend={[140, 135, 130, 128, 126, 125, 124]}
        />
        <StatCard 
          title="Mild Cases" 
          value="163"
          icon={TrendingDown}
          variant="mild"
          change={{ value: "2% up", positive: false }}
          trend={[150, 152, 155, 158, 160, 162, 163]}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <NutritionMap locations={mapLocations} />
        
        <DashboardCard title="Malnutrition by Center" subtitle="Top 6 centers">
          <BarChart 
            data={nutritionStatusByCenter} 
            dataKey="value" 
            xAxisKey="center" 
            color="#F43F5E"
          />
        </DashboardCard>
      </div>
      
      <DashboardCard title="Nutrition Trend Analysis" subtitle="Last 7 months by severity">
        <div className="h-80">
          <LineChart 
            data={nutritionTrendByMonth} 
            dataKey="severe" 
            xAxisKey="month" 
            color="#F43F5E"
            height={300}
          />
        </div>
        
        <div className="mt-4 flex items-center justify-center space-x-6">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-anganwadi-severe mr-2"></span>
            <span className="text-sm">Severe</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-anganwadi-moderate mr-2"></span>
            <span className="text-sm">Moderate</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-anganwadi-mild mr-2"></span>
            <span className="text-sm">Mild</span>
          </div>
        </div>
      </DashboardCard>
    </Layout>
  );
};

export default Nutrition;
