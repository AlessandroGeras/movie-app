import React, { useEffect, useState } from 'react';
import SortButton from './sortButton/sortButton';
import WhereButton from './filter sidebar/components/whereButton';
import FilterButton from './filter sidebar/filterMain';
import GetApi from './getApi';

export default function Sidebar() {
  const [selectedSortOption, setSelectedSortOption] = useState<'top_rated' | 'popular' | 'upcoming'>(
    'top_rated'
  );

  const handleSortOptionChange = (sortOption: 'top_rated' | 'popular' | 'upcoming') => {
    setSelectedSortOption(sortOption);
  };

  return (
    <>
      <div className="mb-6">        
        <div className="flex justify-end">
          <div className="w-[264px] h-screen pl-12 mt-2">
            <SortButton
              onClickTopRated={() => handleSortOptionChange('top_rated')}
              onClickPopular={() => handleSortOptionChange('popular')}
              onClickUpcoming={() => handleSortOptionChange('upcoming')}
            />
            <WhereButton />
            <FilterButton />
          </div>
          <div className="ml-8 mr-14 mt-2">
            <GetApi selectedSortOption={selectedSortOption} />
          </div>
        </div>
      </div>
    </>
  );
}
