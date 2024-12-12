import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface DataEntry {
    name: string;
    value: number;
}

interface CelsiusChartProps {
    data: DataEntry[];
    colors: string[];
    successName: string;
    successValue: number;
    pendingName: string;
    pendingValue: number;
    canceledName: string;
    canceledValue: number;
}

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
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const CelsiusChart: React.FC<CelsiusChartProps> = ({
    data,
    colors,
    successName,
    successValue,
    pendingName,
    pendingValue,
    canceledName,
    canceledValue,
}) => {
    return (
        <div className="w-full h-[30vh] relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={420} height={420}>
                    <Pie
                        data={[
                            { name: successName, value: successValue ? successValue : 1 },
                            { name: pendingName, value: pendingValue ? pendingValue : 1 },
                            { name: canceledName, value: canceledValue ? canceledValue : 1 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={85}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((_entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                    </Pie>
                    <Legend
                        verticalAlign="bottom"
                        align="center"
                        iconSize={13}
                        iconType="circle"
                        style={{ display: "flex", alignItems: "center" }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CelsiusChart;
