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
import { evaluate } from "mathjs";

const EnhancedLineChart = ({ data }: { data: DataPoint[] }) => {
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

  const processedData = data.map((dataPoint) => {
    let xValue, yValue;

    try {
      const xExpr = String(dataPoint.key); 
      xValue = evaluate(xExpr, { x: 1, y: 1 });
    } catch (error) {
      xValue = NaN;
    }

    try {
      const yExpr = String(dataPoint.value);
      yValue = evaluate(yExpr, { x: 1, y: 1 });
    } catch (error) {
      yValue = NaN;
    }

    return {
      ...dataPoint,
      evaluatedX: xValue,
      evaluatedY: yValue,
    };
  });

  return (
    <LineChart
      width={800}
      height={600}
      data={processedData}
      margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
    >
      <CartesianGrid strokeDasharray="5 5" stroke="#e0e0e0" />
      <XAxis
        dataKey="evaluatedX"
        type="number"
        tickLine={false}
        axisLine={{ stroke: "#6c35de", strokeWidth: 2 }}
      />
      <YAxis
        dataKey="evaluatedY"
        type="number"
        tickLine={false}
        axisLine={{ stroke: "#6c35de", strokeWidth: 2 }}
      />
      <Tooltip content={<CustomTooltip />} />
      <Line
        type="monotone"
        dataKey="evaluatedY"
        stroke="#a364ff"
        strokeWidth={3}
        dot={{ r: 2, fill: "#a364ff" }}
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default EnhancedLineChart;
