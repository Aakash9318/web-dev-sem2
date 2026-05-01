import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Train, User, Home, Activity } from 'lucide-react';
import clsx from 'clsx';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: Activity },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-primary p-2 rounded-xl shadow-lg border border-accent/20 group-hover:shadow-accent/20 transition-all duration-300 transform group-hover:-translate-y-0.5">
                <Train className="h-6 w-6 text-accent" />
              </div>
              <span className="font-serif font-semibold text-2xl tracking-tight text-primary">
                RailSync <span className="text-accent italic font-light ml-0.5 text-lg">Royal</span>
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={clsx(
                      'px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-[0.1em] flex items-center space-x-2 transition-all duration-300',
                      isActive 
                        ? 'bg-primary text-accent shadow-lg shadow-primary/20' 
                        : 'text-gray-500 hover:bg-royal-cream hover:text-primary border border-transparent hover:border-accent/10'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
