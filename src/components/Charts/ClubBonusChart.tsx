"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { curveCardinal } from "d3-shape";

// Sample data
const data = [
  { name: "Page A", uv: 100, pv: 100 },
  { name: "Page B", uv: 200, pv: 200 },
  { name: "Page C", uv: 500, pv: 5000 },
  { name: "Page D", uv: 3000, pv: 300 },
  { name: "Page E", uv: 1000, pv: 10000 },
  { name: "Page F", uv: 1500, pv: 1500 },
  { name: "Page G", uv: 700, pv: 700 },
];

const cardinal = curveCardinal.tension(0.2);

const ClubBonusChart = () => {
  // Render chart only if data exists
  if (!data || data.length === 0) {
    return null; // Or render a placeholder message here if you want
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data} // Now the data is actually applied
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FB213C" stopOpacity={1} />
            <stop offset="100%" stopColor="#AEB308" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#DC2626"
          fill="url(#colorUv)"
          fillOpacity={0.9}
        />
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#DC2626"
          fill="url(#colorUv)"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ClubBonusChart;
