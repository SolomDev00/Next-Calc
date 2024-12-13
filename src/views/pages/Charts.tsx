import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { useUser } from '@clerk/clerk-react';
import PieChartComponent from '../../components/dashboard-charts/PieChart';
import { DataPoint } from '../../types';
import LineChartComponent from '../../components/dashboard-charts/LineChart';
import BarChartComponent from '../../components/dashboard-charts/BarChart';
import { SoAddNote, SoEditSquare } from 'solom-icon';
import IosHi from '../../assets/icons/ios_hi.svg'
import Input from '../../components/schema/Input';

export default function ChartSelector() {
    const user = useUser();

    const [selectedChart, setSelectedChart] = useState('');
    const [dataInputs, setDataInputs] = useState<DataPoint[]>([{ key: '', value: '' }]);

    const handleAddInput = () => {
        setDataInputs((prev) => [...prev, { key: '', value: '' }]);
    };

    const handleUpdateInput = (index: number, field: 'key' | 'value', value: string) => {
        const updatedInputs = [...dataInputs];
        if (field === 'value') {
            updatedInputs[index].value = isNaN(Number(value)) ? value : Number(value);
        } else if (field === 'key') {
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

    return (
        <div className="container w-[85%] mt-40">
            <div className='flex items-center gap-2'>
                <h3 className="text-2xl text-white">Welcome, <span className='font-medium text-primary'>{user.user?.username}</span></h3>
                <img className="w-6 h-6" src={IosHi} alt='Ios Hello' />
            </div>
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
                            <div className='w-full flex flex-col'>
                                <div className={`w-full flex flex-row items-center gap-2 border border-accent rounded-lg relative`}>
                                    <div className={`bg-accent text-white p-2 pr-8 rounded-l-md flex items-center gap-3`}>
                                        <SoAddNote className='w-5 h-5'/>
                                        <span className='text-base font-semibold w-fit max-sm:hidden'>Label</span>
                                    </div>
                                    <Input type="text" value={input.key} onChange={(e) => handleUpdateInput(index, 'key', e.target.value)} onKeyDown={(e) => handleKeyPress(e, index)} />
                                </div>
                            </div>
                            <div className='w-full flex flex-col'>
                                <div className={`w-full flex flex-row items-center gap-2 border border-accent rounded-lg relative`}>
                                    <div className={`bg-accent text-white p-2 pr-8 rounded-l-md flex items-center gap-3`}>
                                        <SoEditSquare className='w-5 h-5'/>
                                        <span className='text-base font-semibold w-fit max-sm:hidden'>Value</span>
                                    </div>
                                    <Input type="text" value={input.value.toString()} onChange={(e) => handleUpdateInput(index, 'value', e.target.value)} onKeyDown={(e) => handleKeyPress(e, index)} />
                                </div>
                            </div>
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