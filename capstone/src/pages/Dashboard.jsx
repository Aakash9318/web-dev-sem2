import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { mockSeatAvailability, mockTrains } from '../services/mockData';
import { TrendingUp, Activity, Users } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [selectedTrain, setSelectedTrain] = useState('12951');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const data = mockSeatAvailability[selectedTrain] || mockSeatAvailability['12951'];
    
    setChartData({
      labels: data.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
      datasets: [
        {
          label: 'Available Seats',
          data: data.map(d => d.available),
          borderColor: '#1d4ed8',
          backgroundColor: 'rgba(29, 78, 216, 0.5)',
          tension: 0.3,
          fill: true,
        },
        {
          label: 'Waitlist',
          data: data.map(d => d.waitlist || 0),
          borderColor: '#f97316',
          backgroundColor: 'rgba(249, 115, 22, 0.5)',
          tension: 0.3,
        }
      ]
    });
  }, [selectedTrain]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="relative z-10 mb-4 md:mb-0">
          <h1 className="text-3xl font-serif font-semibold text-primary tracking-tight">Analytics Dashboard</h1>
          <p className="text-gray-400 font-light italic mt-1">Track seat availability trends over the next 7 days</p>
        </div>
        <div className="relative z-10 w-full md:w-auto">
          <select 
            value={selectedTrain}
            onChange={(e) => setSelectedTrain(e.target.value)}
            className="w-full md:w-auto bg-gray-50 border-gray-200 rounded-xl p-3 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm font-semibold text-gray-700 transition-all outline-none"
          >
            {mockTrains.map(train => (
              <option key={train.trainNo} value={train.trainNo} className="font-medium">
                {train.trainNo} - {train.trainName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-5 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
          <div className="p-4 bg-blue-50 text-primary rounded-2xl shadow-inner border border-blue-100/50">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] mb-1">Avg. Daily Demand</p>
            <p className="text-3xl font-serif font-semibold text-primary">High</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-5 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
          <div className="p-4 bg-orange-50 text-secondary rounded-2xl shadow-inner border border-orange-100/50">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <p className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] mb-1">Waitlist Prob.</p>
            <p className="text-3xl font-serif font-semibold text-primary">65%</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-5 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
          <div className="p-4 bg-green-50 text-green-600 rounded-2xl shadow-inner border border-green-100/50">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <p className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] mb-1">Best Day to Book</p>
            <p className="text-3xl font-serif font-semibold text-primary">Tuesday</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-accent/10">
        <h3 className="text-xl font-serif font-semibold text-primary tracking-tight mb-8">7-Day Availability Trend</h3>
        <div className="h-96">
          {chartData && <Line options={chartOptions} data={chartData} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
