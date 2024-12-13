import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { DataPoint } from "../../types";
import { CustomTooltipProps } from "../../interfaces";

const WaveChartComponent = ({ data }: { data: DataPoint[] }) => {
  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      const value = payload.find((p) => p.name === "value");

      return (
        <div
          style={{
            width: "150px",
            backgroundColor: "#6c35de",
            borderRadius: "12px",
            textAlign: "center",
            color: "white",
            padding: "10px",
          }}
        >
          <p style={{ color: "#ffffff", fontSize: 18, fontWeight: 500 }}>
            {label}
          </p>
            <p style={{ color: "#ffffff", fontSize: 16 }}>
            Value: {value ? value.value : "-"}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <AreaChart data={data} width={800} height={420}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="key" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Area
        type="monotone"
        dataKey="value"
        stroke="#a364ff"
        fill="#a364ff"
        strokeLinejoin="round"
      />
    </AreaChart>
  );
};

export default WaveChartComponent;
