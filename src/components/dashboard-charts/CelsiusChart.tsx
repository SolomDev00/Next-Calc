import { PieChart, Pie, Cell } from "recharts";
import { DataPoint } from "../../types";

const RADIAN = Math.PI / 180;

interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: LabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CelsiusChartComponent = ({ data }: { data: DataPoint[] }) => {
  const processedData = data.map((item) => ({
    ...item,
    result: Number(item.result),
  }));

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={processedData}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={115}
        fill="#8884d8"
        dataKey="result"
      >
        {data.map((_entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={
              ["#8884d8", "#82ca9d", "#ECC94B", "#E53E3E", "#3182CE"][index % 5]
            }
          />
        ))}
      </Pie>
    </PieChart>
  );
};

export default CelsiusChartComponent;
