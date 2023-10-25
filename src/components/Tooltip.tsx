import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className="relative inline-block h-10">
      {children}
      {show && (
        <div className="absolute bottom-full translate-x-[-5%] py-2 px-3 bg-[#333] text-white rounded text-xs z-10 mb-1 whitespace-nowrap">
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
