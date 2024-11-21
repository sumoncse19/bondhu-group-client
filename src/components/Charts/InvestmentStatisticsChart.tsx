import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

// Define types for the data items and component props
type DataItem = {
  name: string;
  value: number;
};

interface ExampleProps {
  data: DataItem[]; // Array of data objects
  colors: string[]; // Array of color strings
}

export default class InvestmentStatisticsChart extends PureComponent<ExampleProps> {
  static demoUrl =
    "https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o";

  render() {
    const { data, colors } = this.props; // Destructure props

    return (
      <PieChart width={400} height={400}>
        {/* First Pie */}
        <Pie
          data={data}
          cx={180}
          cy={150}
          innerRadius={80}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    );
  }
}
