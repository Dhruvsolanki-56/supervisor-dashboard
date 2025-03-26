
import React, { useMemo } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from "recharts";
import type { DateRange } from "react-day-picker";
import { addDays, format, differenceInDays } from "date-fns";

interface InventoryTrendChartProps {
  type: "consumption" | "comprehensive";
  dateRange: DateRange;
}

export const InventoryTrendChart: React.FC<InventoryTrendChartProps> = ({ 
  type,
  dateRange 
}) => {
  // Generate mock data based on date range
  const data = useMemo(() => {
    if (!dateRange.from || !dateRange.to) return [];
    
    const days = differenceInDays(dateRange.to, dateRange.from) + 1;
    const result = [];
    
    for (let i = 0; i < days; i += type === "comprehensive" ? 1 : 3) {
      const date = addDays(dateRange.from, i);
      result.push({
        date: format(date, "MMM dd"),
        "Protein Powder": Math.floor(Math.random() * 100) + 50,
        "Vitamin A": Math.floor(Math.random() * 80) + 20,
        "Iron Supplements": Math.floor(Math.random() * 120) + 30,
        "Calcium Tablets": Math.floor(Math.random() * 90) + 40,
      });
    }
    
    return result;
  }, [dateRange, type]);
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12 }}
          interval={type === "comprehensive" ? Math.floor(data.length / 10) : 0}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="Protein Powder" 
          stroke="#8884d8" 
          strokeWidth={2}
          activeDot={{ r: 8 }} 
        />
        <Line 
          type="monotone" 
          dataKey="Vitamin A" 
          stroke="#82ca9d" 
          strokeWidth={2}
        />
        {type === "comprehensive" && (
          <>
            <Line 
              type="monotone" 
              dataKey="Iron Supplements" 
              stroke="#ffc658" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="Calcium Tablets" 
              stroke="#ff8042" 
              strokeWidth={2}
            />
          </>
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};
