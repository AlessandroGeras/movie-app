import React from 'react';

/*
Genres buttom on Sidebar
Does nothing, just decorative
*/

interface GenreLabelProps {
  children: React.ReactNode;
}

const Genres: React.FC = () => {
  return (
    <div className="rounded-b pb-4 border-t-0 border border-gray-200 p-2 flex flex-col items-start justify-start text-gray-500 text-sm">
      <p className="ml-1 mb-2">Genres</p>
      <div className="ml-1 flex">
        <GenreLabel>Action</GenreLabel>
        <GenreLabel>Adventure</GenreLabel>
      </div>
      <div className="ml-1 flex mt-2">
        <GenreLabel>Animation</GenreLabel>
        <GenreLabel>Comedy</GenreLabel>
      </div>
    </div>
  );
};

const GenreLabel: React.FC<GenreLabelProps> = ({ children }) => {
  return (
    <label className="rounded-xl border border-gray-600 px-2 mr-2">
      <span className="inline-block font-semibold text-gray-600 text-sm">{children}</span>
    </label>
  );
};

export default Genres;
