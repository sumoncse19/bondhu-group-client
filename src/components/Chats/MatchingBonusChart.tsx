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

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 12298, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 3800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 4908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 400, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 10000, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 5600, amt: 2100 },
  { name: "Page H", uv: 2000, pv: 3800, amt: 2290 },
  { name: "Page I", uv: 2780, pv: 4908, amt: 2000 },
  { name: "Page J", uv: 1890, pv: 400, amt: 2181 },
  { name: "Page K", uv: 2390, pv: 10000, amt: 2500 },
  { name: "Page K", uv: 3490, pv: 5600, amt: 2100 },
];

const cardinal = curveCardinal.tension(0.2);

const MatchingBonusChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          {/* Define gradient with different offsets */}
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FB923C" stopOpacity={1} />
            <stop offset="100%" stopColor="#EAB308" stopOpacity={1} />
          </linearGradient>
        </defs>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        {/* <XAxis dataKey="name" />
        <YAxis /> */}
        {/* <Tooltip /> */}
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

export default MatchingBonusChart;
