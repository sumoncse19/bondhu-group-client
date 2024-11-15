import React, { PureComponent } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  { name: "Reference Bonus", value: 900, color: "#8884d8" },
  { name: "Team Bonus", value: 300, color: "#82ca9d" },
  { name: "Club Bonus", value: 300, color: "#ffc658" },
];

export default class IncomeWalletPieChart extends PureComponent {
  render() {
    return (
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            {/* Pie with dynamic colors */}
            <Pie
              dataKey="value"
              data={data}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              isAnimationActive={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {/* Legend */}
            {/* <Legend /> */}
            {/* Tooltip */}
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
