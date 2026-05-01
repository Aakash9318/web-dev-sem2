import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Clock, Navigation, BookmarkPlus, BookmarkMinus, ArrowRightLeft } from 'lucide-react';
import { addToWatchlist, removeFromWatchlist } from '../store/watchlistSlice';
import LiveStatusBadge from './LiveStatusBadge';

const TrainCard = ({ train }) => {
  const dispatch = useDispatch();
  const watchlist = useSelector(state => state.watchlist.items);
  const isWatchlisted = watchlist.some(t => t.trainNo === train.trainNo);

  const handleWatchlistToggle = (e) => {
    e.preventDefault();
    if (isWatchlisted) {
      dispatch(removeFromWatchlist(train.trainNo));
    } else {
      dispatch(addToWatchlist(train));
    }
  };

  return (
    <Link to={`/train/${train.trainNo}`} className="block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h2 className="text-2xl font-serif font-semibold text-primary tracking-tight">{train.trainName}</h2>
              <span className="bg-accent/10 text-accent-dark text-[10px] font-bold px-2 py-0.5 rounded border border-accent/20 tracking-widest uppercase">#{train.trainNo}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm font-light text-gray-400">
              <span className="flex items-center bg-gray-50/50 px-3 py-1 rounded-full border border-gray-100"><Navigation className="w-3.5 h-3.5 mr-2 text-accent" /> {train.source} <ArrowRightLeft className="w-3 h-3 mx-2 text-accent/30"/> {train.destination}</span>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-3">
            <LiveStatusBadge status={train.status} />
            <button 
              onClick={handleWatchlistToggle}
              className={`p-2.5 rounded-full transition-all duration-300 ${isWatchlisted ? 'bg-accent/20 text-accent-dark hover:bg-accent/30 shadow-inner border border-accent/30' : 'bg-gray-50 text-gray-300 hover:bg-white hover:text-accent hover:shadow-md border border-gray-100'}`}
              title={isWatchlisted ? "Remove from watchlist" : "Add to watchlist"}
            >
              {isWatchlisted ? <BookmarkMinus className="w-5 h-5" /> : <BookmarkPlus className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between py-6 border-t border-b border-gray-50 mb-6 bg-royal-cream rounded-xl px-6">
          <div className="text-center w-1/4">
            <p className="text-3xl font-serif font-medium text-primary tracking-tight">{train.departureTime}</p>
            <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mt-1">Departure</p>
          </div>
          <div className="flex-1 px-4 flex items-center justify-center relative">
            <div className="h-[1px] bg-accent/20 w-full absolute"></div>
            <div className="bg-white border border-accent/20 px-4 py-1 rounded-full z-10 flex items-center text-primary text-[10px] font-semibold shadow-sm uppercase tracking-widest">
              <Clock className="w-3 h-3 mr-1.5 text-accent" />
              {train.duration}
            </div>
          </div>
          <div className="text-center w-1/4">
            <p className="text-3xl font-serif font-medium text-primary tracking-tight">{train.arrivalTime}</p>
            <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mt-1">Arrival</p>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-y-4">
          <div className="flex items-center space-x-2">
            {train.classes.map(c => (
              <span key={c} className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold rounded border border-primary/10 tracking-wider">
                {c}
              </span>
            ))}
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Starts From</p>
            <span className="text-2xl font-serif font-semibold text-accent-dark">
              ₹{Math.min(...Object.values(train.price))}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TrainCard;
