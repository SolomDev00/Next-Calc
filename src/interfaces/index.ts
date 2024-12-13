/* eslint-disable @typescript-eslint/no-explicit-any */
import { TooltipProps } from "recharts";
import { ChartsType } from "../types";

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
  id: string;
  type: ChartsType;
  data: any;
  createdAt: string;
  userId: string | undefined;
}
