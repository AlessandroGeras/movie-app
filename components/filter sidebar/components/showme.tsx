import React, { useState } from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';

/*
Release dates buttons on Sidebar
Just for imitation purposes for the Assignment, the form starts
with an invisible field and after being clicked, it gains color.
*/

interface ShowMeProps {
  onChange: (value: string) => void;
}

const ShowMe: React.FC<ShowMeProps> = ({ onChange }) => {
  const [selectedValue, setSelectedValue] = useState('Everything');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <>
      <div className="border border-gray-200 p-2 flex flex-col items-start justify-start text-gray-500 text-sm">
        <div className="flex items-center mb-2">
          <span className="ml-1 mr-2">Show Me</span>
          <AiFillQuestionCircle color="#b0b0b0" />
        </div>
        <div className="ml-1">
          {['Everything', 'Movies I Haven´t Seen', 'Movies I Have Seen'].map(value => (
            <label key={value} className={`block ${selectedValue === value ? 'font-semibold text-gray-500' : ''}`}>
              <input
                className="accent-sky-600"
                type="radio"
                name="showMe"
                value={value}
                checked={selectedValue === value}
                onChange={handleRadioChange}
              />
              <span className={`ml-0.5 checkmark ${selectedValue === value ? 'checked' : ''}`} />
              {value}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowMe;
