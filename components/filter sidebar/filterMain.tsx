import React from 'react';
import { BiSolidChevronDown } from 'react-icons/bi';
import ShowMe from './components/showme';
import Availabilities from './components/availabilities';
import ReleaseDates from './components/releaseDates';
import Genres from './components/genres';

/*
Main component of the filter panel
*/

interface FilterButtonProps {
  onClick?: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onClick = () => { } }) => {
  const handleShowMeChange = (value: string) => {
    console.log(value);
  };

  return (
    <>
      <div className='shadow-md rounded border-t-0'>
        <div className="rounded-b-none border border-b-0 border-gray-200 rounded p-2 mt-3 flex items-center justify-between">
          <span className="ml-1 font-semibold text-sm">Filters</span>
          <button onClick={onClick} className="focus:outline-none mr-1">
            <BiSolidChevronDown />
          </button>
        </div>
        <ShowMe onChange={handleShowMeChange} />
        <Availabilities />
        <ReleaseDates />
        <Genres />
      </div>
    </>
  );
};

export default FilterButton;
