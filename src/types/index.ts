type Content = {
  type: string;
  src?: string;
  value?: string;
};

type Call = {
  id: number;
  name: string;
  color: string;
  content?: Content;
};

export type Data = {
  id: number;
  name: string;
  cells: Call[];
  color: string;
  gap: number;
};

export type Selected = {
  id: number | null;
  type: string;
} | null;
