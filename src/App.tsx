import Sidebar from './components/Sidebar';
import WorkSpace from './components/WorkSpace';
import { ToastContainer } from 'react-toastify';
import useActions from './hooks/useActions';

function App() {
  const {
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
    setSelectedItem,
    rows,
  } = useActions();

  return (
    <>
      <div className="flex h-screen bg-gray-200 p-2 gap-3">
        <Sidebar
          createRow={createRow}
          selectedItem={selectedItem}
          createCell={createCell}
          expandGap={expandGap}
          compressGap={compressGap}
          deleteRow={deleteRow}
          changeColor={changeColor}
          addButton={addButton}
          addText={addText}
          addImage={addImage}
        />

        <div className="flex-1 p-5 shadow-md rounded-lg bg-white overflow-y-auto">
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
            rows={rows}
            selectedItem={selectedItem}
            selectItem={selectItem}
            createCell={createCell}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
