import classNames from 'classnames';
import { Row, Selected } from '../types';
import { FC } from 'react';

interface WorkSpaceProps {
  rows: Row[];
  selectedItem: Selected;
  selectItem: (id: number, type: string) => void;
  createCell: (id: number) => void;
}

const WorkSpace: FC<WorkSpaceProps> = ({ rows, selectItem, selectedItem }) => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {rows.length === 0 && (
        <div className="mt-5">
          <p className="text-center text-xl mb- font-semibold text-gray-700 shadow-2xl">
            The workspace is empty, start working by adding an element{' '}
          </p>
          <div className="opacity-60 p-2">
            <h2 className="my-3 text-xl">Example:</h2>
            <div className="flex gap-4 bg-gray-100 p-5 rounded-lg shadow-sm"></div>
            <div className="flex gap-4 bg-gray-100 p-5 rounded-lg shadow-sm">
              <div className="w-1/3 bg-lime-200 p-5 rounded-lg shadow-sm flex items-center justify-center">
                <p className="text-lg font-semibold ">Header</p>
              </div>
              <div className="w-1/3  p-5 rounded-lg shadow-sm bg-indigo-200 flex items-center justify-center">
                <p className="text-lg font-semibold ">Body</p>
              </div>
              <div className="w-1/3  p-5 rounded-lg shadow-sm bg-purple-200 flex items-center justify-center">
                <p className="text-lg font-semibold ">Footer</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {rows.map((row) => (
        <div
          className={classNames(
            'p-5',
            'rounded-lg',
            'shadow-sm',
            'border-4',
            'border-transparent',
            'cursor-pointer',
            'grid',
          )}
          style={{
            borderColor: `${selectedItem?.id === row.id ? '#232D3F' : ''}`,
            gridTemplateColumns: `repeat(${row.cells.length <= 12 ? row.cells.length : 12}, 1fr)`,
            background: `${row.color}`,
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
                    borderColor: `${selectedItem?.id === cell.id ? '#CE5A67' : ''}`,
                    opacity: `${selectedItem?.id === cell.id ? '0.9' : ''}`,
                    background: `${cell.color}`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectItem(cell.id, 'cell');
                  }}>
                  {cell.content && cell.content.type === 'button' && (
                    <button className="font-extrabold py-4 px-6 shadow-2xl rounded active:opacity-70">
                      button {cell.name}
                    </button>
                  )}
                  {cell.content && cell.content.type === 'text' && (
                    <p className="font-extrabold py-4 px-6 rounded">{cell.content.value}</p>
                  )}
                  {cell.content && cell.content.type === 'image' && (
                    <img
                      className="w-48 block mx-auto max-h-36"
                      src={cell.content.src}
                      alt="image"
                    />
                  )}
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
