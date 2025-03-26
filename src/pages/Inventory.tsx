
import React from 'react';
import Layout from '@/components/layout/Layout';
import PageTitle from '@/components/common/PageTitle';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Package, AlertCircle, Truck, ShoppingBag } from 'lucide-react';

// Mock data
const supplements = [
  {
    id: 1,
    name: 'Protein Supplement',
    totalStock: 2450,
    allocated: 1850,
    remaining: 600,
    threshold: 500,
    status: 'normal'
  },
  {
    id: 2,
    name: 'Iron Tablets',
    totalStock: 5000,
    allocated: 4800,
    remaining: 200,
    threshold: 500,
    status: 'low'
  },
  {
    id: 3,
    name: 'Vitamin A Syrup',
    totalStock: 1200,
    allocated: 950,
    remaining: 250,
    threshold: 300,
    status: 'low'
  },
  {
    id: 4,
    name: 'Growth Formula',
    totalStock: 3000,
    allocated: 2200,
    remaining: 800,
    threshold: 500,
    status: 'normal'
  },
  {
    id: 5,
    name: 'Calcium Tablets',
    totalStock: 4000,
    allocated: 3200,
    remaining: 800,
    threshold: 500,
    status: 'normal'
  }
];

const recentDistributions = [
  {
    id: 1,
    center: 'Anganwadi Center 1',
    items: 'Protein Supplement, Iron Tablets',
    quantity: 250,
    date: 'Aug 15, 2023',
    status: 'delivered'
  },
  {
    id: 2,
    center: 'Anganwadi Center 3',
    items: 'Vitamin A Syrup, Growth Formula',
    quantity: 180,
    date: 'Aug 12, 2023',
    status: 'in-transit'
  },
  {
    id: 3,
    center: 'Anganwadi Center 2',
    items: 'Calcium Tablets, Iron Tablets',
    quantity: 300,
    date: 'Aug 10, 2023',
    status: 'delivered'
  }
];

const Inventory = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'low':
        return <span className="bg-anganwadi-severe/10 text-anganwadi-severe text-xs px-2 py-1 rounded-full">Low Stock</span>;
      case 'normal':
        return <span className="bg-anganwadi-healthy/10 text-anganwadi-healthy text-xs px-2 py-1 rounded-full">Normal</span>;
      default:
        return null;
    }
  };
  
  const getDistributionStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <span className="bg-anganwadi-healthy/10 text-anganwadi-healthy text-xs px-2 py-1 rounded-full">Delivered</span>;
      case 'in-transit':
        return <span className="bg-anganwadi-mild/10 text-anganwadi-mild text-xs px-2 py-1 rounded-full">In Transit</span>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <PageTitle 
        title="Inventory Management" 
        subtitle="Track and manage nutritional supplement inventory"
      >
        <button className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium flex items-center hover:bg-primary/90 transition-colors">
          <ShoppingBag size={16} className="mr-2" />
          Order Supplies
        </button>
      </PageTitle>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <DashboardCard title="Current Stock" subtitle="All supplements">
          <div className="flex items-center mt-2">
            <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center mr-4">
              <Package size={20} className="text-primary" />
            </div>
            <div>
              <h4 className="text-2xl font-bold">15,650</h4>
              <p className="text-xs text-muted-foreground">Units</p>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Low Stock Items" subtitle="Below threshold">
          <div className="flex items-center mt-2">
            <div className="w-10 h-10 rounded-md bg-anganwadi-severe/10 flex items-center justify-center mr-4">
              <AlertCircle size={20} className="text-anganwadi-severe" />
            </div>
            <div>
              <h4 className="text-2xl font-bold">2</h4>
              <p className="text-xs text-muted-foreground">Items</p>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Pending Deliveries" subtitle="In transit">
          <div className="flex items-center mt-2">
            <div className="w-10 h-10 rounded-md bg-anganwadi-mild/10 flex items-center justify-center mr-4">
              <Truck size={20} className="text-anganwadi-mild" />
            </div>
            <div>
              <h4 className="text-2xl font-bold">3</h4>
              <p className="text-xs text-muted-foreground">Deliveries</p>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Monthly Distribution" subtitle="August 2023">
          <div className="flex items-center mt-2">
            <div className="w-10 h-10 rounded-md bg-anganwadi-healthy/10 flex items-center justify-center mr-4">
              <ShoppingBag size={20} className="text-anganwadi-healthy" />
            </div>
            <div>
              <h4 className="text-2xl font-bold">4,230</h4>
              <p className="text-xs text-muted-foreground">Units distributed</p>
            </div>
          </div>
        </DashboardCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DashboardCard title="Supplement Inventory" subtitle="Current stock levels">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-muted-foreground text-left border-b">
                <tr>
                  <th className="px-4 py-3 font-medium">Supplement</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Allocated</th>
                  <th className="px-4 py-3 font-medium">Remaining</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {supplements.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.totalStock}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.allocated}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.remaining}</td>
                    <td className="px-4 py-3">{getStatusBadge(item.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Recent Distributions" subtitle="Last 30 days">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-muted-foreground text-left border-b">
                <tr>
                  <th className="px-4 py-3 font-medium">Center</th>
                  <th className="px-4 py-3 font-medium">Items</th>
                  <th className="px-4 py-3 font-medium">Quantity</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentDistributions.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-medium">{item.center}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.items}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.quantity}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.date}</td>
                    <td className="px-4 py-3">{getDistributionStatusBadge(item.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      </div>
    </Layout>
  );
};

export default Inventory;
