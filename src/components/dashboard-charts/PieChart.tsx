import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { DataPoint } from "../../types";
import { CustomTooltipProps } from "../../interfaces";

const PieChartComponent = ({ data }: { data: DataPoint[] }) => {
  const processedData = data.map((item) => ({
    ...item,
    result: Number(item.result),
  }));

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const value = payload.find((p) => p.dataKey === "value");

      const result = value ? Number(value.result) : "-";

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
            {value ? value.name : ""}
          </p>
          <p style={{ color: "#ffffff", fontSize: 16 }}>Value: {result}</p>
        </div>
      );
    }

    return null;
  };

  console.log(data);

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={processedData}
        dataKey="result"
        nameKey="key"
        cx="50%"
        cy="50%"
        outerRadius={115}
        fill="#8884d8"
        label
      >
        {data.map((_, index) => (
          <Cell
            key={`cell-${index}`}
            fill={
              ["#8884d8", "#82ca9d", "#ECC94B", "#E53E3E", "#3182CE"][index % 5]
            }
          />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  );
};

export default PieChartComponent;
