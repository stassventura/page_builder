type Content = {
  type: string;
  src?: string;
  value?: string;
};

type Cell = {
  id: number;
  name: string;
  color: string;
  content?: Content;
};

export type Row = {
  id: number;
  name: string;
  cells: Cell[];
  color: string;
  gap: number;
};

export type Selected = {
  id: number | null;
  type: string;
} | null;
