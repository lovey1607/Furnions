'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  cartItemCount?: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle scroll effect for parallax
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'About Us', href: '/about' },
    { label: 'Why Furnions', href: '/why-furnions' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo with wood texture treatment */}
            <Link href="/" className="flex items-center group">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-2xl lg:text-3xl font-bold text-primary font-serif">
                  Furnions
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200/10 to-transparent rounded-lg mix-blend-overlay" />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <Link
                    href={item.href}
                    className="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <motion.button
                className="p-2 text-foreground/80 hover:text-primary transition-colors relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open search"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </motion.button>

              {/* Cart Icon with Badge */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/cart"
                  className="p-2 text-foreground/80 hover:text-primary transition-colors"
                  aria-label={`Cart with ${cartItemCount} items`}
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                </Link>
                {cartItemCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </motion.span>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Wood texture overlay for parallax effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-amber-900/5 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled ? 0 : 1 }}
          transition={{ duration: 0.6 }}
        />
      </motion.header>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsSearchOpen(false)}
            />
            
            {/* Search Modal */}
            <motion.div
              className="relative w-full max-w-2xl bg-background rounded-lg shadow-2xl border border-border overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <MagnifyingGlassIcon className="h-6 w-6 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search our furniture collection..."
                    className="flex-1 bg-transparent text-lg placeholder-muted-foreground focus:outline-none"
                    autoFocus
                  />
                  <kbd className="px-2 py-1 text-xs font-mono bg-muted text-muted-foreground rounded">
                    ESC
                  </kbd>
                </div>
                
                {/* Search Results Placeholder */}
                <div className="mt-6 text-sm text-muted-foreground">
                  Search functionality coming soon. Try: "sofa", "table", "chair"
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;