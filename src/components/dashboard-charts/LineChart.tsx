import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DataPoint } from "../../types";
import { CustomTooltipProps } from "../../interfaces";

const LineChartComponent = ({ data }: { data: DataPoint[] }) => {
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
            Value: {value ? value.result : "-"}
          </p>
        </div>
      );
    }

    return null;
  };
  return (
    <LineChart width={800} height={420} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="key" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Line type="monotone" dataKey="result" stroke="#a364ff" />
    </LineChart>
  );
};

export default LineChartComponent;
