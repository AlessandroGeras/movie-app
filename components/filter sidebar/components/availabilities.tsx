import React, { useState } from 'react';

/*
Availabilities buttom on Sidebar
Does nothing, just decorative
*/

interface AvailabilitiesProps {
  onChange?: () => void;
}

const Availabilities: React.FC<AvailabilitiesProps> = ({ onChange }) => {
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange();
    }
  };

  return (
    <div className="border border-gray-200 p-2 flex flex-col items-start justify-start text-gray-500 text-sm">
      <p className="ml-1 mb-2">Availabilities</p>
      <div className="ml-1 flex items-center">
        <input
          className="accent-sky-600"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label className="ml-1">
          <span className={`inline-block ${isChecked ? 'font-semibold text-gray-500' : ''}`}>
            Search All Availabilities?
          </span>
        </label>
      </div>
    </div>
  );
};

export default Availabilities;
