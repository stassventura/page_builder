import { useState } from 'react';
import { Row, Selected } from '../types';
import {
  getRandomRowColor,
  getRandomCellColor,
  getRandomSentence,
  generateRandomID,
  showError,
  showWarning,
} from '../helpers';

const useActions = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [selectedItem, setSelectedItem] = useState<Selected>(null);

  const createRow = () => {
    const newRow = {
      id: generateRandomID(),
      name: `row ${rows.length + 1}`,
      cells: [],
      gap: 10,
      color: getRandomRowColor(),
    };

    setRows((prev) => [newRow, ...prev]);
  };

  const expandGap = (item: Selected) => {
    if (!item || item.id === null) return showError('Select item to expand the gap');

    if (item.type === 'cell') return showError('Unavailable for Cell');

    const targetRow = rows.find((r) => r.id === item.id);
    if (targetRow && targetRow.gap >= 100) {
      return showError('The maximum value for Gap has been exceeded');
    }
    if (targetRow?.cells.length === 0)
      showWarning("You won't see any changes because the row is empty");

    const updatedrows = rows.map((r) => {
      if (r.id === item.id) {
        return {
          ...r,
          gap: r.gap + 5,
        };
      }
      return r;
    });

    setRows(updatedrows);
  };

  const compressGap = (item: Selected) => {
    if (!item || item.id === null) return showError('Select item to compress the gap');

    if (item.type === 'cell') return showError('Unavailable for Cell');

    const targetRow = rows.find((r) => r.id === item.id);
    if (targetRow && targetRow.gap <= 5) {
      return showError('Gap is too small to compress further');
    }
    if (targetRow?.cells.length === 0)
      showWarning("You won't see any changes because the row is empty");

    const updatedrows = rows.map((r) => {
      if (r.id === item.id) {
        return {
          ...r,
          gap: r.gap - 5,
        };
      }
      return r;
    });

    setRows(updatedrows);
  };

  const createCell = (id: number | null) => {
    const currentrows = [...rows];

    const row = currentrows.find((row) => row.id === id);

    if (row) {
      const newCell = {
        id: generateRandomID(),
        name: `Cell ${row.cells.length + 1}`,
        color: getRandomCellColor(),
      };

      row.cells.push(newCell);
    }

    setRows(currentrows);
  };

  const changeColor = (color: string, item: Selected) => {
    if (!item || item.id === null) {
      showError('Pick any element to change the color');
      return;
    }

    if (item.type === 'row') {
      const newRow = rows.map((row) => {
        if (row.id === item.id) {
          return { ...row, color: color };
        }
        return row;
      });
      setRows(newRow);
      return;
    }

    if (item.type === 'cell') {
      const newRow = rows.map((row) => {
        if (row.cells.some((cell) => cell.id === item.id)) {
          return {
            ...row,
            cells: row.cells.map((cell) => {
              if (cell.id === item.id) {
                return { ...cell, color: color };
              }
              return cell;
            }),
          };
        }
        return row;
      });

      setRows(newRow);
    }
  };

  const addButton = (item: Selected) => {
    if (!item || item.id === null) return showError('Select the item to add the button');
    if (item.type === 'row') return showError('Add button is not available for Row');

    const newRow = rows.map((row) => {
      if (row.cells.some((cell) => cell.id === item.id)) {
        return {
          ...row,
          cells: row.cells.map((cell) => {
            if (cell.id === item.id) {
              if (cell.content && cell.content.type === 'button') {
                showError('Button already exists in this cell');
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

    setRows(newRow);
  };
  const addImage = (image: string | null, item: Selected) => {
    if (!item || item.id === null) return showError('Select the item to add the text');
    if (item.type === 'row') return showError('Add text is not available for Row');
    if (!image) return showError('An error occurred when adding an image');

    const newRow = rows.map((row) => {
      if (row.cells.some((cell) => cell.id === item.id)) {
        return {
          ...row,
          cells: row.cells.map((cell) => {
            if (cell.id === item.id) {
              if (cell.content && cell.content.type === 'image') {
                showError('Image already exists in this cell');
                return cell;
              }
              return {
                ...cell,
                content: {
                  type: 'image',
                  src: image,
                },
              };
            }
            return cell;
          }),
        };
      }
      return row;
    });

    setRows(newRow);
  };

  const addText = (item: Selected) => {
    if (!item || item.id === null) return showError('Select the item to add the text');
    if (item.type === 'row') return showError('Add text is not available for Row');

    const newRow = rows.map((row) => {
      if (row.cells.some((cell) => cell.id === item.id)) {
        return {
          ...row,
          cells: row.cells.map((cell) => {
            if (cell.id === item.id) {
              if (cell.content && cell.content.type === 'text') {
                showError('Text already exists in this cell');
                return cell;
              }
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

    setRows(newRow);
  };

  const deleteRow = (item: Selected) => {
    if (!item || item.id === null) return showError('Select item to delete');

    if (item.type === 'row') {
      const newRow = rows.filter((r) => r.id !== item.id);
      setRows(newRow);
      setSelectedItem(null);

      return;
    }
    if (item.type === 'cell') {
      const newRow = rows.map((row) => {
        if (row.cells.some((cell) => cell.id === item.id)) {
          return {
            ...row,
            cells: row.cells.filter((cell) => cell.id !== item.id),
          };
        }
        return row;
      });

      setRows(newRow);
      setSelectedItem(null);
    }
  };

  const selectItem = (id: number, type: string) => {
    setSelectedItem({
      id,
      type,
    });
  };

  return {
    selectedItem,
    createRow,
    createCell,
    expandGap,
    compressGap,
    changeColor,
    addButton,
    addImage,
    addText,
    deleteRow,
    selectItem,
    rows,
    setSelectedItem,
  };
};

export default useActions;
