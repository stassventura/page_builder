import logo from '../assets/images/logo.svg';
import Tooltip from './Tooltip';

interface SidebarProps {
  createRow: () => void;
  selectedItemId: number | null;
  createCall: (id: number) => void;
  deleteRow: (id: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ createRow, selectedItemId, createCall, deleteRow }) => {
  return (
    <div className="bg-white border-r shadow-lg w-20 p-2 rounded-lg flex flex-col items-center pt-[5%] gap-5 relative ">
      <div className="absolute top-4 left-[50%] w-12 translate-x-[-50%] select-none">
        <img src={logo} alt="" />
      </div>

      <Tooltip content="Add new Element">
        <div
          className="w-10 h-10 rounded-full mb-2 flex items-center justify-center cursor-pointer shadow-xl border-2 border-gray-200 hover:border-gray-500 bg-gray-100"
          onClick={() => (selectedItemId !== null ? createCall(selectedItemId) : createRow())}>
          {/* <PlusIcon /> */}
          <i className="fa-solid fa-plus"></i>
        </div>
      </Tooltip>
      <Tooltip content="Change the background color of an item">
        <div className="w-10 h-10 rounded-full mb-2 flex items-center justify-center cursor-pointer shadow-xl border-2 border-gray-200 hover:border-gray-500 bg-gray-100">
          <i className="fa-solid fa-font"></i>
        </div>
      </Tooltip>
      <Tooltip content="Add image to element">
        <div className="w-10 h-10 rounded-full mb-2 flex items-center justify-center cursor-pointer shadow-xl border-2 border-gray-200 hover:border-gray-500 bg-gray-100">
          <i className="fa-regular fa-image"></i>
        </div>
      </Tooltip>
      {/* <input type="color" id="colorPicker" /> */}

      <Tooltip content="Change the color of an item">
        <div className="w-10 h-10 rounded-full mb-2 flex items-center justify-center cursor-pointer shadow-xl border-2 border-gray-200 hover:border-gray-500 bg-gray-100">
          <i className="fa-solid fa-palette"></i>
        </div>
      </Tooltip>

      <Tooltip content="Add button to element">
        <div className="w-10 h-10 rounded-full mb-2 flex items-center justify-center cursor-pointer shadow-xl border-2 border-gray-200 hover:border-gray-500 bg-gray-100">
          <i className="fa-regular fa-circle-dot"></i>
        </div>
      </Tooltip>

      <Tooltip content="Expand the gap between elements">
        <div className="w-10 h-10 rounded-full mb-2 flex items-center justify-center cursor-pointer shadow-xl border-2 border-gray-200 hover:border-gray-500 bg-gray-100">
          <i className="fa-solid fa-expand"></i>
        </div>
      </Tooltip>

      <Tooltip content="Compress the gap between elements">
        <div className="w-10 h-10 rounded-full mb-2 flex items-center justify-center cursor-pointer shadow-xl border-2 border-gray-200 hover:border-gray-500 bg-gray-100">
          <i className="fa-solid fa-compress"></i>
        </div>
      </Tooltip>

      <Tooltip content="Delete selected Element">
        <div
          className="w-10 h-10 rounded-full mb-2 flex items-center justify-center cursor-pointer shadow-xl border-2 border-gray-200 hover:border-gray-500 bg-gray-100"
          onClick={() => deleteRow(selectedItemId!)}>
          <i className="fa-solid fa-trash"></i>
        </div>
      </Tooltip>
    </div>
  );
};

export default Sidebar;
