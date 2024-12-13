import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { useUser } from '@clerk/clerk-react';
import PieChartComponent from '../../components/dashboard-charts/PieChart';
import { DataPoint } from '../../types';
import LineChartComponent from '../../components/dashboard-charts/LineChart';
import BarChartComponent from '../../components/dashboard-charts/BarChart';
import { SoAddNote, SoCog6, SoEditSquare, SoTrash } from 'solom-icon';
import IosHi from '../../assets/icons/ios_hi.svg';
import Input from '../../components/ui/Input';
import RaderChartComponent from '../../components/dashboard-charts/RaderChart';
import CelsiusChartComponent from '../../components/dashboard-charts/CelsiusChart';
import toast from 'react-hot-toast';
import WaveChartComponent from '../../components/dashboard-charts/WaveChart';
import { saveChart } from '../../database';
import { Link } from 'react-router-dom';

export default function ChartsPreview() {
    const user = useUser();

    const [selectedChart, setSelectedChart] = useState('');
    const [dataInputs, setDataInputs] = useState<DataPoint[]>([{ key: '', value: '' }]);

    const handleAddInput = () => {
        if (dataInputs.some((input) => input.key === '' || input.value === '')) {
            toast.error('All fields must be filled before adding a new input.');
            return;
        }
        setDataInputs((prev) => [...prev, { key: '', value: '' }]);
    };

    const handleUpdateInput = (index: number, field: 'key' | 'value', value: string) => {
        const updatedInputs = [...dataInputs];

        if (field === 'value') {
            if (!/^\d*$/.test(value)) {
                toast.error('Value must contain numbers only.');
                return;
            }
            updatedInputs[index].value = Number(value);
        } else if (field === 'key') {
            updatedInputs[index].key = value;
        }
        setDataInputs(updatedInputs);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const hasEmptyFields = dataInputs.some((input) => input.key === '' || input.value === '');
            const hasDuplicateLabels = new Set(dataInputs.map((input) => input.key)).size !== dataInputs.length;

            const hasNonNumericValues = dataInputs.some((input) => isNaN(Number(input.value)));

            if (hasEmptyFields) {
                toast.error('Please fill all fields before adding a new input.');
                return;
            }

            if (hasDuplicateLabels) {
                toast.error('Labels must be unique.');
                return;
            }

            if (hasNonNumericValues) {
                toast.error('Values must contain numbers only.');
                return;
            }

            handleAddInput();
        }
    };

    const handleDeleteInput = (index: number) => {
        if (index === 0) {
            toast.error('You cannot delete the first input.');
            return;
        }
        setDataInputs((prev) => prev.filter((_, i) => i !== index));
    };

    const handleReset = () => {
        setDataInputs([{ key: '', value: '' }]);
        toast.success('Inputs have been reset.');
    };

    const chartOptions = [
        { label: 'Bar Chart', value: 'bar' },
        { label: 'Line Chart', value: 'line' },
        { label: 'Pie Chart', value: 'pie' },
        { label: 'Rader Chart', value: 'rader' },
        { label: 'Celsius Chart', value: 'celsius' },
        { label: 'Wave Chart', value: 'wave' },
    ];

    const handleSaveChart = async () => {
        if (!selectedChart || dataInputs.some(input => input.key === '' || input.value === '')) {
            toast.error('Please select a chart and complete all fields before saving.');
            return;
        }

        const chartData = {
            type: selectedChart,
            data: dataInputs,
        };

        await saveChart(chartData);
        toast.success('Chart saved successfully!');
    };

    return (
        <div>
            <div className="flex items-center justify-between gap-2 mb-5">
                <div className="flex items-center gap-2">
                    <h3 className="text-2xl text-white">
                        Welcome, <span className="font-medium text-primary">{user.user?.username}</span>
                    </h3>
                    <img className="w-6 h-6" src={IosHi} alt="Ios Hello" />
                </div>
                <button
                    className="bg-transparent border border-primary flex items-center gap-2 text-white px-6 py-2 rounded-md hover:bg-primary duration-150 ease-out"
                    onClick={handleReset}
                >
                    Reset <SoCog6 className="w-5 h-5" />
                </button>
                <button
                    className="bg-transparent border border-primary flex items-center gap-2 text-white px-6 py-2 rounded-md hover:bg-primary duration-150 ease-out"
                    onClick={handleSaveChart}
                >
                    Save Chart <SoAddNote className="w-5 h-5" />
                </button>
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
                        <div key={index} className="flex items-center gap-3 my-2">
                            <div className="w-full flex flex-col">
                                <div className="w-full flex flex-row items-center gap-2 border border-accent rounded-lg relative">
                                    <div className="bg-accent text-white p-2 pr-8 rounded-l-md flex items-center gap-3">
                                        <SoAddNote className="w-5 h-5" />
                                        <span className="text-base font-semibold w-fit max-sm:hidden">Label</span>
                                    </div>
                                    <Input
                                        type="text"
                                        value={input.key}
                                        onChange={(e) => handleUpdateInput(index, 'key', e.target.value)}
                                        onKeyDown={(e) => handleKeyPress(e)}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex flex-col">
                                <div className="w-full flex flex-row items-center gap-2 border border-accent rounded-lg relative">
                                    <div className="bg-accent text-white p-2 pr-8 rounded-l-md flex items-center gap-3">
                                        <SoEditSquare className="w-5 h-5" />
                                        <span className="text-base font-semibold w-fit max-sm:hidden">Value</span>
                                    </div>
                                    <Input
                                        type="text"
                                        value={input.value.toString()}
                                        onChange={(e) => handleUpdateInput(index, 'value', e.target.value)}
                                        onKeyDown={(e) => handleKeyPress(e)}
                                    />
                                </div>
                            </div>
                            <button
                                className={`p-2 bg-red-200 rounded-md hover:bg-red-300 ${index === 0 ? 'cursor-not-allowed' : ''}`}
                                onClick={() => handleDeleteInput(index)}
                                disabled={index === 0}
                            >
                                <SoTrash className="text-red-600 w-6 h-6" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {dataInputs.length > 0 && (
                <div className="flex items-center justify-center mt-20">
                    {selectedChart === 'bar' && <BarChartComponent data={dataInputs} />}
                    {selectedChart === 'line' && <LineChartComponent data={dataInputs} />}
                    {selectedChart === 'pie' && <PieChartComponent data={dataInputs} />}
                    {selectedChart === 'rader' && <RaderChartComponent data={dataInputs} />}
                    {selectedChart === 'celsius' && <CelsiusChartComponent data={dataInputs} />}
                    {selectedChart === 'wave' && <WaveChartComponent data={dataInputs} />}
                </div>
            )}
            <Link to="/recent-charts" className="text-primary font-medium hover:underline">
                Recent Charts
            </Link>
        </div>
    );
}
