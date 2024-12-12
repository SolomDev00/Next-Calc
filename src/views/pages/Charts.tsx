import { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    LineChart, Line, PieChart, Pie, Cell,
} from 'recharts';
import Input from '../../components/schema/Input';
import { Dropdown } from 'primereact/dropdown';
import { useUser } from '@clerk/clerk-react';

type DataPoint = {
    key: string;
    value: string | number; 
};

const BarChartComponent = ({ data }: { data: DataPoint[] }) => (
    <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="key" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
);

const LineChartComponent = ({ data }: { data: DataPoint[] }) => (
    <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="key" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
);

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
                <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658"][index % 3]} />
            ))}
        </Pie>
        <Tooltip />
    </PieChart>
);

export default function ChartSelector() {
    const [selectedChart, setSelectedChart] = useState('');
    const [dataInputs, setDataInputs] = useState<DataPoint[]>([{ key: '', value: '' }]);

    const handleAddInput = () => {
        setDataInputs((prev) => [...prev, { key: '', value: '' }]);
    };

    const handleUpdateInput = (index: number, field: 'key' | 'value', value: string) => {
        const updatedInputs = [...dataInputs];
        if (field === 'value') {
            updatedInputs[index].value = isNaN(Number(value)) ? value : Number(value);
            updatedInputs[index].key = value;
        }
        setDataInputs(updatedInputs);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Enter' && dataInputs[index].key.trim()) {
            handleAddInput();
        }
    };

    const chartOptions = [
        { label: 'Bar Chart', value: 'bar', icon: '/path-to-bar-icon.png' },
        { label: 'Line Chart', value: 'line', icon: '/path-to-line-icon.png' },
        { label: 'Pie Chart', value: 'pie', icon: '/path-to-pie-icon.png' },
    ];

    const user = useUser();
    console.log(user.user?.username);
    return (
        <div className="mt-40 container w-[85%]">
            <h3 className="text-2xl">Welcome, <span className='font-medium text-primary'>{user.user?.username}</span></h3>
            <div className="flex items-center justify-center mb-5">
            <Dropdown
                value={selectedChart}
                onChange={(e) => setSelectedChart(e.value)}
                options={chartOptions}
                placeholder="Select Chart"
                optionLabel="label"
                className="w-72 border border-solid border-primary py-2 px-4 rounded-md"
                />
            </div>
            {selectedChart && (
                <div>
                    {dataInputs.map((input, index) => (
                        <div key={index} className="flex items-center gap-5 my-2">
                            <Input
                                type="text"
                                placeholder="Label"
                                value={input.key}
                                onChange={(e) => handleUpdateInput(index, 'key', e.target.value)}
                                onKeyDown={(e) => handleKeyPress(e, index)}
                            />
                            <Input
                                type="text"
                                placeholder="Value"
                                value={input.value.toString()}
                                onChange={(e) => handleUpdateInput(index, 'value', e.target.value)}
                                onKeyDown={(e) => handleKeyPress(e, index)}
                            />
                        </div>
                    ))}
                </div>
            )}

            {dataInputs.length > 0 && (
                <div className='flex items-center justify-center mt-20'>
                    {selectedChart === 'bar' && <BarChartComponent data={dataInputs} />}
                    {selectedChart === 'line' && <LineChartComponent data={dataInputs} />}
                    {selectedChart === 'pie' && <PieChartComponent data={dataInputs} />}
                </div>
            )}
        </div>
    );
}
