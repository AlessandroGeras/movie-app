import React from 'react';
import { BiSolidChevronRight } from 'react-icons/bi';

/*
Genres buttom on Sidebar
Does nothing, just decorative
*/

interface SortButtonProps {
  onClick?: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({ onClick = () => { } }) => {
  return (
    <div className="border border-gray-200 rounded p-2 mt-3 flex items-center justify-between shadow-md">
      <span className="ml-1 text-sm font-semibold">Where To Watch</span>
      <div className="flex items-center">
        <span className="text-sm mr-1 bg-gray-200 px-2 rounded-xl flex">20</span>
        <button onClick={onClick} className="focus:outline-none mr-1">
          <BiSolidChevronRight />
        </button>
      </div>
    </div>
  );
};

export default SortButton;
