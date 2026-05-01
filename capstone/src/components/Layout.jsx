import React, { Suspense } from 'react';
import Navbar from './Navbar';
import ErrorBoundary from '../utils/ErrorBoundary';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-royal-cream">
      <Navbar />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ErrorBoundary>
          <Suspense fallback={
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent"></div>
            </div>
          }>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <footer className="bg-white border-t border-accent/10 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-serif text-lg font-semibold text-primary mb-2">RailSync India</p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-6">Experience Royal Excellence</p>
          <div className="h-px bg-accent/20 w-16 mx-auto mb-6"></div>
          <p className="text-xs text-gray-400 font-light italic">
            &copy; {new Date().getFullYear()} RailSync Royal Edition. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
