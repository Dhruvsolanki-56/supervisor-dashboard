
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea
} from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfoIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";

interface ForecastWidgetProps {
  dateRange: DateRange;
  isDetailed?: boolean;
}

export const ForecastWidget: React.FC<ForecastWidgetProps> = ({
  dateRange,
  isDetailed = false
}) => {
  // Generate forecast data - past data and predictions
  const generateData = () => {
    const today = new Date();
    const result = [];
    
    // Past data (actual)
    for (let i = -30; i <= 0; i++) {
      const date = addDays(today, i);
      result.push({
        date: format(date, "MMM dd"),
        actual: Math.floor(Math.random() * 30) + 100 - (i/2),
        predicted: null,
        lower: null,
        upper: null,
        isForecast: false
      });
    }
    
    // Current value
    const currentValue = result[result.length - 1].actual;
    
    // Future data (predictions)
    for (let i = 1; i <= 30; i++) {
      const date = addDays(today, i);
      const trend = currentValue - (i * 2.5);
      const predicted = Math.max(0, trend + Math.sin(i/5) * 10);
      const uncertainty = i * 1.5;
      
      result.push({
        date: format(date, "MMM dd"),
        actual: null,
        predicted: predicted,
        lower: predicted - uncertainty,
        upper: predicted + uncertainty,
        isForecast: true
      });
    }
    
    return result;
  };

  const data = generateData();
  const criticalThreshold = 50;

  // Find when stock becomes critical
  const criticalDay = data.findIndex(item => 
    item.isForecast && (item.predicted <= criticalThreshold)
  );
  
  const daysUntilCritical = criticalDay !== -1 ? criticalDay - 30 : "30+";
  
  // Calculate reorder recommendation
  const reorderRecommendation = Math.ceil((150 - criticalThreshold) * 1.2);

  if (isDetailed) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Days Until Critical</CardTitle>
              <CardDescription>Based on current consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{daysUntilCritical}</div>
              <p className="text-xs text-muted-foreground mt-1">days remaining</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Reorder Recommendation</CardTitle>
              <CardDescription>Optimal quantity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{reorderRecommendation}</div>
              <p className="text-xs text-muted-foreground mt-1">units</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
              <CardDescription>Current status</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-start">
              <Badge variant={criticalDay !== -1 && criticalDay < 40 ? "destructive" : "outline"} className="mb-1">
                {criticalDay !== -1 && criticalDay < 40 ? "High Risk" : "Low Risk"}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                {criticalDay !== -1 && criticalDay < 40 
                  ? "Immediate reordering recommended"
                  : "Normal consumption pattern"}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Stock Level Forecast</CardTitle>
              <Badge className="ml-2" variant="outline">ML-Powered</Badge>
            </div>
            <CardDescription>
              Predictions based on historical consumption patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  interval={Math.floor(data.length / 10)}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  labelFormatter={(label) => `Date: ${label}`}
                  formatter={(value, name) => [value !== null ? value.toFixed(1) : "N/A", name]}
                />
                <Legend />
                <ReferenceLine y={criticalThreshold} stroke="red" strokeDasharray="3 3" >
                  <Label value="Critical Level" position="insideBottomRight" />
                </ReferenceLine>
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Actual Stock"
                  connectNulls
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Predicted Stock"
                  connectNulls
                />
                <ReferenceArea
                  x1={data[30].date}
                  x2={data[data.length - 1].date}
                  y1={0}
                  y2={200}
                  fill="#82ca9d"
                  fillOpacity={0.1}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter>
            <div className="flex items-center text-xs text-muted-foreground">
              <InfoIcon className="h-3 w-3 mr-1" />
              Forecast is based on historical consumption data and may vary due to seasonal factors.
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12 }}
          interval={Math.floor(data.length / 5)}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend />
        <ReferenceLine y={criticalThreshold} stroke="red" strokeDasharray="3 3" />
        <Line 
          type="monotone" 
          dataKey="actual" 
          stroke="#8884d8" 
          strokeWidth={2}
          name="Actual"
          connectNulls
          activeDot={{ r: 8 }}
        />
        <Line 
          type="monotone" 
          dataKey="predicted" 
          stroke="#82ca9d" 
          strokeWidth={2}
          strokeDasharray="5 5"
          name="Forecast"
          connectNulls
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
