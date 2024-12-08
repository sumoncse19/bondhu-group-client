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
  { name: "Reference Bonus", value: 9000, color: "#FAB12F" },
  { name: "Team Bonus", value: 3000, color: "#82ca9d" },
  { name: "Club Bonus", value: 3000, color: "#003161" },
  { name: "Project Share Profit", value: 11000, color: "#8174A0" },
  { name: "Fixed Deposit Profit", value: 23000, color: "#9ABF80" },
  { name: "Share Holder Profit", value: 14000, color: "#9694FF" },
  { name: "Partnership Profit", value: 12000, color: "#ccd618" },
];

interface ProfitData {
  name: string;
  value: number;
  color: string;
}

interface IncomeWalletPieChartProps {
  data: ProfitData[];
}

export default class IncomeWalletPieChart extends PureComponent<IncomeWalletPieChartProps> {
  render() {
    const { data } = this.props;
    return (
      <ResponsiveContainer>
        <PieChart>
          {/* Pie with dynamic colors */}
          <Pie
            dataKey="value"
            data={data}
            label={({ name, value }) => `${value > 0 && `${name}: ${value}`}`}
            outerRadius={150}
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
    );
  }
}
