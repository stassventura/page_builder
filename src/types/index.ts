type Content = {
  type: 'button' | 'image' | 'text';
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
export type ActiveItemType = 'row' | 'cell';

export type ActiveItem = {
  id: number;
  type: ActiveItemType;
} | null;
