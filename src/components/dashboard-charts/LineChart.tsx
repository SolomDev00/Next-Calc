import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { DataPoint } from "../../types";

const LineChartComponent = ({ data }: { data: DataPoint[] }) => (
    <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="key" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#a364ff" />
    </LineChart>
);

export default LineChartComponent;