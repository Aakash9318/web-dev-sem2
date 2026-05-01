import { mockTrains, mockSeatAvailability, stationsList } from './mockData';

const DELAY = 800; // Simulate network latency

export const fetchTrains = async (source, destination, date) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // In a real app, this would be an axios.get() call to RapidAPI.
      let results = [...mockTrains];
      
      if (source) {
        results = results.filter(t => t.source.toLowerCase().includes(source.toLowerCase()));
      }
      if (destination) {
        results = results.filter(t => t.destination.toLowerCase().includes(destination.toLowerCase()));
      }
      
      resolve(results);
    }, DELAY);
  });
};

export const fetchLiveStatus = async (trainNo) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const train = mockTrains.find(t => t.trainNo === trainNo);
      // Randomly update status for demonstration purposes
      const statuses = ["ON TIME", "DELAYED BY 15 MIN", "DELAYED BY 45 MIN", "ARRIVED", "DEPARTED"];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      resolve({
        trainNo,
        status: randomStatus,
        lastUpdated: new Date().toISOString()
      });
    }, 500);
  });
};

export const fetchSeatAvailability = async (trainNo) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSeatAvailability[trainNo] || mockSeatAvailability["12951"]);
    }, DELAY);
  });
};

export const searchStations = async (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query) return resolve([]);
      const results = stationsList.filter(s => s.toLowerCase().includes(query.toLowerCase()));
      resolve(results);
    }, 300); // Shorter delay for autosuggest
  });
};
