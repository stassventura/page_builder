import logo from '../assets/images/logo.svg';
import { Selected } from '../types';
import Tooltip from './Tooltip';
import { useRef, FC } from 'react';
import { showError } from '../helpers';

interface SidebarProps {
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
const iconStyle =
  'w-10 h-10 rounded-full mb-2 flex items-center justify-center cursor-pointer shadow-xl border-2 border-gray-200 hover:border-gray-500 bg-gray-100';

const Sidebar: FC<SidebarProps> = ({
  createRow,
  selectedItem,
  createCell,
  deleteRow,
  expandGap,
  compressGap,
  changeColor,
  addButton,
  addText,
  addImage,
}) => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const buttonsConfig = [
    {
      tooltip: 'Add new Element',
      icon: 'fa-solid fa-plus',
      action: (item: Selected | null) => (item && item.id ? createCell(item.id) : createRow()),
    },
    {
      tooltip: 'Add text to the element',
      icon: 'fa-solid fa-font',
      action: (item: Selected | null) => addText(item || null),
    },
    {
      tooltip: 'Add button to element',
      icon: 'fa-regular fa-circle-dot',
      action: (item: Selected | null) => addButton(item || null),
    },
    {
      tooltip: 'Expand the gap between elements',
      icon: 'fa-solid fa-expand',
      action: (item: Selected | null) => expandGap(item || null),
    },
    {
      tooltip: 'Compress the gap between elements',
      icon: 'fa-solid fa-compress',
      action: (item: Selected | null) => compressGap(item || null),
    },

    {
      tooltip: 'Delete selected Element',
      icon: 'fa-solid fa-trash',
      action: (item: Selected | null) => deleteRow(item || null),
    },
  ];

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

  const handleFileClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (selectedItem === null || selectedItem.type !== 'cell') {
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

      {buttonsConfig.slice(0, 2).map(({ tooltip, icon, action }, idx) => (
        <Tooltip key={idx} content={tooltip}>
          <div className={iconStyle} onClick={() => action(selectedItem)}>
            <i className={`${icon}`}></i>
          </div>
        </Tooltip>
      ))}

      <Tooltip content="Add image to element">
        <div className={iconStyle} onClick={handleFileClick}>
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

      {buttonsConfig.slice(2).map(({ tooltip, icon, action }, idx) => (
        <Tooltip key={idx} content={tooltip}>
          <div className={iconStyle} onClick={() => action(selectedItem)}>
            <i className={`${icon}`}></i>
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default Sidebar;
