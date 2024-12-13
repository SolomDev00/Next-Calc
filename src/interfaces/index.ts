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