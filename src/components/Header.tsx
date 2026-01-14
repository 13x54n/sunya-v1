'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { HiOutlineXMark, HiBars3 } from 'react-icons/hi2';

import { siteDetails } from '@/data/siteDetails';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-transparent fixed top-0 left-0 right-0 md:absolute z-50 mx-auto w-full">
            <nav className="shadow-md md:shadow-none bg-white mx-auto flex justify-between items-center px-5 md:px-40 py-5 border-b border-gray-200">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <h1 className=" text-xl text-foreground cursor-pointer">
                        {siteDetails.siteName}.
                    </h1>
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6 items-center">
                    <li>
                        <Link href="/audits">
                            Audits
                        </Link>
                    </li>
                    <li>
                        <Link href="/developers">
                            Developers
                        </Link>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="bg-primary text-black focus:outline-none rounded-full w-10 h-10 flex items-center justify-center"
                        aria-controls="mobile-menu"
                        aria-expanded={isOpen}
                    >
                        {isOpen ? (
                            <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
                        ) : (
                            <HiBars3 className="h-6 w-6" aria-hidden="true" />
                        )}
                        <span className="sr-only">Toggle navigation</span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu with Transition */}
            <Transition
                show={isOpen}
                enter="transition ease-out duration-200 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div id="mobile-menu" className="md:hidden bg-white shadow-lg">
                    <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6">
                        <li>
                            <Link href="/audits" className="text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>
                                Audits
                            </Link>
                        </li>
                        <li>
                            <Link href="/developers" className="text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>
                                Developers
                            </Link>
                        </li>
                    </ul>
                </div>
            </Transition>
        </header>
    );
};

export default Header;
