import logo from '../assets/images/logo.svg';
import { Selected } from '../types';
import Tooltip from './Tooltip';
import useAllert from '../hooks/useAllert';
import { useRef } from 'react';
interface SidebarProps {
  createRow: () => void;
  selectedItem: Selected;
  createCall: (id: number) => void;
  deleteRow: (item: Selected | null) => void;
  expandGap: (item: Selected | null) => void;
  compressGap: (item: Selected | null) => void;
  changeColor: (color: string, item: Selected | null) => void;
  addButton: (item: Selected | null) => void;
  addText: (item: Selected | null) => void;
  addImage: (image: string | null, item: Selected | null) => void;
}
const iconStyle =
  'w-10 h-10 rounded-full mb-2 flex items-center justify-center cursor-pointer shadow-xl border-2 border-gray-200 hover:border-gray-500 bg-gray-100';

const Sidebar: React.FC<SidebarProps> = ({
  createRow,
  selectedItem,
  createCall,
  deleteRow,
  expandGap,
  compressGap,
  changeColor,
  addButton,
  addText,
  addImage,
}) => {
  const { showError } = useAllert();
  const colorInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedItem === null) {
      e.preventDefault();
      showError('Select the item to change the color');
    } else {
      changeColor(e.target.value, selectedItem);
    }
  };

  const handleColorClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (selectedItem === null) {
      e.preventDefault();
      return showError('Select the item to change the color');
    } else {
      colorInputRef.current?.click();
    }
  };

  const handleIconClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (selectedItem === null || selectedItem.type !== 'call') {
      e.preventDefault();
      showError('Select the item to add the image');
      return;
    }

    imageInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      showError('No file selected!');
      return;
    }

    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = function (e) {
      if (e.target && typeof e.target.result === 'string') {
        addImage(e.target.result, selectedItem);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white border-r shadow-lg w-20 p-2 rounded-lg flex flex-col items-center pt-[5%] gap-5 relative ">
      <div className="absolute top-4 left-[50%] w-12 translate-x-[-50%] select-none">
        <img src={logo} alt="" />
      </div>

      <Tooltip content="Add new Element">
        <div
          className={iconStyle}
          onClick={() =>
            selectedItem !== null && selectedItem.id ? createCall(selectedItem?.id) : createRow()
          }>
          <i className="fa-solid fa-plus"></i>
        </div>
      </Tooltip>
      <Tooltip content="Add text to the element">
        <div
          className={iconStyle}
          onClick={() => {
            selectedItem !== null && selectedItem.id ? addText(selectedItem) : addText(null);
          }}>
          <i className="fa-solid fa-font"></i>
        </div>
      </Tooltip>
      <Tooltip content="Add image to element">
        <div className={iconStyle} onClick={handleIconClick}>
          <input
            type="file"
            ref={imageInputRef}
            className="w-full h-full opacity-0 absolute cursor-pointer hidden"
            onChange={handleFileChange}
            accept="image/*"
            multiple={false}
          />
          <i className="fa-regular fa-image"></i>
        </div>
      </Tooltip>

      <Tooltip content="Change the color of an item">
        <div className={iconStyle} onClick={handleColorClick}>
          <input
            type="color"
            ref={colorInputRef}
            className="w-full h-full opacity-0 absolute cursor-pointer"
            onChange={handleColorChange}
          />

          <i className="fa-solid fa-palette"></i>
        </div>
      </Tooltip>

      <Tooltip content="Add button to element">
        <div
          className={iconStyle}
          onClick={() => {
            selectedItem !== null && selectedItem.id ? addButton(selectedItem) : addButton(null);
          }}>
          <i className="fa-regular fa-circle-dot"></i>
        </div>
      </Tooltip>

      <Tooltip content="Expand the gap between elements">
        <div
          className={iconStyle}
          onClick={() => {
            selectedItem !== null && selectedItem.id ? expandGap(selectedItem) : expandGap(null);
          }}>
          <i className="fa-solid fa-expand"></i>
        </div>
      </Tooltip>

      <Tooltip content="Compress the gap between elements">
        <div
          className={iconStyle}
          onClick={() => {
            selectedItem !== null && selectedItem.id
              ? compressGap(selectedItem)
              : compressGap(null);
          }}>
          <i className="fa-solid fa-compress"></i>
        </div>
      </Tooltip>

      <Tooltip content="Delete selected Element">
        <div
          className={iconStyle}
          onClick={() => {
            selectedItem !== null && selectedItem.id ? deleteRow(selectedItem) : deleteRow(null);
          }}>
          <i className="fa-solid fa-trash"></i>
        </div>
      </Tooltip>
    </div>
  );
};

export default Sidebar;
