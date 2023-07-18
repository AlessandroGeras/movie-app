import React from 'react';
import { MdAdd } from 'react-icons/md';
import { BiSearchAlt2 } from 'react-icons/bi';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800">
            <div className="flex items-center justify-between px-4 py-4 mx-8">
                {/* Left List */}
                <ul className="flex space-x-4 h-8">
                    <li className="flex items-center justify-center">
                        <img src="./tmdb.svg" alt="Logo" className="h-4" />
                    </li>
                    {['Movies', 'TV Shows', 'People', 'More'].map((text, index) => (
                        <NavItem key={index}>{text}</NavItem>
                    ))}
                </ul>

                {/* Right List */}
                <ul className="flex space-x-4 h-8">
                    <div className='flex items-center justify-between'><MdAdd size={24} color="white" /></div>
                    <NavItem rounded>
                        <p className="text-center border border-white text-[10px] px-1 flex items-center justify-between mt-[1.65px]">EN</p>
                    </NavItem>
                    <NavItem>Login</NavItem>
                    <NavItem>Join TMDB</NavItem>
                    <div className='flex items-center justify-between'><BiSearchAlt2 size={24} color="#01a6d4" style={{ padding: '2px 0 0 0' }} /></div>
                </ul>
            </div>
        </nav>
    );
};

interface NavItemProps {
    children: React.ReactNode;
    rounded?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ children, rounded }) => {
    const roundedClass = rounded ? 'rounded' : '';
    return <li className={`text-white text-sm px-0.5 pb-0.5 flex items-center justify-center ${roundedClass}`}>{children}</li>;
};

export default Navbar;
