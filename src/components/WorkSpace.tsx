import { Data, Selected } from '../types';
import classNames from 'classnames';

interface WorkSpaceProps {
  data: Data[];
  selectedItem: Selected;
  selectItem: (id: number, type: string) => void;
  createCall: (id: number) => void;
}

const WorkSpace: React.FC<WorkSpaceProps> = ({ data, selectItem, selectedItem }) => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {data.length === 0 && (
        <div className="mt-5">
          <p className="text-center text-xl mb- font-semibold text-gray-700 shadow-2xl">
            The workspace is empty, start working by adding an element{' '}
          </p>
          <div className="opacity-60 p-2">
            <h2 className="my-3 text-xl">Example:</h2>
            <div className="flex gap-4 bg-gray-100 p-5 rounded-lg shadow-sm"></div>
            <div className="flex gap-4 bg-gray-100 p-5 rounded-lg shadow-sm">
              <div className="w-1/3 bg-lime-200 p-5 rounded-lg shadow-sm">
                <p className="mb-2 text-lg font-semibold">Header</p>
                <p className="text-gray-600">Lorem ipsum placeholder text.</p>
              </div>
              <div className="w-1/3  p-5 rounded-lg shadow-sm bg-indigo-200">
                <p className="mb-2 text-lg font-semibold">Body</p>
                <p className="text-gray-600">Lorem ipsum placeholder text.</p>
              </div>
              <div className="w-1/3  p-5 rounded-lg shadow-sm bg-purple-200">
                <p className="mb-2 text-lg font-semibold">Footer</p>
                <p className="text-gray-600">Lorem ipsum placeholder text.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {data.map((row) => (
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
              {row.cells.map((call) => (
                <div
                  key={call.id}
                  className={`flex-1  text-white text-center border-2 border-transparent p-5 rounded`}
                  style={{
                    borderColor: `${selectedItem?.id === call.id ? '#CE5A67' : ''}`,
                    opacity: `${selectedItem?.id === call.id ? '0.9' : ''}`,
                    background: `${call.color}`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectItem(call.id, 'call');
                  }}>
                  {call.content && call.content.type === 'button' && (
                    <button className="font-extrabold py-4 px-6 shadow-2xl rounded active:opacity-70">
                      button {call.name}
                    </button>
                  )}
                  {call.content && call.content.type === 'text' && (
                    <p className="font-extrabold py-4 px-6 rounded">{call.content.value}</p>
                  )}
                  {call.content && call.content.type === 'image' && (
                    <img className="w-48 block mx-auto" src={call.content.src} alt="image" />
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
