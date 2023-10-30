import { Row, ActiveItem } from '../types';
import {
  generateRandomID,
  getRandomRowColor,
  getRandomCellColor,
  showError,
  getRandomSentence,
} from './fakers';
import { messages } from './messages';

export const generateRow = (rowLength: number) => {
  const newRow = {
    id: generateRandomID(),
    name: `row ${rowLength + 1}`,
    cells: [],
    gap: 10,
    color: getRandomRowColor(),
  };

  return newRow;
};

export const generateCell = (row: Row) => {
  const newCell = {
    id: generateRandomID(),
    name: `Cell ${row.cells.length + 1}`,
    color: getRandomCellColor(),
  };

  return newCell;
};

export const RowHelpers = {
  addButton: (prew: Row[], item: ActiveItem): Row[] => {
    return prew.map((row) => {
      if (row.cells.some((cell) => cell.id === item!.id)) {
        return {
          ...row,
          cells: row.cells.map((cell) => {
            if (cell.id === item!.id) {
              if (cell?.content?.type === 'button') {
                showError(messages.buttonExists);
                return cell;
              }
              return {
                ...cell,
                content: {
                  type: 'button',
                  value: 'Click Me',
                },
              };
            }
            return cell;
          }),
        };
      }
      return row;
    });
  },
  changeRowColor: (prev: Row[], itemId: number, color: string): Row[] => {
    return prev.map((row) => {
      if (row.id === itemId) {
        return { ...row, color: color };
      }
      return row;
    });
  },

  changeCellColor: (prev: Row[], itemId: number, color: string): Row[] => {
    return prev.map((row) => {
      if (row.cells.some((cell) => cell.id === itemId)) {
        return {
          ...row,
          cells: row.cells.map((cell) => {
            if (cell.id === itemId) {
              return { ...cell, color: color };
            }
            return cell;
          }),
        };
      }
      return row;
    });
  },
  addCellToRow: (prevRows: Row[], rowId: number): Row[] => {
    return prevRows.map((row) => {
      if (row.id === rowId) {
        const newCell = generateCell(row);
        return {
          ...row,
          cells: [...row.cells, newCell],
        };
      }
      return row;
    });
  },
  expandRowGap: (prevRows: Row[], rowId: number): Row[] => {
    return prevRows.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          gap: row.gap + 5,
        };
      }
      return row;
    });
  },
  compressRowGap: (prevRows: Row[], rowId: number): Row[] => {
    return prevRows.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          gap: row.gap - 5,
        };
      }
      return row;
    });
  },
  addImageToCell: (prevRows: Row[], cellId: number, imageSrc: string): Row[] => {
    return prevRows.map((row) => {
      if (row.cells.some((cell) => cell.id === cellId)) {
        return {
          ...row,
          cells: row.cells.map((cell) => {
            if (cell.id === cellId) {
              return {
                ...cell,
                content: {
                  type: 'image',
                  src: imageSrc,
                },
              };
            }
            return cell;
          }),
        };
      }
      return row;
    });
  },
  addTextToCell: (prevRows: Row[], cellId: number): Row[] => {
    return prevRows.map((row) => {
      if (row.cells.some((cell) => cell.id === cellId)) {
        return {
          ...row,
          cells: row.cells.map((cell) => {
            if (cell.id === cellId) {
              return {
                ...cell,
                content: {
                  type: 'text',
                  value: getRandomSentence(),
                },
              };
            }
            return cell;
          }),
        };
      }
      return row;
    });
  },
  deleteRowById: (prevRows: Row[], rowId: number): Row[] => {
    return prevRows.filter((row) => row.id !== rowId);
  },
  deleteCellById: (prevRows: Row[], cellId: number) => {
    return prevRows.map((row) => {
      if (row.cells.some((cell) => cell.id === cellId)) {
        return {
          ...row,
          cells: row.cells.filter((cell) => cell.id !== cellId),
        };
      }
      return row;
    });
  },
};
