import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Clock, MapPin, Info, Users, CreditCard } from 'lucide-react';
import { mockTrains, mockSeatAvailability } from '../services/mockData';
import { fetchLiveStatus } from '../services/api';
import { updateLiveStatus } from '../store/trainSlice';
import LiveStatusBadge from '../components/LiveStatusBadge';

const TrainDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const [train, setTrain] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // In a real app, we would fetch details from the API.
    const foundTrain = mockTrains.find(t => t.trainNo === id);
    setTrain(foundTrain);
    setAvailability(mockSeatAvailability[id] || mockSeatAvailability["12951"]);
  }, [id]);

  const handleRefreshStatus = async () => {
    if (!train) return;
    setIsRefreshing(true);
    try {
      const response = await fetchLiveStatus(train.trainNo);
      setTrain({ ...train, status: response.status });
      dispatch(updateLiveStatus({ trainNo: train.trainNo, status: response.status }));
    } catch (error) {
      console.error("Failed to refresh status", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  if (!train) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link to="/" className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm text-primary hover:text-white hover:bg-primary transition-all duration-300 font-semibold text-sm border border-gray-100 hover:border-primary">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Search
      </Link>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden transform transition-all">
        <div className="bg-gradient-to-r from-primary-dark via-primary to-blue-400 p-8 md:p-10 text-white flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="relative z-10 mb-6 md:mb-0">
            <h1 className="text-4xl font-extrabold mb-2 tracking-tight">{train.trainName}</h1>
            <p className="text-primary-100 font-medium flex items-center">
              Train Number: <span className="font-mono ml-3 bg-white/20 px-3 py-1 rounded-lg font-bold text-white shadow-sm backdrop-blur-md border border-white/10">{train.trainNo}</span>
            </p>
          </div>
          <div className="relative z-10 bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg w-full md:w-auto">
            <p className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-3">Live Status</p>
            <LiveStatusBadge 
              status={train.status} 
              onRefresh={handleRefreshStatus} 
              isRefreshing={isRefreshing} 
            />
          </div>
        </div>

        <div className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row justify-between relative mb-16 bg-gray-50/50 p-6 md:p-10 rounded-3xl border border-gray-100">
            <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 relative">
              <div className="w-16 h-16 bg-white text-primary rounded-2xl flex items-center justify-center mb-4 shadow-md border border-gray-100 transform -rotate-3">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">{train.source}</h3>
              <p className="text-3xl text-primary font-extrabold mt-2 tracking-tight">{train.departureTime}</p>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mt-2">Day 1</p>
            </div>

            <div className="hidden md:flex flex-1 items-center justify-center absolute left-0 right-0 top-1/2 bottom-0 z-0 px-32 -translate-y-6">
              <div className="w-full h-1 bg-gray-200 relative rounded-full">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-5 py-2 text-gray-500 flex items-center shadow-md border border-gray-100 rounded-full text-sm font-bold tracking-wide">
                  <Clock className="w-4 h-4 mr-2 text-primary" />
                  {train.duration}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end text-center md:text-right mt-10 md:mt-0 z-10 relative">
              <div className="w-16 h-16 bg-white text-secondary rounded-2xl flex items-center justify-center mb-4 shadow-md border border-gray-100 transform rotate-3">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">{train.destination}</h3>
              <p className="text-3xl text-secondary font-extrabold mt-2 tracking-tight">{train.arrivalTime}</p>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mt-2">Day 2</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center tracking-tight">
                <div className="p-2 bg-primary/10 text-primary rounded-lg mr-3">
                  <Users className="w-6 h-6" />
                </div>
                Classes & Fares
              </h4>
              <div className="space-y-4">
                {Object.entries(train.price).map(([cls, price]) => (
                  <div key={cls} className="flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl border border-gray-100">
                    <span className="font-bold text-gray-700 text-lg">{cls} Class</span>
                    <span className="text-green-600 font-black text-xl">₹{price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center tracking-tight">
                <div className="p-2 bg-secondary/10 text-secondary rounded-lg mr-3">
                  <Info className="w-6 h-6" />
                </div>
                Schedule Info
              </h4>
              <div className="space-y-5 text-sm">
                <div className="flex justify-between pb-4 border-b border-gray-100">
                  <span className="text-gray-500 font-bold uppercase tracking-wider">Runs On</span>
                  <span className="font-extrabold text-gray-900">{train.days.join(', ')}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-gray-100">
                  <span className="text-gray-500 font-bold uppercase tracking-wider">Pantry Car</span>
                  <span className="font-extrabold text-green-600 bg-green-50 px-2 py-1 rounded-md">Available</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold uppercase tracking-wider">Distance</span>
                  <span className="font-extrabold text-gray-900">1,384 km</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainDetails;
