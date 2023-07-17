import React, { useEffect, useRef } from 'react';

/*
Movie categories menu
*/

export interface SortOption {
  value: string;
  label: string;
}

interface SortMenuProps {
  isOpen: boolean;
  selectedOption: SortOption | null;
  defaultOption: string; // Adicionando a propriedade defaultOption
  onSelectOption: (option: SortOption) => void;
  onCloseMenu: () => void;
}

const SortMenu: React.FC<SortMenuProps> = ({
  isOpen,
  selectedOption,
  defaultOption, // Recebendo a propriedade defaultOption
  onSelectOption,
  onCloseMenu,
}) => {
  const options: SortOption[] = [
    { value: 'top_rated', label: 'Top Rated' },
    { value: 'popular', label: 'Popular' },
    { value: 'upcoming', label: 'Upcoming' },
  ];

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onCloseMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onCloseMenu]);

  return (
    <div
      ref={menuRef}
      className={`ml-[185px] top-[-9px] z-10 absolute mt-2 py-2 w-36 bg-white border border-gray-300 rounded shadow-md ${isOpen ? '' : 'hidden'
        }`}
    >
      {options.map((option) => (
        <div
          key={option.value}
          className={`px-4 py-2 cursor-pointer ${(selectedOption?.value === option.value || defaultOption === option.value) ? 'bg-gray-300' : 'text-black'
            } hover:bg-sky-300 hover:text-black`}
          onClick={() => {
            onSelectOption(option);
            onCloseMenu();
          }}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default SortMenu;
