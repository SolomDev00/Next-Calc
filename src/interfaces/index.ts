/* eslint-disable @typescript-eslint/no-explicit-any */
import { TooltipProps } from "recharts";

export interface CustomTooltipProps extends TooltipProps<number, string> {
    payload?: {
        name: string;
        value: number;
        color: string;
        dataKey: string;
        payload: {
            key: string;
        }
    }[];
    label?: string;
}

export interface Chart {
  id: number;
  type: "bar" | "line" | "pie" | "rader" | "celsius" | "wave";
  data: any;
  createdAt: string;
}
