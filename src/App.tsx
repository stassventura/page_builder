import './App.css';
import Sidebar from './components/Sidebar';
import WorkSpace from './components/WorkSpace';
import { useState } from 'react';
import { Data } from './types';
import { ToastContainer } from 'react-toastify';
import { Selected } from './types/index';
import useAllert from './hooks/useAllert';

const getRandomRowColor = () => {
  const colors = ['F875AA', 'A0E9FF', 'BEADFA', 'FF9B9B', 'FFD966'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return `#${colors[randomIndex]}`;
};

const getRandomCellColor = () => {
  const colors = ['008170', '9F73AB', '704F4F', '5B4B8A'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return `#${colors[randomIndex]}`;
};
const getRandomSentence = () => {
  const sentences = [
    'This could be your ad.',
    'The sun is shining.',
    'Rain is coming soon.',
    'I love programming.',
    'JavaScript is fun.',
    'This is a random sentence.',
  ];
  const randomIndex = Math.floor(Math.random() * sentences.length);
  return sentences[randomIndex];
};

const generateRandomID = () => {
  let id: number = 0;
  for (let i = 0; i < 12; i++) {
    id = id * 10 + Math.floor(Math.random() * 10);
  }
  return id;
};

function App() {
  const [data, setData] = useState<Data[]>([]);
  const [selectedItem, setSelectedItem] = useState<Selected>(null);
  const { showError, showWarning } = useAllert();

  const createRow = () => {
    const newRow = {
      id: generateRandomID(),
      name: `row ${data.length + 1}`,
      cells: [],
      gap: 10,
      color: getRandomRowColor(),
    };

    setData((prev) => [newRow, ...prev]);
  };

  const expandGap = (item: Selected) => {
    if (!item || item.id === null) return showError('Select item to expand the gap');

    if (item.type === 'call') return showError('Unavailable for Call');

    const targetRow = data.find((r) => r.id === item.id);
    if (targetRow && targetRow.gap >= 100) {
      return showError('The maximum value for Gap has been exceeded');
    }
    if (targetRow?.cells.length && targetRow.cells.length < 2)
      showWarning("You won't see any changes because the row is empty");

    const updatedData = data.map((r) => {
      if (r.id === item.id) {
        return {
          ...r,
          gap: r.gap + 5,
        };
      }
      return r;
    });

    setData(updatedData);
  };

  const compressGap = (item: Selected) => {
    if (!item || item.id === null) return showError('Select item to compress the gap');

    if (item.type === 'call') return showError('Unavailable for Call');

    const targetRow = data.find((r) => r.id === item.id);
    if (targetRow && targetRow.gap <= 5) {
      return showError('Gap is too small to compress further');
    }
    if (targetRow?.cells.length && targetRow.cells.length < 2)
      showWarning("You won't see any changes because the row is empty");

    const updatedData = data.map((r) => {
      if (r.id === item.id) {
        return {
          ...r,
          gap: r.gap - 5,
        };
      }
      return r;
    });

    setData(updatedData);
  };

  const createCall = (id: number) => {
    const currentData = [...data];

    const row = currentData.find((row) => row.id === id);

    if (row) {
      const newCell = {
        id: generateRandomID(),
        name: `Cell ${row.cells.length + 1}`,
        color: getRandomCellColor(),
      };

      row.cells.push(newCell);
    }

    setData(currentData);
  };

  const changeColor = (color: string, item: Selected) => {
    if (!item || item.id === null) {
      showError('Pick any element to change the color');
      return;
    }

    if (item.type === 'row') {
      const newData = data.map((row) => {
        if (row.id === item.id) {
          return { ...row, color: color };
        }
        return row;
      });
      setData(newData);
      return;
    }

    if (item.type === 'call') {
      const newData = data.map((row) => {
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

      setData(newData);
    }
  };

  const addButton = (item: Selected) => {
    if (!item || item.id === null) return showError('Select the item to add the button');
    if (item.type === 'row') return showError('Add button is not available for Row');

    const newData = data.map((row) => {
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

    setData(newData);
  };
  const addImage = (image: string | null, item: Selected) => {
    if (!item || item.id === null) return showError('Select the item to add the text');
    if (item.type === 'row') return showError('Add text is not available for Row');
    if (!image) return showError('An error occurred when adding an image');

    const newData = data.map((row) => {
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

    setData(newData);
  };

  const addText = (item: Selected) => {
    if (!item || item.id === null) return showError('Select the item to add the text');
    if (item.type === 'row') return showError('Add text is not available for Row');

    const newData = data.map((row) => {
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

    setData(newData);
  };

  const deleteRow = (item: Selected) => {
    if (!item || item.id === null) return showError('Select item to delete');

    if (item.type === 'row') {
      const newdata = data.filter((r) => r.id !== item.id);
      setData(newdata);
      setSelectedItem(null);

      return;
    }
    if (item.type === 'call') {
      const newData = data.map((row) => {
        if (row.cells.some((cell) => cell.id === item.id)) {
          return {
            ...row,
            cells: row.cells.filter((cell) => cell.id !== item.id),
          };
        }
        return row;
      });

      setData(newData);
      setSelectedItem(null);
    }
  };

  const selectItem = (id: number, type: string) => {
    setSelectedItem({
      id,
      type,
    });
  };

  return (
    <>
      <div className="flex h-screen bg-gray-200 p-2 gap-3">
        <Sidebar
          createRow={createRow}
          selectedItem={selectedItem}
          createCall={createCall}
          expandGap={expandGap}
          compressGap={compressGap}
          deleteRow={deleteRow}
          changeColor={changeColor}
          addButton={addButton}
          addText={addText}
          addImage={addImage}
        />

        <div className="flex-1 p-5 shadow-md rounded-lg bg-white">
          <h1 className="text-2xl mb-4 border-b pb-2 relative">
            Canvas
            {selectedItem !== null && (
              <span
                className="text-base font-semibold absolute w-full left-0 top-[50%] translate-y-[-50%] text-center cursor-pointer text-gray-400 hover:text-gray-900"
                onClick={() => setSelectedItem(null)}>
                Click here to reset selected Item
              </span>
            )}
          </h1>
          <WorkSpace
            data={data}
            selectedItem={selectedItem}
            selectItem={selectItem}
            createCall={createCall}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
