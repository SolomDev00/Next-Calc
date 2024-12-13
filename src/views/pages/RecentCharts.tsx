/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { getCharts, deleteChart } from '../../database';
import LineChartComponent from '../../components/dashboard-charts/LineChart';
import BarChartComponent from '../../components/dashboard-charts/BarChart';
import PieChartComponent from '../../components/dashboard-charts/PieChart';
import toast from 'react-hot-toast';
import { Chart } from '../../interfaces/index';

const RecentCharts = () => {
    const [charts, setCharts] = useState<Chart[]>([]);

    useEffect(() => {
        async function fetchCharts() {
            const data: Chart[] = await getCharts();
            setCharts(data);
        }
        fetchCharts();
    }, []);


    const handleDelete = async (id: number) => {
        await deleteChart(id);
        setCharts(charts.filter(chart => chart.id !== id));
        toast.success('Chart deleted successfully!');
    };

    const renderChart = (chart: Chart) => {
        switch (chart.type) {
            case 'bar':
                return <BarChartComponent data={chart.data} />;
            case 'line':
                return <LineChartComponent data={chart.data} />;
            case 'pie':
                return <PieChartComponent data={chart.data} />;
            default:
                return null;
        }
    };

    return (
        <div className="container">
            <h2 className="text-2xl font-bold mb-4">Recent Charts</h2>
            {charts.length === 0 ? (
                <p>No charts found.</p>
            ) : (
                charts.map((chart) => (
                    <div key={chart.id} className="mb-5 border p-4 rounded-md shadow-md">
                        {renderChart(chart)}
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-2"
                            onClick={() => handleDelete(chart.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default RecentCharts;
