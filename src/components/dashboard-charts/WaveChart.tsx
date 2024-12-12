import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';

interface MonthlyData {
    name: string;
    success: number;
    pending: number;
    failed: number;
}

interface WaveChartProps {
    data: MonthlyData[] | undefined;
}

interface CustomTooltipProps extends TooltipProps<number, string> {
    payload?: {
        name: string;
        value: number;
        color: string;
    }[];
    label?: string;
}

const WaveChart: React.FC<WaveChartProps> = ({ data = [] }) => {
    const months = [
        { name: 'January', success: 0, pending: 0, failed: 0 },
        { name: 'February', success: 0, pending: 0, failed: 0 },
        { name: 'March', success: 0, pending: 0, failed: 0 },
        { name: 'April', success: 0, pending: 0, failed: 0 },
        { name: 'May', success: 0, pending: 0, failed: 0 },
        { name: 'June', success: 0, pending: 0, failed: 0 },
        { name: 'July', success: 0, pending: 0, failed: 0 },
        { name: 'August', success: 0, pending: 0, failed: 0 },
        { name: 'September', success: 0, pending: 0, failed: 0 },
        { name: 'October', success: 0, pending: 0, failed: 0 },
        { name: 'November', success: 0, pending: 0, failed: 0 },
        { name: 'December', success: 0, pending: 0, failed: 0 },
    ];

    const combinedData = months.map(month => {
        const foundData = Array.isArray(data) ? data.find(entry => entry.name === month.name) : null;
        return foundData ? foundData : month;
    });

    const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const success = payload.find((p) => p.name === 'success');
            const pending = payload.find((p) => p.name === 'pending');
            const failed = payload.find((p) => p.name === 'failed');

            return (
                <div style={{ width: "150px", backgroundColor: '#007373', borderRadius: "12px", textAlign: "center", color: "white", padding: '10px' }}>
                    <p style={{ color: '#ffffff', fontSize: 18, fontWeight: 500 }}>{label}</p>
                    <p style={{ color: '#28A745', fontSize: 16 }}>Success: {success ? success.value : '-'}</p>
                    <p style={{ color: '#FFC107', fontSize: 16 }}>Pending: {pending ? pending.value : '-'}</p>
                    <p style={{ color: '#DC3545', fontSize: 16 }}>Failed: {failed ? failed.value : '-'}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <AreaChart
                    data={combinedData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="success" stroke="#28A745" fill="#28A745" strokeLinejoin="round" />
                    <Area type="monotone" dataKey="pending" stroke="#FFC107" fill="#FFC107" strokeLinejoin="round" />
                    <Area type="monotone" dataKey="failed" stroke="#DC3545" fill="#DC3545" strokeLinejoin="round" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WaveChart;
