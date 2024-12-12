/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";

interface IProps {
  Success: number;
  Canceled: number;
  NSuccess: string;
  NCanceled: string;
}

interface DataItem {
  name: string;
  value: number;
}

const data: DataItem[] = [
  { name: "SMS Remain", value: 70 },
  { name: "SMS Consumed", value: 30 },
];

interface RenderActiveShapeProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: DataItem;
  percent: number;
  value: number;
}

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props as RenderActiveShapeProps;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        style={{ fontSize: "16px", fontWeight: "bold" }}
      >
        {payload.name}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={5}
        textAnchor={textAnchor}
        fill="#999"
        style={{ fontSize: "16px", zIndex: 1000 }}
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

const DashboardPieChart = ({
  Success,
  Canceled,
  NSuccess,
  NCanceled,
}: IProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (
    _: React.MouseEvent<SVGPathElement, MouseEvent>,
    index: number
  ) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-full h-[25vh] relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={activeIndex ?? undefined}
            activeShape={renderActiveShape as any}
            data={[
              { name: NSuccess, value: Success ? Success : 1 },
              { name: NCanceled, value: Canceled ? Canceled : 1 },
            ]}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === activeIndex ? "#007373" : "#A4E1D2"}
              />
            ))}
          </Pie>
          {/* <Legend
                        style={{ marginLeft: '75px' }}
                        verticalAlign="top"
                        align='center'
                        iconSize={16}
                        iconType='circle'
                    /> */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardPieChart;
