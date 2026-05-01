import React from 'react';
import { useSelector } from 'react-redux';
import { Bookmark, User } from 'lucide-react';
import TrainCard from '../components/TrainCard';

const Profile = () => {
  const watchlist = useSelector(state => state.watchlist.items);

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center text-center md:text-left space-y-6 md:space-y-0 md:space-x-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl"></div>
        
        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-gray-400 shadow-inner border border-white">
          <User className="w-12 h-12" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">User Profile</h1>
          <p className="text-gray-500 font-medium mt-2 max-w-md">Manage your watchlisted trains, view recent searches, and update preferences.</p>
        </div>
      </div>

      <div>
        <div className="flex items-center mb-8">
          <div className="p-2 bg-primary/10 rounded-lg mr-3">
            <Bookmark className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">Your Watchlist</h2>
        </div>

        {watchlist.length === 0 ? (
          <div className="bg-white p-16 rounded-3xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Bookmark className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Watchlist is empty</h3>
            <p className="text-gray-500 mt-2 font-medium max-w-sm">Trains you add to your watchlist will appear here for quick access to their live status.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {watchlist.map(train => (
              <TrainCard key={train.trainNo} train={train} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
