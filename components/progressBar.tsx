import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { buildStyles } from "react-circular-progressbar";

//Progressbar for movie ratings

interface RatingProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<RatingProgressBarProps> = ({ value }) => {
  const roundedValue = Math.round(value * 10);

  return (
    <div className='w-9 h-9 left-[10px] top-[228px] absolute'>
      <CircularProgressbar
        value={roundedValue}
        text={`${roundedValue}%`}
        background
        backgroundPadding={0}
        styles={buildStyles({
          backgroundColor: "black",
          textColor: "#fff",
          pathColor: "#1eb46b",
          trailColor: "#163526",
        })}
      />
    </div>
  );
};

export default ProgressBar;
