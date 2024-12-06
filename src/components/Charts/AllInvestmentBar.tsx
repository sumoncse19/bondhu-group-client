import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface InvestmentData {
  name: string;
  Project_Share: number;
  Fixed_Deposit: number;
  Share_Holder: number;
  Partnership: number;
}

interface AllInvestmentBarProps {
  data: InvestmentData[]; // Array of InvestmentData objects
}

export default class AllInvestmentBar extends PureComponent<AllInvestmentBarProps> {
  static demoUrl = "https://codesandbox.io/p/sandbox/simple-bar-chart-72d7y5";

  render() {
    const { data } = this.props;
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          {/* <Tooltip /> */}
          <Legend />
          <Bar dataKey="Project_Share" fill="#8884d8" />
          <Bar dataKey="Fixed_Deposit" fill="#82ca9d" />
          <Bar dataKey="Share_Holder" fill="#32cf9f" />
          <Bar dataKey="Partnership" fill="#73fe4f" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
