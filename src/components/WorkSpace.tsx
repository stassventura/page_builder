import { Row, ActiveItem, ActiveItemType } from '../types';
import { FC } from 'react';
import Placeholder from './Placeholder';

interface WorkSpaceProps {
  rows: Row[];
  selectedItem: ActiveItem;
  selectItem: (id: number, type: ActiveItemType) => void;
  createCell: (id: number) => void;
}

const WorkSpace: FC<WorkSpaceProps> = ({ rows, selectItem, selectedItem }) => {
  if (rows.length === 0) {
    return <Placeholder />;
  }
  return (
    <div className="flex flex-col gap-4 mt-4">
      {rows.map((row) => (
        <div
          className={'p-5 rounded-lg shadow-sm border-4 border-transparent cursor-pointer grid'}
          style={{
            borderColor: selectedItem?.id === row.id ? '#232D3F' : '',
            gridTemplateColumns: `repeat(${row.cells.length <= 12 ? row.cells.length : 12}, 1fr)`,
            background: row.color,
            gap: `${row.gap}px`,
          }}
          onClick={() => selectItem(row.id, 'row')}
          key={row.id}>
          {row.cells.length === 0 ? (
            <p className="mb-2 text-lg font-medium text-center text-white w-full">
              The row is empty
            </p>
          ) : (
            <>
              {row.cells.map((cell) => (
                <div
                  key={cell.id}
                  className={`flex-1  text-white text-center border-2 border-transparent p-5 rounded flex items-center justify-center`}
                  style={{
                    borderColor: selectedItem?.id === cell.id ? '#CE5A67' : '',
                    opacity: selectedItem?.id === cell.id ? '0.9' : '',
                    background: cell.color,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectItem(cell.id, 'cell');
                  }}>
                  {cell?.content?.type === 'button' ? (
                    <button className="font-extrabold py-4 px-6 shadow-2xl rounded active:opacity-70">
                      button {cell.name}
                    </button>
                  ) : cell?.content?.type === 'text' ? (
                    <p className="font-extrabold py-4 px-6 rounded">{cell.content.value}</p>
                  ) : cell?.content?.type === 'image' ? (
                    <img
                      className="w-48 block mx-auto max-h-36"
                      src={cell.content.src}
                      alt="image"
                    />
                  ) : null}
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default WorkSpace;
