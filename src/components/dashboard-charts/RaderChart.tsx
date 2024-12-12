import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface RaderChartProps {
    successSMS: number;
    scheduleSMS: number;
    pendingSMS: number;
    canceledSMS: number;
}

const RaderChart: React.FC<RaderChartProps> = ({ successSMS, scheduleSMS, pendingSMS, canceledSMS }) => {
    const data = [
        { subject: 'Scheduled', A: scheduleSMS ? scheduleSMS : 1},
        { subject: 'Success', A: successSMS ? successSMS : 1},
        { subject: 'Canceled', A: canceledSMS ? canceledSMS : 1},
        { subject: 'Pending', A: pendingSMS ? pendingSMS : 1 },
    ];

    return (
        <div className="w-full h-[30vh] relative">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} />
                    <Radar name="Status" dataKey="A" stroke="#007373" fill="#A4E1D2" fillOpacity={0.8} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RaderChart;
