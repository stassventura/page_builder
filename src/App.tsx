import './App.css';
import Sidebar from './components/Sidebar';
import WorkSpace from './components/WorkSpace';
import { useState } from 'react';
import { Data } from './types';
import { ToastContainer, toast } from 'react-toastify';

const generateRandomID = () => {
  let id: number = 0;
  for (let i = 0; i < 12; i++) {
    id = id * 10 + Math.floor(Math.random() * 10);
  }
  return id;
};

function App() {
  const [data, setData] = useState<Data[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const createRow = () => {
    const newRow = {
      id: generateRandomID(),
      name: `row ${data.length + 1}`,
      cells: [],
      grid: 0,
    };

    setData((prev) => [newRow, ...prev]);
  };

  const createCall = (id: number) => {
    const currentData = [...data];

    const row = currentData.find((row) => row.id === id);

    if (row) {
      const newCell = {
        id: generateRandomID(),
        name: `Cell ${row.cells.length + 1}`,
      };

      row.cells.push(newCell);
      row.grid = row.cells.length;
    }

    setData(currentData);
  };

  const deleteRow = (id: number | null) => {
    if (id) {
      console.log(id);
      const newdata = data.filter((item) => item.id !== id);
      setData(newdata);
      setSelectedItemId(null);
    } else {
      toast.error('Select item to delete', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  const selectItem = (id: number) => {
    console.log(id);

    setSelectedItemId(id);
  };

  return (
    <>
      <div className="flex h-screen bg-gray-200 p-2 gap-3">
        <Sidebar
          createRow={createRow}
          selectedItemId={selectedItemId}
          createCall={createCall}
          deleteRow={deleteRow}
        />

        <div className="flex-1 p-5 shadow-md rounded-lg bg-white">
          <h1 className="text-2xl mb-4 border-b pb-2">Canvas</h1>
          <WorkSpace
            data={data}
            selectedItemId={selectedItemId}
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
