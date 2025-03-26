
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageTitle from '@/components/common/PageTitle';
import DashboardCard from '@/components/dashboard/DashboardCard';
import StatCard from '@/components/dashboard/StatCard';
import LineChart from '@/components/dashboard/LineChart';
import BarChart from '@/components/dashboard/BarChart';
import NutritionMap from '@/components/dashboard/NutritionMap';
import { Users, Building2, Baby, ShieldAlert, CalendarCheck } from 'lucide-react';

// Mock data
const nutritionTrend = [
  { month: 'Jan', value: 65 },
  { month: 'Feb', value: 59 },
  { month: 'Mar', value: 80 },
  { month: 'Apr', value: 81 },
  { month: 'May', value: 56 },
  { month: 'Jun', value: 55 },
  { month: 'Jul', value: 40 },
];

const attendanceTrend = [
  { month: 'Jan', value: 75 },
  { month: 'Feb', value: 78 },
  { month: 'Mar', value: 82 },
  { month: 'Apr', value: 79 },
  { month: 'May', value: 85 },
  { month: 'Jun', value: 87 },
  { month: 'Jul', value: 90 },
];

const nutritionByAge = [
  { age: '0-1', value: 15 },
  { age: '1-2', value: 25 },
  { age: '2-3', value: 18 },
  { age: '3-4', value: 12 },
  { age: '4-5', value: 10 },
  { age: '5-6', value: 8 },
];

const mapLocations = [
  { id: 1, name: 'North District', severity: 'severe', x: 30, y: 30, count: 24 },
  { id: 2, name: 'South District', severity: 'moderate', x: 70, y: 60, count: 16 },
  { id: 3, name: 'East District', severity: 'mild', x: 80, y: 25, count: 10 },
  { id: 4, name: 'West District', severity: 'healthy', x: 20, y: 70, count: 5 },
  { id: 5, name: 'Central District', severity: 'moderate', x: 50, y: 45, count: 18 },
];

const Index = () => {
  return (
    <Layout>
      <PageTitle 
        title="Dashboard" 
        subtitle="Overview of your Anganwadi supervision area"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Centers" 
          value="42"
          icon={Building2}
          change={{ value: "2 new", positive: true }}
          trend={[30, 35, 36, 38, 40, 42, 42]}
        />
        <StatCard 
          title="Children Registered" 
          value="3,254"
          icon={Baby}
          change={{ value: "124 new", positive: true }}
          trend={[2800, 2900, 2950, 3000, 3100, 3200, 3254]}
        />
        <StatCard 
          title="Malnutrition Cases" 
          value="245"
          icon={ShieldAlert}
          variant="severe"
          change={{ value: "12 less", positive: true }}
          trend={[300, 285, 270, 260, 255, 250, 245]}
        />
        <StatCard 
          title="Attendance Rate" 
          value="87%"
          icon={CalendarCheck}
          variant="healthy"
          change={{ value: "3% up", positive: true }}
          trend={[75, 78, 80, 82, 84, 85, 87]}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DashboardCard title="Malnutrition Trend" subtitle="Last 7 months">
          <LineChart 
            data={nutritionTrend} 
            dataKey="value" 
            xAxisKey="month" 
            color="#F43F5E"
          />
        </DashboardCard>
        
        <DashboardCard title="Attendance Trend" subtitle="Last 7 months">
          <LineChart 
            data={attendanceTrend} 
            dataKey="value" 
            xAxisKey="month" 
            color="#22C55E"
          />
        </DashboardCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <NutritionMap locations={mapLocations} />
        
        <div className="lg:col-span-2">
          <DashboardCard title="Nutrition Status by Age" subtitle="Current distribution">
            <BarChart 
              data={nutritionByAge} 
              dataKey="value" 
              xAxisKey="age" 
              color="#0EA5E9"
            />
          </DashboardCard>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
