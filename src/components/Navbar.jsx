'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();
    const router = useRouter();

    // Navigation links - easy to modify and extend
    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Clubs', href: '/clubs' },
        { name: 'Events', href: '/events' },
        { name: 'Community', href: '/community' },
    ];

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-black/80 backdrop-blur-md shadow-lg py-2' 
                    : 'bg-transparent py-4'
            }`}
        >
            <div className="container px-4 mx-auto">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative w-8 h-8 overflow-hidden">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                            <div className="absolute flex items-center justify-center font-bold text-white bg-black rounded-full inset-1">
                                S
                            </div>
                        </div>
                        <span className="text-xl font-bold text-white">StudentHub</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="items-center hidden gap-8 md:flex">
                        <ul className="flex gap-6">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link 
                                        href={link.href}
                                        className={`relative text-sm font-medium transition-colors ${
                                            pathname === link.href 
                                                ? 'text-white' 
                                                : 'text-gray-300 hover:text-white'
                                        }`}
                                    >
                                        {link.name}
                                        {pathname === link.href && (
                                            <motion.div 
                                                layoutId="navbar-indicator"
                                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400" 
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Auth Buttons */}
                        {session ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    {session.user?.image ? (
                                        <Image 
                                            src={session.user.image} 
                                            alt={session.user.name || 'User'} 
                                            width={32} 
                                            height={32} 
                                            className="rounded-full"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-8 h-8 font-medium text-white rounded-full bg-gradient-to-r from-blue-400 to-purple-400">
                                            {session.user?.name?.charAt(0) || 'U'}
                                        </div>
                                    )}
                                    <span className="text-sm text-white">{session.user?.name}</span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => signOut()}
                                    className="px-4 py-2 text-sm font-medium text-white transition-all duration-300 border border-white/20 rounded-xl hover:bg-white/10"
                                >
                                    Sign Out
                                </motion.button>
                                <Link href="/console/events">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-lg"
                                    >
                                        Go to Console
                                    </motion.button>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href="/sign-in">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-2 text-sm font-medium text-white transition-all duration-300 border border-white/20 rounded-xl hover:bg-white/10"
                                    >
                                        Sign In
                                    </motion.button>
                                </Link>
                                <Link href="/sign-up">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-lg hover:shadow-blue-500/20"
                                    >
                                        Sign Up
                                    </motion.button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="flex items-center justify-center p-2 text-white md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="relative w-6 h-5">
                            <span 
                                className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                                    isOpen ? 'rotate-45 top-2' : 'top-0'
                                }`}
                            />
                            <span 
                                className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                                    isOpen ? 'opacity-0' : 'opacity-100 top-2'
                                }`}
                            />
                            <span 
                                className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                                    isOpen ? '-rotate-45 top-2' : 'top-4'
                                }`}
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t md:hidden bg-black/90 backdrop-blur-lg border-white/10"
                    >
                        <div className="container px-4 py-4 mx-auto">
                            <ul className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link 
                                            href={link.href}
                                            className={`block p-2 text-sm font-medium transition-colors ${
                                                pathname === link.href 
                                                    ? 'text-white bg-white/10 rounded-lg' 
                                                    : 'text-gray-300 hover:text-white'
                                            }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            
                            {/* Mobile Auth Buttons */}
                            <div className="mt-6 space-y-3">
                                {session ? (
                                    <>
                                        <div className="flex items-center gap-3 p-2">
                                            {session.user?.image ? (
                                                <Image 
                                                    src={session.user.image} 
                                                    alt={session.user.name || 'User'} 
                                                    width={40} 
                                                    height={40} 
                                                    className="rounded-full"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center w-10 h-10 font-medium text-white rounded-full bg-gradient-to-r from-blue-400 to-purple-400">
                                                    {session.user?.name?.charAt(0) || 'U'}
                                                </div>
                                            )}
                                            <div>
                                                <span className="block text-sm font-medium text-white">{session.user?.name}</span>
                                                <span className="block text-xs text-gray-400">{session.user?.email}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => signOut()}
                                            className="w-full px-4 py-3 text-sm font-medium text-white transition-all duration-300 border border-white/20 rounded-xl hover:bg-white/10"
                                        >
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/sign-in" className="block w-full">
                                            <button className="w-full px-4 py-3 text-sm font-medium text-white transition-all duration-300 border border-white/20 rounded-xl hover:bg-white/10">
                                                Sign In
                                            </button>
                                        </Link>
                                        <Link href="/sign-up" className="block w-full">
                                            <button className="w-full px-4 py-3 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-lg">
                                                Sign Up
                                            </button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;