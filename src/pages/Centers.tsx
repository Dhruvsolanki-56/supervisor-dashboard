
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageTitle from '@/components/common/PageTitle';
import CenterTable, { Center } from '@/components/anganwadi/CenterTable';
import { PlusCircle, Search, Filter } from 'lucide-react';

// Mock data
const centersData: Center[] = [
  {
    id: 1,
    name: 'Anganwadi Center 1',
    location: 'North District',
    supervisor: 'Aarav Kumar',
    contact: '+91 98765 43210',
    status: 'active',
    performance: 'excellent',
    lastVisit: '2 days ago'
  },
  {
    id: 2,
    name: 'Anganwadi Center 2',
    location: 'South District',
    supervisor: 'Priya Singh',
    contact: '+91 98765 43211',
    status: 'active',
    performance: 'good',
    lastVisit: '1 week ago'
  },
  {
    id: 3,
    name: 'Anganwadi Center 3',
    location: 'East District',
    supervisor: 'Rahul Sharma',
    contact: '+91 98765 43212',
    status: 'maintenance',
    performance: 'average',
    lastVisit: '2 weeks ago'
  },
  {
    id: 4,
    name: 'Anganwadi Center 4',
    location: 'West District',
    supervisor: 'Deepika Patel',
    contact: '+91 98765 43213',
    status: 'inactive',
    performance: 'poor',
    lastVisit: '1 month ago'
  },
  {
    id: 5,
    name: 'Anganwadi Center 5',
    location: 'Central District',
    supervisor: 'Vikram Reddy',
    contact: '+91 98765 43214',
    status: 'active',
    performance: 'good',
    lastVisit: '3 days ago'
  },
];

const Centers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCenters = centersData.filter(center => 
    center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.supervisor.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleViewDetails = (center: Center) => {
    console.log('View details for center:', center);
    // In a real application, this would open a modal or navigate to a detail page
  };
  
  return (
    <Layout>
      <PageTitle 
        title="Anganwadi Centers" 
        subtitle="Manage and monitor all centers in your region"
      >
        <button className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium flex items-center hover:bg-primary/90 transition-colors">
          <PlusCircle size={16} className="mr-2" />
          Add Center
        </button>
      </PageTitle>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search centers..."
            className="pl-10 pr-4 py-2 w-full border rounded-md text-sm focus:ring-1 focus:ring-primary input-focus"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button className="px-4 py-2 border rounded-md flex items-center text-sm hover:bg-muted transition-colors">
          <Filter size={16} className="mr-2 text-muted-foreground" />
          Filter
        </button>
      </div>
      
      <CenterTable 
        centers={filteredCenters} 
        onViewDetails={handleViewDetails}
      />
    </Layout>
  );
};

export default Centers;
