/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import IosRocket from "../../assets/icons/ios_rocket.svg";
import {
  SoAddSquare,
  SoTrash,
  SoEditSquare2,
  SoArrowDown,
  SoArrowUp,
} from "solom-icon";

const CalcGraph: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [graphs, setGraphs] = useState<{ func: string; color: string }[]>([]);
  const [graphFunc, setGraphFunc] = useState("");
  const [graphColor, setGraphColor] = useState("#ff0000");
  const [gridSize, setGridSize] = useState(20);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        ctx.beginPath();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 1;

        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);

        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.stroke();

        ctx.font = "12px";
        ctx.fillStyle = "#fff";

        for (let x = 0; x <= width; x += gridSize) {
          const xValue = ((x - width / 2) / gridSize).toFixed(0);
          if (xValue === "0") {
            ctx.fillText(xValue, x - 20, height / 2 + 15);
          } else {
            ctx.fillText(xValue, x - 10, height / 2 + 25);
            ctx.beginPath();
            ctx.moveTo(x, height / 2 - 5);
            ctx.lineTo(x, height / 2 + 5);
            ctx.stroke();
          }
        }

        for (let y = 0; y <= height; y += gridSize) {
          const yValue = ((height / 2 - y) / gridSize).toFixed(0);
          if (yValue !== "0") {
            ctx.fillText(yValue, width / 2 + 10, y + 5);
            ctx.beginPath();
            ctx.moveTo(width / 2 - 5, y);
            ctx.lineTo(width / 2 + 5, y);
            ctx.stroke();
          }
        }

        graphs.forEach(({ func, color }) => {
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;

          for (let x = 0; x < width; x++) {
            try {
              const xValue = (x - width / 2) / gridSize;
              const yValue = eval(func.replace(/x/g, `(${xValue})`));
              const canvasY = height / 2 - yValue * gridSize;

              if (x === 0) {
                ctx.moveTo(x, canvasY);
              } else {
                ctx.lineTo(x, canvasY);
              }
            } catch (error) {
              console.error("Error evaluating function:", error);
              break;
            }
          }
          ctx.stroke();
        });
      }
    }
  };

  const handleAddGraphClick = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  const handleSubmitGraph = () => {
    setGraphs([...graphs, { func: graphFunc, color: graphColor }]);
    setShowModal(false);
  };

  const handleDeleteGraph = (index: number) => {
    const updatedGraphs = graphs.filter((_, i) => i !== index);
    setGraphs(updatedGraphs);
  };

  const handleEditGraph = (index: number) => {
    const graph = graphs[index];
    setGraphFunc(graph.func);
    setGraphColor(graph.color);
    handleDeleteGraph(index);
    setShowModal(true);
  };

  const handleIncreaseGrid = () => {
    setGridSize((prev) => Math.min(prev + 5, 60));
  };

  const handleDecreaseGrid = () => {
    setGridSize((prev) => Math.max(prev - 5, 20));
  };

  useEffect(() => {
    drawGraph();
  }, [graphs, gridSize]);

  return (
    <div className="reletive flex flex-col items-center justify-center gap-5">
      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-primary text-lg font-bold">
            Grid Size: {gridSize}
          </h2>
          <Button
            className="font-bold text-2xl py-1 px-3"
            onClick={handleIncreaseGrid}
          >
            <SoArrowUp className="w-5 h-5" />
          </Button>
          <Button
            className="font-bold text-2xl py-1 px-3"
            onClick={handleDecreaseGrid}
          >
            <SoArrowDown className="w-5 h-5" />
          </Button>
        </div>
        <button
          onClick={handleAddGraphClick}
          className="bg-transparent border border-primary flex items-center gap-2 text-white px-6 py-2 rounded-md hover:bg-primary duration-150 ease-out"
        >
          Add a new Graph <SoAddSquare className="w-5 h-5" />
        </button>
      </div>
      <div className="absolute top-52 left-36">
        <ul>
          {graphs.map((graph, index) => (
            <li key={index} className="mb-2">
              <div
                className="flex items-center gap-2"
                style={{ color: graph.color }}
              >
                <span className="w-44">Y = {graph.func}</span>
                <Button
                  onClick={() => handleEditGraph(index)}
                  className="text-primary p-2"
                >
                  <SoEditSquare2 className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleDeleteGraph(index)}
                  variant="danger"
                  className="p-2"
                >
                  <SoTrash className="w-4 h-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-2">
        <canvas ref={canvasRef} width="1500" height="800"></canvas>
      </div>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
          <div className="fixed inset-0 backdrop-blur-sm" aria-hidden="true" />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <ul className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <li className="text-2xl font-medium text-primary">
                        Mathematical functions
                      </li>
                      <img
                        className="w-7 h-7 transform-gpu mb-2"
                        src={IosRocket}
                        alt="Ios Rokcet"
                      />
                    </div>
                    <li>
                      <strong className="text-primary">abs(x):</strong> Returns
                      the absolute value of x.
                    </li>
                    <li>
                      <strong className="text-primary">pow(x, y):</strong>{" "}
                      Returns the value of x to the power of y.
                    </li>
                    <li>
                      <strong className="text-primary">sqrt(x):</strong> Returns
                      the square root of x.
                    </li>
                    {/* <li>
                      <strong className="text-primary">round(x):</strong> Rounds
                      x to the nearest integer.
                    </li>
                    <li>
                      <strong className="text-primary">floor(x):</strong>{" "}
                      Returns x, rounded downwards to the nearest integer.
                    </li>
                    <li>
                      <strong className="text-primary">ceil(x):</strong> Returns
                      x, rounded upwards to the nearest integer.
                    </li> */}
                    <li>
                      <strong className="text-primary">sin(x):</strong> Returns
                      the sine of x (x is in radians).
                    </li>
                    <li>
                      <strong className="text-primary">asin(x):</strong> Returns
                      the arcsine of x, in radians.
                    </li>
                    <li>
                      <strong className="text-primary">cos(x):</strong> Returns
                      the cosine of x (x is in radians).
                    </li>
                    <li>
                      <strong className="text-primary">acos(x):</strong> Returns
                      the arccosine of x, in radians.
                    </li>
                    <li>
                      <strong className="text-primary">tan(x):</strong> Returns
                      the tangent of an angle.
                    </li>
                    <li>
                      <strong className="text-primary">atan(x):</strong> Returns
                      the arctangent of x as a numeric value between -PI/2 and
                      PI/2 radians.
                    </li>
                    <li>
                      <strong className="text-primary">atan2(y, x):</strong>{" "}
                      Returns the arctangent of the quotient of its arguments.
                    </li>
                    <li>
                      <strong className="text-primary">exp(x):</strong> Returns
                      the value of E raised to the power of x.
                    </li>
                    <li>
                      <strong className="text-primary">log(x):</strong> Returns
                      the natural logarithm (base E) of x.
                    </li>
                    {/* <li>
                      <strong className="text-primary">
                        max(x, y, z,...,n):
                      </strong>{" "}
                      Returns the number with the highest value.
                    </li>
                    <li>
                      <strong className="text-primary">
                        min(x, y, z,...,n):
                      </strong>{" "}
                      Returns the number with the lowest value.
                    </li> */}
                    <li className="text-red-600 font-medium mt-3">
                      WARNING: If you write bad graph input, graph will not
                      show! <br /> Example: Math.sin(x*x)+Math.tan(x).
                    </li>
                  </ul>
                  <div className="w-full flex flex-row items-center gap-2 border border-primary rounded-lg relative mb-5">
                    <div className="bg-primary text-white p-2 pr-8 rounded-l-md flex items-center gap-3">
                      <span className="text-base font-semibold w-fit max-sm:hidden">
                        YAxis
                      </span>
                    </div>
                    <Input
                      type="text"
                      value={graphFunc}
                      onChange={(e) => setGraphFunc(e.target.value)}
                      placeholder="Enter function (e.g., sin(x), cos(x))"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-5">
                    <label
                      htmlFor="color-picker"
                      className="block text-lg font-semibold text-primary"
                    >
                      Choose Color:
                    </label>
                    <input
                      id="color-picker"
                      type="color"
                      value={graphColor}
                      onChange={(e) => setGraphColor(e.target.value)}
                      className="w-8 h-8 rounded-md p-0 cursor-pointer outline-none focus:outline-none"
                    />
                  </div>
                  <div className="w-full flex items-center justify-between gap-3">
                    <Button fullWidth onClick={handleSubmitGraph}>
                      Add
                    </Button>
                    <Button
                      fullWidth
                      onClick={handleCloseModal}
                      variant="danger"
                    >
                      Back
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CalcGraph;
