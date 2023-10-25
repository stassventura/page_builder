import { Data } from '../types';
import classNames from 'classnames';

interface WorkSpaceProps {
  data: Data[];
  selectedItemId: number | null;
  selectItem: (id: number) => void;
  createCall: (id: number) => void;
}

const WorkSpace: React.FC<WorkSpaceProps> = ({ data, selectItem, selectedItemId }) => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {data.length === 0 && (
        <div className="mt-5 ">
          <p className="text-center text-xl mb-6 font-semibold text-gray-700">
            The workspace is empty, start working by adding an element{' '}
          </p>
          <div className="opacity-60 bg-slate-50 p-2">
            <h2 className="my-5 text-xl">Example:</h2>
            <div className="flex gap-4 bg-gray-100 p-5 rounded-lg shadow-sm">
              <div
                className="flex-1  p-5 rounded-lg shadow-sm"
                style={{
                  backgroundImage:
                    "url('https://wallpapers.com/images/hd/rick-and-morty-fighting-green-aliens-zp6odvm0462ff5c2.jpg')",
                  backgroundPosition: 'center',
                }}>
                <p className="mb-2 text-xl font-bold text-white opacity-0">Header</p>
                <p className="text-gray-600 opacity-0">Lorem ipsum placeholder text.</p>
              </div>
            </div>
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
            'bg-gray-100',
            'p-5',
            'rounded-lg',
            'shadow-sm',
            'border-2',
            'border-transparent',
            'cursor-pointer',
            'grid',
            'gap-1',
          )}
          style={{
            borderColor: `${selectedItemId === row.id ? '#CE5A67' : ''}`,
            gridTemplateColumns: `repeat(${row.grid <= 12 ? row.grid : 12}, 1fr)`,
          }}
          onClick={() => selectItem(row.id)}
          key={row.id}>
          {row.cells.length === 0 ? (
            <p className="mb-2 text-lg font-medium text-center text-gray-400 w-full">
              The row is empty
            </p>
          ) : (
            <>
              {row.cells.map((call) => (
                <div
                  key={call.id}
                  className={`flex-1 bg-red-300 text-center border-2 border-transparent`}>
                  {call.name}
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
