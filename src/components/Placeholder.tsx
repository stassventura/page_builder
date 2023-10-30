const Placeholder = () => {
  return (
    <div className="mt-5">
      <p className="text-center text-xl mb- font-semibold text-gray-700 shadow-2xl">
        The workspace is empty, start working by adding an element{' '}
      </p>
      <div className="opacity-60 p-2">
        <h2 className="my-3 text-xl">Example:</h2>
        <div className="flex flex-col gap-4 bg-gray-100 p-5 rounded-lg shadow-sm">
          <div className=" bg-lime-200 p-5 rounded-lg shadow-sm flex items-center justify-center">
            <p className="text-lg font-semibold ">Header</p>
          </div>
          <div className="  p-5 rounded-lg shadow-sm bg-indigo-200 flex items-center justify-center">
            <p className="text-lg font-semibold ">Body</p>
          </div>
          <div className="  p-5 rounded-lg shadow-sm bg-purple-200 flex items-center justify-center">
            <p className="text-lg font-semibold ">Footer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placeholder;
