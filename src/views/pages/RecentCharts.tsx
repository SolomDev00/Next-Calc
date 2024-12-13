import { useEffect, useState } from "react";
import { getCharts, deleteChart } from "../../database";
import LineChartComponent from "../../components/dashboard-charts/LineChart";
import BarChartComponent from "../../components/dashboard-charts/BarChart";
import PieChartComponent from "../../components/dashboard-charts/PieChart";
import toast from "react-hot-toast";
import { Chart } from "../../interfaces/index";
import { SoAddSquare, SoTrash } from "solom-icon";
import { Link } from "react-router-dom";
import IosWow from "../../assets/icons/ios_wow.svg";
import RaderChartComponent from "../../components/dashboard-charts/RaderChart";
import CelsiusChartComponent from "../../components/dashboard-charts/CelsiusChart";
import WaveChartComponent from "../../components/dashboard-charts/WaveChart";

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
    setCharts(charts.filter((chart) => chart.id !== id));
    toast.success("Chart deleted successfully!");
  };

  const renderChart = (chart: Chart) => {
    switch (chart.type) {
      case "bar":
        return <BarChartComponent data={chart.data} />;
      case "line":
        return <LineChartComponent data={chart.data} />;
      case "pie":
        return <PieChartComponent data={chart.data} />;
        case "rader":
        return <RaderChartComponent data={chart.data} />;
        case "celsius":
        return <CelsiusChartComponent data={chart.data} />;
        case "wave":
        return <WaveChartComponent data={chart.data} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl text-primary font-medium">Recent Charts</h2>
          <img className="w-7 h-7 transform-gpu mb-2" src={IosWow} alt="Ios Hello" />
        </div>
        <Link to="/">
          <button className="bg-transparent border border-primary flex items-center gap-2 text-white px-6 py-2 rounded-md hover:bg-primary duration-150 ease-out">
            Create a new Chart <SoAddSquare className="w-5 h-5" />
          </button>
        </Link>
      </div>
      {charts.length === 0 ? (
        <p className="text-gray-500">No charts found.</p>
      ) : (
        charts.map((chart) => (
          <div key={chart.id} className=" border p-4 rounded-md shadow-md mb-5">
            <div className="flex justify-end items-center">
              <button
                className={`p-2 bg-red-200 rounded-md hover:bg-red-300`}
                onClick={() => handleDelete(chart.id)}
              >
                <SoTrash className="text-red-600 w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-center items-center">
              {renderChart(chart)}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentCharts;
