export type DataPoint = {
  key: string;
  value?: string | number;
  result: string | number;
};

export type ChartsType = "bar" | "line" | "pie" | "rader" | "celsius" | "wave";