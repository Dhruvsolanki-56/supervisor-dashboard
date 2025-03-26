
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import type { DateRange } from "react-day-picker";

interface SupplementDistributionChartProps {
  type: "lowStock" | "category" | "expiry" | "comprehensive";
  dateRange: DateRange;
}

export const SupplementDistributionChart: React.FC<SupplementDistributionChartProps> = ({
  type,
  dateRange
}) => {
  // Different data based on chart type
  const getData = () => {
    switch (type) {
      case "lowStock":
        return [
          { name: "Iron Supplements", value: 15 },
          { name: "Vitamin A", value: 8 },
          { name: "Protein Powder", value: 12 },
          { name: "Calcium Tablets", value: 5 },
        ];
      case "category":
        return [
          { name: "Vitamins", value: 35 },
          { name: "Proteins", value: 25 },
          { name: "Minerals", value: 20 },
          { name: "Growth Supplements", value: 15 },
          { name: "Other", value: 5 },
        ];
      case "expiry":
        return [
          { name: "This Week", value: 8 },
          { name: "Next Week", value: 12 },
          { name: "This Month", value: 25 },
          { name: "Next Month", value: 30 },
        ];
      case "comprehensive":
        return [
          { name: "Iron Supplements", value: 25 },
          { name: "Vitamin A", value: 18 },
          { name: "Protein Powder", value: 22 },
          { name: "Calcium Tablets", value: 15 },
          { name: "Zinc Supplements", value: 12 },
          { name: "Multivitamins", value: 20 },
          { name: "Vitamin D", value: 10 },
        ];
      default:
        return [];
    }
  };

  const data = getData();
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={type === "comprehensive" ? 120 : 80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} units`, "Quantity"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
