import Logo from '../assets/images/logo.svg';
import { ActiveItem } from '../types';
import Tooltip from './Tooltip';
import { useRef, FC } from 'react';
import { showError } from '../helpers/fakers';
import classNames from 'classnames';

interface SidebarProps {
  createRow: () => void;
  selectedItem: ActiveItem;
  createCell: (id: number) => void;
  deleteRow: (item: ActiveItem | null) => void;
  expandGap: (item: ActiveItem | null) => void;
  compressGap: (item: ActiveItem | null) => void;
  changeColor: (color: string, item: ActiveItem | null) => void;
  addButton: (item: ActiveItem | null) => void;
  addText: (item: ActiveItem | null) => void;
  addImage: (image: string | null, item: ActiveItem | null) => void;
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
      action: (item: ActiveItem | null) => (item && item.id ? createCell(item.id) : createRow()),
    },
    {
      tooltip: 'Add text to the element',
      icon: 'fa-solid fa-font',
      action: (item: ActiveItem | null) => addText(item || null),
    },
    {
      render: () => (
        <Tooltip content="Add image to element">
          <div className={iconStyle} onClick={handleFileClick}>
            <input
              type="file"
              className={classNames('w-full h-full opacity-0 absolute cursor-pointer', {
                hidden: !selectedItem,
              })}
              onChange={handleFileChange}
              accept="image/*"
              multiple={false}
            />
            <i className="fa-regular fa-image"></i>
          </div>
        </Tooltip>
      ),
    },
    {
      render: () => (
        <Tooltip content="Change the color of an item">
          <div className={iconStyle} onClick={handleColorClick}>
            <input
              type="color"
              className={classNames('w-full h-full opacity-0 absolute cursor-pointer', {
                hidden: !selectedItem,
              })}
              onChange={handleColorChange}
            />
            <i className="fa-solid fa-palette"></i>
          </div>
        </Tooltip>
      ),
    },
    {
      tooltip: 'Add button to element',
      icon: 'fa-regular fa-circle-dot',
      action: (item: ActiveItem | null) => addButton(item || null),
    },
    {
      tooltip: 'Expand the gap between elements',
      icon: 'fa-solid fa-expand',
      action: (item: ActiveItem | null) => expandGap(item || null),
    },
    {
      tooltip: 'Compress the gap between elements',
      icon: 'fa-solid fa-compress',
      action: (item: ActiveItem | null) => compressGap(item || null),
    },

    {
      tooltip: 'Delete selected Element',
      icon: 'fa-solid fa-trash',
      action: (item: ActiveItem | null) => deleteRow(item || null),
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
      <div className="absolute top-4 left-1/2 w-12 -translate-x-1/2 select-none">
        <img src={Logo} alt="" />
      </div>

      {buttonsConfig.map((x, idx) =>
        x.render ? (
          <div key={idx}>{x.render()}</div>
        ) : (
          <Tooltip key={idx} content={x.tooltip}>
            <div className={iconStyle} onClick={() => x.action(selectedItem)}>
              <i className={`${x.icon}`}></i>
            </div>
          </Tooltip>
        ),
      )}
    </div>
  );
};

export default Sidebar;
