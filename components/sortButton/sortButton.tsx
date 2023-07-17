import React, { useState } from 'react';
import { BiSolidChevronRight } from 'react-icons/bi';
import SortMenu, { SortOption } from './sortMenu';

/*
Sort buttom on Index
Open the movie categories menu
*/

interface SortButtonProps {
  onClickTopRated?: () => void;
  onClickPopular?: () => void;
  onClickUpcoming?: () => void;
  defaultOption?: string;
}

const SortButton: React.FC<SortButtonProps> = ({
  onClickTopRated = () => { },
  onClickPopular = () => { },
  onClickUpcoming = () => { },
  defaultOption = 'top_rated',
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="font-semibold h-14 text-xl">
        <div className="pt-5">
          {selectedOption === 'top_rated'
            ? 'Top Rated'
            : selectedOption === 'popular'
              ? 'Popular'
              : 'Upcoming'}
        </div>
      </div>
      <div className="border border-gray-200 rounded p-2 flex items-center justify-between shadow-md relative">
        <span className="ml-1 font-semibold text-sm">Sort</span>
        <button onClick={handleMenuToggle} className="focus:outline-none mr-1">
          <BiSolidChevronRight />
        </button>
        {menuOpen && (
          <SortMenu
            isOpen={menuOpen}
            selectedOption={null}
            defaultOption={selectedOption}
            onSelectOption={(option: SortOption) => {
              setSelectedOption(option.value);
              switch (option.value) {
                case 'top_rated':
                  onClickTopRated();
                  break;
                case 'popular':
                  onClickPopular();
                  break;
                case 'upcoming':
                  onClickUpcoming();
                  break;
                default:
                  break;
              }
            }}
            onCloseMenu={() => setMenuOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default SortButton;
