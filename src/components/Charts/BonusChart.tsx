import React, { PureComponent } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Page A",
    reference_bonus: 590,
    team_bonus: 800,
    club_bonus: 1400,
  },
  {
    name: "Page B",
    reference_bonus: 868,
    team_bonus: 967,
    club_bonus: 1506,
  },
  {
    name: "Page C",
    reference_bonus: 1397,
    team_bonus: 1098,
    club_bonus: 989,
  },
  {
    name: "Page D",
    reference_bonus: 1480,
    team_bonus: 1200,
    club_bonus: 1228,
  },
  {
    name: "Page E",
    reference_bonus: 1520,
    team_bonus: 1108,
    club_bonus: 1100,
  },
  {
    name: "Page F",
    reference_bonus: 1400,
    team_bonus: 680,
    club_bonus: 1700,
  },
];

export default class BonusChart extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/p/sandbox/composed-chart-in-responsive-container-4vx38p";

  render() {
    return (
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 0,
            }}
          >
            {/* <CartesianGrid stroke="#f5f5f5" /> */}
            {/* <XAxis dataKey="name" scale="band" /> */}
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="club_bonus"
              fill="#8884d8"
              stroke="#8884d8"
            />
            <Bar dataKey="team_bonus" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="reference_bonus" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
