
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/common/PageTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BarChart3, LineChart, PieChart, Table as TableIcon, Settings } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InventoryTrendChart } from "@/components/analytics/InventoryTrendChart";
import { SupplementDistributionChart } from "@/components/analytics/SupplementDistributionChart";
import { PerformanceComparisonChart } from "@/components/analytics/PerformanceComparisonChart";
import { ForecastWidget } from "@/components/analytics/ForecastWidget";
import WidgetContainer from "@/components/analytics/WidgetContainer";
import { DateRangePicker } from "@/components/analytics/DateRangePicker";
import { DateRange } from "react-day-picker";

const Analytics = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    to: new Date(),
  });

  const handleDateRangeChange = (range: DateRange) => {
    // Ensure we always have a valid date range with both from and to values
    const newRange: DateRange = {
      from: range.from || dateRange.from,
      to: range.to || dateRange.to
    };
    setDateRange(newRange);
  };

  const handleExport = (format: string) => {
    console.log(`Exporting data in ${format} format`);
    // In a real implementation, this would generate and download the report
  };

  return (
    <Layout>
      <PageTitle 
        title="Advanced Analytics"
        subtitle="Monitor, analyze, and forecast inventory trends"
      >
        <div className="flex gap-2">
          <Select defaultValue="pdf" onValueChange={(value) => handleExport(value)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Export as..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">Export as PDF</SelectItem>
              <SelectItem value="excel">Export as Excel</SelectItem>
              <SelectItem value="csv">Export as CSV</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </PageTitle>
      
      <div className="mb-4 flex items-center justify-between">
        <Tabs defaultValue="dashboard" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="dashboard" className="flex items-center">
                <BarChart3 className="mr-2 h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center">
                <LineChart className="mr-2 h-4 w-4" />
                Trends
              </TabsTrigger>
              <TabsTrigger value="distribution" className="flex items-center">
                <PieChart className="mr-2 h-4 w-4" />
                Distribution
              </TabsTrigger>
              <TabsTrigger value="comparison" className="flex items-center">
                <TableIcon className="mr-2 h-4 w-4" />
                Comparison
              </TabsTrigger>
              <TabsTrigger value="forecast" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Forecast
              </TabsTrigger>
            </TabsList>
            
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={handleDateRangeChange}
            />
          </div>
          
          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <WidgetContainer title="Low Stock Items" subtitle="Critical items requiring attention" isResizable>
                <SupplementDistributionChart type="lowStock" dateRange={dateRange} />
              </WidgetContainer>
              
              <WidgetContainer title="Distribution by Type" subtitle="Supplement categories" isResizable>
                <SupplementDistributionChart type="category" dateRange={dateRange} />
              </WidgetContainer>
              
              <WidgetContainer title="Consumption Rate" subtitle="Last 30 days" isResizable>
                <InventoryTrendChart type="consumption" dateRange={dateRange} />
              </WidgetContainer>
              
              <WidgetContainer title="Request Fulfillment" subtitle="Approval rate" isResizable>
                <PerformanceComparisonChart type="fulfillment" dateRange={dateRange} />
              </WidgetContainer>
              
              <WidgetContainer title="Expiry Risk" subtitle="Items near expiry date" isResizable>
                <SupplementDistributionChart type="expiry" dateRange={dateRange} />
              </WidgetContainer>
              
              <WidgetContainer title="Stock Forecast" subtitle="Next 30 days prediction" isResizable>
                <ForecastWidget dateRange={dateRange} />
              </WidgetContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="trends">
            <Card>
              <CardContent className="pt-6">
                <InventoryTrendChart type="comprehensive" dateRange={dateRange} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="distribution">
            <Card>
              <CardContent className="pt-6">
                <SupplementDistributionChart type="comprehensive" dateRange={dateRange} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comparison">
            <Card>
              <CardContent className="pt-6">
                <PerformanceComparisonChart type="comprehensive" dateRange={dateRange} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="forecast">
            <Card>
              <CardContent className="pt-6">
                <ForecastWidget dateRange={dateRange} isDetailed />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Analytics;
