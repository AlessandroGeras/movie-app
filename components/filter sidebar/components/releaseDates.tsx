import React, { useState } from 'react';

/*
Release dates buttons on Sidebar
Just for imitation purposes for the Assignment, the form starts
with an invisible field and after being clicked, it gains color.
*/

interface ReleaseDatesProps {
  onChange?: () => void;
}

const ReleaseDates: React.FC<ReleaseDatesProps> = ({ onChange }) => {
  const [isChecked, setIsChecked] = useState(true);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [isDateClicked, setIsDateClicked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange();
    }
  };

  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(event.target.value);
  };

  const handleDateClick = () => {
    setIsDateClicked(true);
  };

  return (
    <div className="border border-gray-200 p-2 flex flex-col items-start justify-start text-sm">
      <p className="ml-1 mb-2 text-gray-500">Release Dates</p>
      <div className="ml-1 flex items-center">
        <input
          className="accent-sky-600"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label className="ml-1">
          <span className={`text-gray-500 inline-block ${isChecked ? 'font-semibold text-gray-500' : ''}`}>
            Search All Releases?
          </span>
        </label>
      </div>

      <div className="flex items-center mt-2 flow-root w-full">
        <label htmlFor="fromDate" className="text-gray-500 ml-1 float-left">
          From
        </label>
        <input
          className={`text-white ml-1 border-[1.5px] border-gray-200 rounded object-none float-right mt-[-2px] ${isDateClicked ? 'text-stone-600' : ''
            }`}
          type="date"
          id="fromDate"
          value={fromDate}
          onClick={handleDateClick}
          onChange={handleFromDateChange}
        />
      </div>

      <div className="flex items-center mt-2 flow-root w-full">
        <label htmlFor="toDate" className="text-gray-500 ml-1 float-left">
          To
        </label>
        <input
          className="ml-1 border-[1.5px] border-gray-200 rounded float-right mt-[-2px] text-stone-600"
          type="date"
          id="toDate"
          value={toDate}
          onChange={handleToDateChange}
        />
      </div>
    </div>
  );
};

export default ReleaseDates;
