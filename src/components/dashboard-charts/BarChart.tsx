import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { DataPoint } from "../../types";

const BarChartComponent = ({ data }: { data: DataPoint[] }) => (
    <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="key" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
);

export default BarChartComponent;