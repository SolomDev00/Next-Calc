import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { DataPoint } from "../../types";
import { CustomTooltipProps } from "../../interfaces";

const BarChartComponent = ({ data }: { data: DataPoint[] }) => {
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const value = payload.find((p) => p.dataKey === "value");
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
            {value ? value.payload.key : ""}
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
    <BarChart width={800} height={420} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="key" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="result" fill="#a364ff" activeBar={false} />
    </BarChart>
  );
};

export default BarChartComponent;
