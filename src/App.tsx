import Sidebar from './components/Sidebar';
import WorkSpace from './components/WorkSpace';
import { ToastContainer } from 'react-toastify';
import useActions from './hooks/useActions';

function App() {
  const { selectedItem, resetSelectedItem, ...rest } = useActions();

  return (
    <>
      <div className="flex h-screen bg-gray-200 p-2 gap-3">
        <Sidebar selectedItem={selectedItem} {...rest} />

        <div className="flex-1 p-5 shadow-md rounded-lg bg-white overflow-y-auto">
          <h1 className="text-2xl mb-4 border-b pb-2 relative">
            Canvas
            {!!selectedItem && (
              <span
                className="text-base font-semibold absolute w-full left-0 top-[50%] translate-y-[-50%] text-center cursor-pointer text-gray-400 hover:text-gray-900"
                onClick={resetSelectedItem}>
                Click here to reset selected Item
              </span>
            )}
          </h1>
          <WorkSpace
            rows={rest.rows}
            selectedItem={selectedItem}
            selectItem={rest.selectItem}
            createCell={rest.createCell}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
