import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { DataPoint } from '../../types';

const RaderChartComponent = ({ data }: { data: DataPoint[] }) => (
    <RadarChart
        width={800}
        height={450}
        cx="50%" 
        cy="50%"
        outerRadius="200" 
        data={data}
    >
        <PolarGrid />
        <PolarAngleAxis dataKey="key" />
        <PolarRadiusAxis angle={30} />
        <Radar
            name="Status"
            dataKey="value"
            stroke="#6c35de"
            fill="#805AD5"
            fillOpacity={0.8}
        />
    </RadarChart>
);

export default RaderChartComponent;
