import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface DataEntry {
    name: string;
    value: number;
}

interface DashboardLineChartProps {
    data: DataEntry[];
}

const DashboardLineChart: React.FC<DashboardLineChartProps> = ({ data = [] }) => {

    const months = [
        { name: 'January', value: 0 },
        { name: 'February', value: 0 },
        { name: 'March', value: 0 },
        { name: 'April', value: 0 },
        { name: 'May', value: 0 },
        { name: 'June', value: 0 },
        { name: 'July', value: 0 },
        { name: 'August', value: 0 },
        { name: 'September', value: 0 },
        { name: 'October', value: 0 },
        { name: 'November', value: 0 },
        { name: 'December', value: 0 },
    ];

    const combinedData = months.map(month => {
        const foundData = data.find(entry => entry.name === month.name);
        return {
            name: month.name,
            value: foundData ? foundData.value : 0,
        };
    });

    return (
        <div className="w-full h-[30vh] relative">
            <ResponsiveContainer height="100%" width="100%">
                <LineChart data={combinedData} margin={{ right: 25, top: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" interval={1} />
                    <YAxis
                    // domain={[0, 'dataMax + 100']}
                    // tickFormatter={(value) => `${(value / 1000000).toFixed(1)}m`}
                    />
                    <Line type="monotone" dataKey="value" stroke="#007373" strokeWidth={3} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DashboardLineChart;
