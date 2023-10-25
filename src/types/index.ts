type Call = {
  id: number;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // content: any[];
};

export type Data = {
  id: number;
  name: string;
  cells: Call[];
  grid: number;
};
