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

export interface SidebarProps {
  createRow: () => void;
  selectedItem: Selected;
  createCell: (id: number) => void;
  deleteRow: (item: Selected | null) => void;
  expandGap: (item: Selected | null) => void;
  compressGap: (item: Selected | null) => void;
  changeColor: (color: string, item: Selected | null) => void;
  addButton: (item: Selected | null) => void;
  addText: (item: Selected | null) => void;
  addImage: (image: string | null, item: Selected | null) => void;
}

export interface WorkSpaceProps {
  rows: Row[];
  selectedItem: Selected;
  selectItem: (id: number, type: string) => void;
  createCell: (id: number) => void;
}
