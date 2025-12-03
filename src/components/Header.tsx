'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Transition } from '@headlessui/react';
import { HiOutlineXMark, HiBars3 } from 'react-icons/hi2';
import { FaFingerprint, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';

import Container from './Container';
import { siteDetails } from '@/data/siteDetails';
import { useAuth } from '@/hooks/useAuth';

const Header: React.FC = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user, logout } = useAuth();

    // Don't render header on dashboard pages
    if (pathname?.startsWith('/dashboard')) {
        return null;
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            await logout();
            setIsProfileOpen(false);
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return (
        <header className="bg-transparent fixed top-0 left-0 right-0 md:absolute z-50 mx-auto w-full">
            <Container className="!px-0">
                <nav className="shadow-md md:shadow-none bg-white md:bg-transparent mx-auto flex justify-between items-center py-2 px-5 md:py-10">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <FaFingerprint className="text-foreground min-w-fit w-7 h-7" />
                        <span className="manrope text-xl font-semibold text-foreground cursor-pointer">
                            {siteDetails.siteName}
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-6 items-center">
                        <li>
                            Audits
                        </li>
                        <li>
                            Developers
                        </li>
                        <li>
                            Company
                        </li>
                        {user ? (
                            <li className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary hover:bg-primary-accent transition-colors"
                                >
                                    {user.photoURL ? (
                                        <Image
                                            src={user.photoURL}
                                            alt={user.displayName || 'User'}
                                            width={32}
                                            height={32}
                                            className="w-8 h-8 rounded-full"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                                            {user.displayName?.[0] || user.email?.[0] || 'U'}
                                        </div>
                                    )}
                                    <span className="text-black font-medium">
                                        {user.displayName || 'Account'}
                                    </span>
                                </button>

                                {/* Profile Dropdown */}
                                <Transition
                                    show={isProfileOpen}
                                    enter="transition ease-out duration-100 transform"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="transition ease-in duration-75 transform"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            <FaUser className="text-gray-500" />
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/dashboard/settings"
                                            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            <FaCog className="text-gray-500" />
                                            Settings
                                        </Link>
                                        <hr className="my-2 border-gray-200" />
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                                        >
                                            <FaSignOutAlt />
                                            Logout
                                        </button>
                                    </div>
                                </Transition>
                            </li>
                        ) : (
                            <>

                                <li>
                                    <Link href="/login" className="text-black bg-primary hover:bg-primary-accent px-8 py-3 rounded-full transition-colors">
                                        Get Started
                                    </Link>
                                </li>
                            </>
                        )}
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
            </Container>

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
                            Audits
                        </li>
                        <li>
                            Developers
                        </li>
                        <li>
                            Company
                        </li>
                        {user ? (
                            <>
                                <li>
                                    <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dashboard/settings" className="text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>
                                        Settings
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="text-red-600 hover:text-red-700 transition-colors">
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/login" className="text-black bg-primary hover:bg-primary-accent px-5 py-2 rounded-full block w-fit" onClick={toggleMenu}>
                                        Get Started
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </Transition>
        </header>
    );
};

export default Header;
