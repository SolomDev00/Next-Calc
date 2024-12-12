import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { DataPoint } from "../../types";

const PieChartComponent = ({ data }: { data: DataPoint[] }) => (
    <PieChart width={400} height={400}>
        <Pie
            data={data}
            dataKey="value"
            nameKey="key"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
        >
            {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ECC94B", "#E53E3E", "#3182CE"][index % 5]} />
            ))}
        </Pie>
        <Tooltip />
    </PieChart>
);

export default PieChartComponent;