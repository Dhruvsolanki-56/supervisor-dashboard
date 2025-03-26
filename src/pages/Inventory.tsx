
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PageTitle from '@/components/common/PageTitle';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Package, AlertCircle, Truck, ShoppingBag, Clock, BarChart3 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Mock data
const supplements = [
  {
    id: 1,
    name: 'Protein Supplement',
    totalStock: 2450,
    allocated: 1850,
    remaining: 600,
    threshold: 500,
    required: 2000,
    stockPercentage: 30,
    status: 'low',
    center: 'Regional Warehouse A',
    projectedDepleteDate: '2023-10-15',
    lastUpdated: 'Aug 10, 2023'
  },
  {
    id: 2,
    name: 'Iron Tablets',
    totalStock: 5000,
    allocated: 4800,
    remaining: 200,
    threshold: 500,
    required: 2500,
    stockPercentage: 8,
    status: 'critical',
    center: 'Regional Warehouse B',
    projectedDepleteDate: '2023-09-05',
    lastUpdated: 'Aug 12, 2023'
  },
  {
    id: 3,
    name: 'Vitamin A Syrup',
    totalStock: 1200,
    allocated: 950,
    remaining: 250,
    threshold: 300,
    required: 1000,
    stockPercentage: 25,
    status: 'low',
    center: 'Regional Warehouse C',
    projectedDepleteDate: '2023-09-20',
    lastUpdated: 'Aug 09, 2023'
  },
  {
    id: 4,
    name: 'Growth Formula',
    totalStock: 3000,
    allocated: 2200,
    remaining: 800,
    threshold: 500,
    required: 1500,
    stockPercentage: 53.3,
    status: 'normal',
    center: 'Regional Warehouse A',
    projectedDepleteDate: '2023-11-15',
    lastUpdated: 'Aug 05, 2023'
  },
  {
    id: 5,
    name: 'Calcium Tablets',
    totalStock: 4000,
    allocated: 3200,
    remaining: 800,
    threshold: 500,
    required: 1800,
    stockPercentage: 44.4,
    status: 'normal',
    center: 'Regional Warehouse D',
    projectedDepleteDate: '2023-10-30',
    lastUpdated: 'Aug 08, 2023'
  },
  {
    id: 6,
    name: 'Micronutrient Sachets',
    totalStock: 1500,
    allocated: 1350,
    remaining: 150,
    threshold: 300,
    required: 1200,
    stockPercentage: 12.5,
    status: 'critical',
    center: 'Regional Warehouse B',
    projectedDepleteDate: '2023-09-10',
    lastUpdated: 'Aug 11, 2023'
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

const pendingRequests = [
  {
    id: 1,
    center: 'Anganwadi Center 5',
    items: 'Iron Tablets, Micronutrient Sachets',
    quantity: 200,
    requestDate: 'Aug 16, 2023',
    urgency: 'high',
    status: 'pending'
  },
  {
    id: 2,
    center: 'Anganwadi Center 2',
    items: 'Protein Supplement, Calcium Tablets',
    quantity: 150,
    requestDate: 'Aug 15, 2023',
    urgency: 'medium',
    status: 'pending'
  },
  {
    id: 3,
    center: 'Anganwadi Center 7',
    items: 'Vitamin A Syrup',
    quantity: 100,
    requestDate: 'Aug 14, 2023',
    urgency: 'low',
    status: 'pending'
  }
];

const Inventory = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  const getStockColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-500';
      case 'low':
        return 'bg-yellow-500';
      case 'normal':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getStockBgColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-100';
      case 'low':
        return 'bg-yellow-100';
      case 'normal':
        return 'bg-green-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">Critical</span>;
      case 'low':
        return <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">Low Stock</span>;
      case 'normal':
        return <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Normal</span>;
      default:
        return null;
    }
  };
  
  const getDistributionStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Delivered</span>;
      case 'in-transit':
        return <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">In Transit</span>;
      default:
        return null;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">High</span>;
      case 'medium':
        return <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">Medium</span>;
      case 'low':
        return <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Low</span>;
      default:
        return null;
    }
  };

  const handleRequestAction = (id: number, action: 'approve' | 'reject') => {
    toast({
      title: `Request ${action === 'approve' ? 'Approved' : 'Rejected'}`,
      description: `Request #${id} has been ${action === 'approve' ? 'approved' : 'rejected'}.`,
      variant: action === 'approve' ? 'default' : 'destructive',
    });
  };

  return (
    <Layout>
      <PageTitle 
        title="Inventory Management" 
        subtitle="Track and manage nutritional supplement inventory"
      >
        <Button className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium flex items-center hover:bg-primary/90 transition-colors">
          <ShoppingBag size={16} className="mr-2" />
          Order Supplies
        </Button>
      </PageTitle>
      
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tracking">Stock Tracking</TabsTrigger>
          <TabsTrigger value="requests">Pending Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
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
                <div className="w-10 h-10 rounded-md bg-red-100 flex items-center justify-center mr-4">
                  <AlertCircle size={20} className="text-red-500" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold">4</h4>
                  <p className="text-xs text-muted-foreground">Items</p>
                </div>
              </div>
            </DashboardCard>
            
            <DashboardCard title="Pending Deliveries" subtitle="In transit">
              <div className="flex items-center mt-2">
                <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center mr-4">
                  <Truck size={20} className="text-blue-500" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold">3</h4>
                  <p className="text-xs text-muted-foreground">Deliveries</p>
                </div>
              </div>
            </DashboardCard>
            
            <DashboardCard title="Monthly Distribution" subtitle="August 2023">
              <div className="flex items-center mt-2">
                <div className="w-10 h-10 rounded-md bg-green-100 flex items-center justify-center mr-4">
                  <ShoppingBag size={20} className="text-green-500" />
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
        </TabsContent>
        
        <TabsContent value="tracking">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <DashboardCard title="Critical Stock Items" subtitle="Urgent attention required">
              <div className="space-y-4 mt-2">
                {supplements
                  .filter(item => item.status === 'critical')
                  .map(item => (
                    <div key={item.id} className="border border-red-200 rounded-md p-4 bg-red-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-xs text-gray-600 mt-1">Location: {item.center}</p>
                        </div>
                        {getStatusBadge(item.status)}
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Current: {item.stockPercentage}%</span>
                          <span className="text-red-600">Required: {item.required} units</span>
                        </div>
                        <div className={`${getStockBgColor(item.status)} h-2 rounded-full`}>
                          <div 
                            className={`${getStockColor(item.status)} h-2 rounded-full`} 
                            style={{ width: `${item.stockPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-3 text-xs">
                        <div className="flex items-center">
                          <Clock size={12} className="text-gray-500 mr-1" />
                          <span>Depletes: {item.projectedDepleteDate}</span>
                        </div>
                        <div>
                          <span>Last updated: {item.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </DashboardCard>
            
            <DashboardCard title="Low Stock Items" subtitle="Attention needed soon">
              <div className="space-y-4 mt-2">
                {supplements
                  .filter(item => item.status === 'low')
                  .map(item => (
                    <div key={item.id} className="border border-yellow-200 rounded-md p-4 bg-yellow-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-xs text-gray-600 mt-1">Location: {item.center}</p>
                        </div>
                        {getStatusBadge(item.status)}
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Current: {item.stockPercentage}%</span>
                          <span className="text-yellow-700">Required: {item.required} units</span>
                        </div>
                        <div className={`${getStockBgColor(item.status)} h-2 rounded-full`}>
                          <div 
                            className={`${getStockColor(item.status)} h-2 rounded-full`} 
                            style={{ width: `${item.stockPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-3 text-xs">
                        <div className="flex items-center">
                          <Clock size={12} className="text-gray-500 mr-1" />
                          <span>Depletes: {item.projectedDepleteDate}</span>
                        </div>
                        <div>
                          <span>Last updated: {item.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </DashboardCard>
            
            <DashboardCard title="Stock Level Summary" subtitle="Overall inventory status">
              <div className="space-y-6 mt-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Stock Level Distribution</h4>
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-xs mr-1">Critical:</span>
                    <span className="text-xs font-semibold">{supplements.filter(item => item.status === 'critical').length} items</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-xs mr-1">Low:</span>
                    <span className="text-xs font-semibold">{supplements.filter(item => item.status === 'low').length} items</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-xs mr-1">Normal:</span>
                    <span className="text-xs font-semibold">{supplements.filter(item => item.status === 'normal').length} items</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Projected Depletion Timeline</h4>
                  <div className="border rounded-md p-3 bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">This Month</span>
                      <span className="text-xs font-medium">{supplements.filter(item => new Date(item.projectedDepleteDate) < new Date('2023-09-30')).length} items</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">Next Month</span>
                      <span className="text-xs font-medium">{supplements.filter(item => 
                        new Date(item.projectedDepleteDate) >= new Date('2023-09-30') && 
                        new Date(item.projectedDepleteDate) < new Date('2023-10-31')
                      ).length} items</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Later</span>
                      <span className="text-xs font-medium">{supplements.filter(item => new Date(item.projectedDepleteDate) >= new Date('2023-10-31')).length} items</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" className="w-full text-xs flex items-center justify-center">
                    <BarChart3 size={14} className="mr-1" />
                    View Detailed Analytics
                  </Button>
                </div>
              </div>
            </DashboardCard>
          </div>
          
          <DashboardCard title="All Supplements Inventory" subtitle="Complete stock tracking">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-muted-foreground text-left border-b">
                  <tr>
                    <th className="px-4 py-3 font-medium">Supplement</th>
                    <th className="px-4 py-3 font-medium">Location</th>
                    <th className="px-4 py-3 font-medium">Stock Level</th>
                    <th className="px-4 py-3 font-medium">Required</th>
                    <th className="px-4 py-3 font-medium">Depletes On</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {supplements.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3 font-medium">{item.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.center}</td>
                      <td className="px-4 py-3">
                        <div className="w-32">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{item.remaining}</span>
                            <span>{item.stockPercentage}%</span>
                          </div>
                          <div className={`${getStockBgColor(item.status)} h-1.5 rounded-full w-full`}>
                            <div 
                              className={`${getStockColor(item.status)} h-1.5 rounded-full`} 
                              style={{ width: `${item.stockPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{item.required}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.projectedDepleteDate}</td>
                      <td className="px-4 py-3">{getStatusBadge(item.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashboardCard>
        </TabsContent>
        
        <TabsContent value="requests">
          <div className="grid grid-cols-1 gap-6 mb-6">
            <DashboardCard title="Pending Supplement Requests" subtitle="Awaiting review and approval">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-muted-foreground text-left border-b">
                    <tr>
                      <th className="px-4 py-3 font-medium">Request ID</th>
                      <th className="px-4 py-3 font-medium">Center</th>
                      <th className="px-4 py-3 font-medium">Items</th>
                      <th className="px-4 py-3 font-medium">Quantity</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Urgency</th>
                      <th className="px-4 py-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {pendingRequests.map((item) => (
                      <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 font-medium">#{item.id}</td>
                        <td className="px-4 py-3 text-muted-foreground">{item.center}</td>
                        <td className="px-4 py-3 text-muted-foreground">{item.items}</td>
                        <td className="px-4 py-3 text-muted-foreground">{item.quantity}</td>
                        <td className="px-4 py-3 text-muted-foreground">{item.requestDate}</td>
                        <td className="px-4 py-3">{getUrgencyBadge(item.urgency)}</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 bg-green-100 text-green-700 hover:bg-green-200"
                              onClick={() => handleRequestAction(item.id, 'approve')}
                            >
                              Approve
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 bg-red-100 text-red-700 hover:bg-red-200"
                              onClick={() => handleRequestAction(item.id, 'reject')}
                            >
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DashboardCard>
            
            <DashboardCard title="Request Review Process" subtitle="Guidelines for supplement request approval">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium text-sm mb-2">Review Criteria</h3>
                  <ul className="text-xs space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1 mr-2"></span>
                      <span>Current inventory levels at the center</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1 mr-2"></span>
                      <span>Historical consumption patterns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1 mr-2"></span>
                      <span>Number of children served</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1 mr-2"></span>
                      <span>Nutritional risk assessment</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium text-sm mb-2">Urgency Levels</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                      <span className="font-medium">High:</span>
                      <span className="text-muted-foreground ml-1">Critical stock, immediate action</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                      <span className="font-medium">Medium:</span>
                      <span className="text-muted-foreground ml-1">Low stock, action needed soon</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                      <span className="font-medium">Low:</span>
                      <span className="text-muted-foreground ml-1">Regular replenishment</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium text-sm mb-2">Approval Process</h3>
                  <ol className="text-xs space-y-2 text-muted-foreground list-decimal ml-4">
                    <li>Review request details</li>
                    <li>Check current inventory levels</li>
                    <li>Verify against consumption patterns</li>
                    <li>Approve or reject with comments</li>
                    <li>Schedule distribution if approved</li>
                  </ol>
                </div>
              </div>
            </DashboardCard>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Inventory;
