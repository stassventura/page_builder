import { useState } from 'react';
import { Row, Selected } from '../types';
import { messages } from '../helpers/messages';

import { generateRow, showError, showWarning, RowHelpers } from '../helpers';

const useActions = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [selectedItem, setSelectedItem] = useState<Selected>(null);

  const createRow = () => {
    setRows((prev) => [generateRow(rows.length), ...prev]);
  };

  const expandGap = (item: Selected) => {
    if (!item || item.id === null) return showError(messages.selectItemExpand);
    if (item.type === 'cell') return showError(messages.unavailableForCell);

    const targetRow = rows.find((r) => r.id === item.id);
    if (targetRow && targetRow.gap >= 100) {
      return showError(messages.maxGapExceeded);
    }
    if (targetRow?.cells.length === 0) showWarning(messages.emptyRow);

    setRows((prev) => RowHelpers.expandRowGap(prev, item.id!));
  };

  const compressGap = (item: Selected) => {
    if (!item || item.id === null) return showError(messages.selectItemCompress);

    if (item.type === 'cell') return showError(messages.unavailableForCell);

    const targetRow = rows.find((r) => r.id === item.id);
    if (targetRow && targetRow.gap <= 5) {
      return showError(messages.minGapExceeded);
    }
    if (targetRow?.cells.length === 0) showWarning(messages.emptyRow);

    setRows((prev) => RowHelpers.compressRowGap(prev, item.id!));
  };

  const createCell = (id: number | null) => {
    if (!id) return showError(messages.createCellError);

    const rowExists = rows.some((row) => row.id === id);
    if (!rowExists) return showError(messages.createCellError);

    setRows((prev) => RowHelpers.addCellToRow(prev, id));
  };

  const changeColor = (color: string, item: Selected) => {
    if (!item || item.id === null) {
      showError(messages.pickElementColor);
      return;
    }

    if (item.type === 'row') {
      setRows((prev) => RowHelpers.changeRowColor(prev, item.id!, color));
      return;
    }

    if (item.type === 'cell') {
      setRows((prev) => RowHelpers.changeCellColor(prev, item.id!, color));
    }
  };

  const addButton = (item: Selected) => {
    if (!item || item.id === null) return showError(messages.selectItemButton);
    if (item.type === 'row') return showError(messages.buttonUnavailableForRow);
    setRows((prevRows) => RowHelpers.addButton(prevRows, item));
  };

  const addImage = (image: string | null, item: Selected) => {
    if (!item || item.id === null) return showError(messages.selectItemText);
    if (item.type === 'row') return showError(messages.imageUnavailableForRow);
    if (!image) return showError(messages.addingImageError);

    const existingCellHasImage = rows.some((row) =>
      row.cells.some(
        (cell) => cell.id === item.id && cell.content && cell.content.type === 'image',
      ),
    );
    if (existingCellHasImage) {
      showError(messages.imageExists);
      return;
    }

    setRows((prev) => RowHelpers.addImageToCell(prev, item.id!, image));
  };

  const addText = (item: Selected) => {
    if (!item || item.id === null) return showError(messages.selectItemText);
    if (item.type === 'row') return showError(messages.addingTextError);

    const existingCellHasText = rows.some((row) =>
      row.cells.some((cell) => cell.id === item.id && cell.content && cell.content.type === 'text'),
    );
    if (existingCellHasText) {
      showError(messages.textExists);
      return;
    }

    setRows((prev) => RowHelpers.addTextToCell(prev, item.id!));
  };

  const deleteRow = (item: Selected) => {
    if (!item || item.id === null) return showError(messages.selectItemDelete);

    if (item.type === 'row') {
      setRows((prev) => RowHelpers.deleteRowById(prev, item.id!));
      setSelectedItem(null);
    } else if (item.type === 'cell') {
      setRows((prev) => RowHelpers.deleteCellById(prev, item.id!));
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
