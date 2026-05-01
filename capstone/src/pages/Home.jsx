import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchTrains, setFilterClass, setSortBy } from '../store/trainSlice';
import { useDebounce } from '../hooks/useDebounce';
import { Search, Filter, ArrowRightLeft } from 'lucide-react';
import TrainCard from '../components/TrainCard';

const Home = () => {
  const dispatch = useDispatch();
  const { results, loading, error, filters, sortBy } = useSelector(state => state.trains);
  
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const debouncedSource = useDebounce(source, 500);
  const debouncedDestination = useDebounce(destination, 500);

  useEffect(() => {
    // Only search if at least one field has some value or on initial load
    dispatch(searchTrains({ source: debouncedSource, destination: debouncedDestination, date }));
  }, [debouncedSource, debouncedDestination, date, dispatch]);

  const handleSwap = () => {
    setSource(destination);
    setDestination(source);
  };

  // Client-side filtering and sorting
  const processedResults = [...results]
    .filter(train => {
      if (filters.class !== 'All') {
        return train.classes.includes(filters.class);
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'departureTime') {
        return a.departureTime.localeCompare(b.departureTime);
      } else if (sortBy === 'duration') {
        return a.duration.localeCompare(b.duration);
      }
      return 0; // default
    });

  return (
    <div className="space-y-8">
      <div className="bg-primary p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden border border-accent/20">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-accent opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-accent opacity-10 blur-2xl"></div>
        
        <div className="relative z-10 text-white mb-8">
          <h1 className="text-4xl md:text-6xl font-serif font-medium mb-3 tracking-tight">Experience Royal Travel</h1>
          <p className="text-accent/80 text-lg md:text-xl font-light max-w-2xl italic">Real-time status, smart predictions, and seamless booking for the modern traveler.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl border border-white/20">
          <div className="flex flex-col md:flex-row items-end gap-5">
            <div className="w-full relative">
              <label className="block text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-2">Origin</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Source Station"
                  className="w-full bg-gray-50 border-gray-200 rounded-xl shadow-inner focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 p-4 pl-4 transition-all"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
              </div>
            </div>
            
            <button 
              onClick={handleSwap}
              className="p-4 mb-1 bg-primary text-accent border border-accent/30 shadow-lg rounded-full hover:bg-primary-light hover:scale-110 transition-all mx-auto z-10"
              title="Swap stations"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>

            <div className="w-full relative">
              <label className="block text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-2">Destination</label>
              <input 
                type="text" 
                placeholder="Destination Station"
                className="w-full bg-gray-50 border-gray-200 rounded-xl shadow-inner focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 p-4 pl-4 transition-all"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="w-full md:w-56 relative">
              <label className="block text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-2">Journey Date</label>
              <input 
                type="date" 
                className="w-full bg-gray-50 border-gray-200 rounded-xl shadow-inner focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 p-4 pl-4 transition-all text-gray-700 font-medium"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="flex items-center text-gray-600">
            <Filter className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Class:</span>
          </div>
          <select 
            value={filters.class}
            onChange={(e) => dispatch(setFilterClass(e.target.value))}
            className="border-gray-300 rounded-md text-sm p-2 focus:ring-primary focus:border-primary border"
          >
            <option value="All">All Classes</option>
            <option value="1A">1A</option>
            <option value="2A">2A</option>
            <option value="3A">3A</option>
            <option value="SL">SL</option>
            <option value="CC">CC</option>
            <option value="EC">EC</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600">Sort by:</span>
          <select 
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="border-gray-300 rounded-md text-sm p-2 focus:ring-primary focus:border-primary border"
          >
            <option value="departureTime">Departure Time</option>
            <option value="duration">Duration</option>
          </select>
        </div>
      </div>

      <div>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <Search className="w-10 h-10 text-primary mb-4 opacity-50" />
              <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
            {error}
          </div>
        ) : processedResults.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-accent/10">
            <h3 className="text-2xl font-serif font-medium text-primary">No trains found</h3>
            <p className="text-gray-400 mt-2 font-light italic">Try adjusting your search criteria for a better match</p>
          </div>
        ) : (
          <div className="space-y-4">
            {processedResults.map(train => (
              <TrainCard key={train.trainNo} train={train} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
