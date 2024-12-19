import React, { useState } from "react";
import { select } from "d3";
import Input from "../../components/ui/Input";
import { SoControlPanel } from "solom-icon";
import Button from "../../components/ui/Button";

const MatrixGraph = () => {
    const [nodeCount, setNodeCount] = useState(4);
    const [matrix, setMatrix] = useState<number[][]>(
        Array(4)
            .fill(0)
            .map(() => Array(4).fill(0))
    );

    const handleNodeCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = Math.max(2, Number(e.target.value));
        setNodeCount(count);
        setMatrix(
            Array(count)
                .fill(0)
                .map(() => Array(count).fill(0))
        );
    };

    const handleMatrixChange = (row: number, col: number, value: number) => {
        const updatedMatrix = [...matrix];
        updatedMatrix[row][col] = value;
        setMatrix(updatedMatrix);
    };

    const drawGraph = () => {
        const svg = select("#graph-svg");
        svg.selectAll("*").remove();

        const radius = 200;
        const centerX = 250;
        const centerY = 250;
        const nodeRadius = 20;

        const angleStep = (2 * Math.PI) / nodeCount;

        const nodes = Array.from({ length: nodeCount }, (_, i) => ({
            x: centerX + radius * Math.cos(i * angleStep),
            y: centerY + radius * Math.sin(i * angleStep),
            id: i + 1,
        }));

        matrix.forEach((row, i) => {
            row.forEach((value, j) => {
                if (value === 1) {
                    svg.append("line")
                        .attr("x1", nodes[i].x)
                        .attr("y1", nodes[i].y)
                        .attr("x2", nodes[j].x)
                        .attr("y2", nodes[j].y)
                        .attr("stroke", "#888")
                        .attr("stroke-width", 2);
                }
            });
        });

        nodes.forEach((node) => {
            svg.append("circle")
                .attr("cx", node.x)
                .attr("cy", node.y)
                .attr("r", nodeRadius)
                .attr("fill", "#6c35de");

            svg.append("text")
                .attr("x", node.x)
                .attr("y", node.y)
                .attr("dy", 5)
                .attr("text-anchor", "middle")
                .attr("fill", "#fff")
                .text(node.id);
        });
    };

    return (
        <div className="flex flex-col gap-5">  
                <div className="w-full flex flex-row items-center gap-2 border border-accent rounded-lg relative">
                    <div className="bg-accent text-white p-2 pr-16 rounded-l-md flex items-center gap-3">
                        <SoControlPanel className="w-5 h-5" />
                        <span className="text-base font-semibold w-fit max-sm:hidden">
                           Nodes
                        </span>
                    </div>
                    <Input
                        type="number"
                        value={nodeCount}
                        onChange={handleNodeCountChange}
                        min={2}
                    />
            </div>
            <table className="border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300"></th>
                        {matrix.map((_, i) => (
                            <th key={`col-header-${i}`} className="border border-gray-300 px-2">
                                ({i + 1})
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {matrix.map((row, i) => (
                        <tr key={i}>
                            <td className="border border-gray-300 px-2">
                                ({i + 1})
                            </td>
                            {row.map((value, j) => (
                                <td key={`${i}-${j}`} className="border border-gray-300">
                                    <Input
                                        style={{ fontSize: "20px", textAlign: "center" }}
                                        value={value}
                                        min={0}
                                        max={1}
                                        onChange={(e) =>
                                            handleMatrixChange(i, j, Number(e.target.value))
                                        }
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Button onClick={drawGraph}>Draw Graph</Button>
            <svg id="graph-svg" width="500" height="500"></svg>
        </div>
    );
};

export default MatrixGraph;
