import Cookies from "js-cookie";
import React from "react";

interface DonutChartProps {
  percentage: number; // The percentage of the chart to fill
  purchase_wallet: number;
}

const DonutChart: React.FC<DonutChartProps> = ({
  percentage,
  purchase_wallet,
}) => {
  const conicStyle: React.CSSProperties = {
    background: `conic-gradient(
      #78fade ${percentage}%,
      red ${percentage}% 100%
    )`,
  };

  const wallet = Cookies.get("wallet");

  console.log("wallet", wallet);

  return (
    <div className="h-fit bg-[#e3fdf7] p-5">
      <p>Purchase Wallet : &#x9F3; {purchase_wallet}</p>
      <div
        className="w-[200px] h-[200px] rounded-full my-5 flex items-center justify-center "
        style={conicStyle}
      >
        {/* Inner white circle */}
        <div className="w-[130px] h-[130px] rounded-full bg-[#e3fdf7] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <p> Cost</p>
            <p className="text-red-500">{100 - percentage}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
