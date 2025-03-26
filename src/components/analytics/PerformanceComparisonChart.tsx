
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { DateRange } from "react-day-picker";

interface PerformanceComparisonChartProps {
  type: "fulfillment" | "comprehensive";
  dateRange: DateRange;
}

export const PerformanceComparisonChart: React.FC<PerformanceComparisonChartProps> = ({
  type,
  dateRange
}) => {
  // Generate mock data based on chart type
  const getData = () => {
    if (type === "fulfillment") {
      return [
        {
          name: "North Center",
          requested: 65,
          fulfilled: 55,
          percentage: 85,
        },
        {
          name: "South Center",
          requested: 48,
          fulfilled: 46,
          percentage: 96,
        },
        {
          name: "East Center",
          requested: 72,
          fulfilled: 60,
          percentage: 83,
        },
        {
          name: "West Center",
          requested: 35,
          fulfilled: 30,
          percentage: 86,
        },
      ];
    } else {
      return [
        {
          name: "North Center",
          protein: 65,
          vitamins: 55,
          minerals: 42,
          growth: 38,
        },
        {
          name: "South Center",
          protein: 48,
          vitamins: 46,
          minerals: 39,
          growth: 28,
        },
        {
          name: "East Center",
          protein: 72,
          vitamins: 60,
          minerals: 54,
          growth: 45,
        },
        {
          name: "West Center",
          protein: 35,
          vitamins: 30,
          minerals: 25,
          growth: 20,
        },
        {
          name: "Central",
          protein: 58,
          vitamins: 50,
          minerals: 44,
          growth: 36,
        },
      ];
    }
  };

  const data = getData();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {type === "fulfillment" ? (
          <>
            <Bar dataKey="requested" fill="#8884d8" name="Requested" />
            <Bar dataKey="fulfilled" fill="#82ca9d" name="Fulfilled" />
          </>
        ) : (
          <>
            <Bar dataKey="protein" fill="#8884d8" name="Protein Supplements" />
            <Bar dataKey="vitamins" fill="#82ca9d" name="Vitamins" />
            <Bar dataKey="minerals" fill="#ffc658" name="Minerals" />
            <Bar dataKey="growth" fill="#ff8042" name="Growth Supplements" />
          </>
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};
