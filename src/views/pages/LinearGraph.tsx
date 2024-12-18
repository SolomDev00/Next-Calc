import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
    ReferenceDot,
} from "recharts";
import Input from "../../components/ui/Input";
import { SoAddNote } from "solom-icon";
import { CustomTooltipProps } from "../../interfaces";

const LinearGraph = () => {
    const [slope, setSlope] = useState(1);
    const [intercept, setIntercept] = useState(0);

    // Generate the data points for the graph
    const generateData = () => {
        const data = [];
        for (let x = -10; x <= 10; x++) {
            const y = slope * x + intercept;
            data.push({ x, y });
        }
        return data;
    };

    const data = generateData();

    const CustomTooltip: React.FC<CustomTooltipProps> = ({
        active,
        payload,
        label,
    }) => {
        if (active && payload && payload.length) {
            const value = payload.find((p) => p.name === "y");
            return (
                <div
                    style={{
                        width: "150px",
                        backgroundColor: "#6c35de",
                        borderRadius: "12px",
                        textAlign: "center",
                        color: "white",
                        padding: "10px",
                    }}
                >
                    <p style={{ color: "#ffffff", fontSize: 16, fontWeight: 500 }}>
                        X: {label}
                    </p>
                    <p style={{ color: "#ffffff", fontSize: 16, fontWeight: 500 }}>
                        Y: {value ? value.value : "-"}
                    </p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="linear-graph">
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis
                        dataKey="x"
                        type="number"
                        domain={[-10, 10]}
                        allowDataOverflow
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={{ stroke: "#8884d8" }}
                    />
                    <YAxis
                        type="number"
                        domain={[-10, 10]}
                        allowDataOverflow
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={{ stroke: "#8884d8" }}
                    />

                    <ReferenceLine x={0} stroke="#FF6347" strokeWidth={3} />
                    <ReferenceLine y={0} stroke="#FF6347" strokeWidth={3} />

                    <ReferenceDot x={0} y={0} r={6} fill="#FF4500" strokeWidth={2} />

                    <Line type="monotone" dataKey="y" stroke="#8884d8" />

                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                </LineChart>
            </ResponsiveContainer>

            <div className="w-full flex flex-col gap-3">
                <div className="w-full flex flex-row items-center gap-2 border border-accent rounded-lg relative">
                    <div className="bg-accent text-white p-2 pr-14 rounded-l-md flex items-center gap-3">
                        <SoAddNote className="w-5 h-5" />
                        <span className="text-base font-semibold w-fit max-sm:hidden">
                            Slope
                        </span>
                    </div>
                    <Input
                        type="number"
                        value={slope}
                        onChange={(e) => setSlope(Number(e.target.value))}
                    />
                </div>
                <div className="w-full flex flex-row items-center gap-2 border border-accent rounded-lg relative">
                    <div className="bg-accent text-white p-2 pr-8 rounded-l-md flex items-center gap-3">
                        <SoAddNote className="w-5 h-5" />
                        <span className="text-base font-semibold w-fit max-sm:hidden">
                            Intercept
                        </span>
                    </div>
                    <Input
                        type="number"
                        value={intercept}
                        onChange={(e) => setIntercept(Number(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
};

export default LinearGraph;
