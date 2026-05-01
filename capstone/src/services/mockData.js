// Mock Indian Railways Data for Development Phase

export const mockTrains = [
  {
    trainNo: "12951",
    trainName: "MUMBAI RAJDHANI",
    source: "Mumbai Central (MMCT)",
    destination: "New Delhi (NDLS)",
    departureTime: "17:00",
    arrivalTime: "08:32",
    duration: "15h 32m",
    classes: ["1A", "2A", "3A"],
    days: ["Daily"],
    price: { "1A": 4500, "2A": 2800, "3A": 2100 },
    status: "ON TIME"
  },
  {
    trainNo: "12009",
    trainName: "SHATABDI EXP",
    source: "Mumbai Central (MMCT)",
    destination: "Ahmedabad Jn (ADI)",
    departureTime: "06:20",
    arrivalTime: "12:40",
    duration: "06h 20m",
    classes: ["EC", "CC"],
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    price: { "EC": 1800, "CC": 900 },
    status: "DELAYED BY 15 MIN"
  },
  {
    trainNo: "12283",
    trainName: "ERNAKULAM DURONTO",
    source: "Ernakulam Jn (ERS)",
    destination: "Nizamuddin (NZM)",
    departureTime: "23:25",
    arrivalTime: "19:40",
    duration: "44h 15m",
    classes: ["1A", "2A", "3A", "SL"],
    days: ["Tue"],
    price: { "1A": 5200, "2A": 3100, "3A": 2300, "SL": 900 },
    status: "ON TIME"
  },
  {
    trainNo: "22691",
    trainName: "RAJDHANI EXP",
    source: "Ksr Bengaluru (SBC)",
    destination: "Nizamuddin (NZM)",
    departureTime: "20:00",
    arrivalTime: "05:30",
    duration: "33h 30m",
    classes: ["1A", "2A", "3A"],
    days: ["Daily"],
    price: { "1A": 4800, "2A": 2900, "3A": 2200 },
    status: "ON TIME"
  },
  {
    trainNo: "12834",
    trainName: "HOWRAH EXP",
    source: "Ahmedabad Jn (ADI)",
    destination: "Howrah Jn (HWH)",
    departureTime: "00:15",
    arrivalTime: "13:30",
    duration: "37h 15m",
    classes: ["2A", "3A", "SL"],
    days: ["Daily"],
    price: { "2A": 2600, "3A": 1800, "SL": 700 },
    status: "ON TIME"
  }
];

export const mockSeatAvailability = {
  "12951": [
    { date: "2026-05-02", available: 12 },
    { date: "2026-05-03", available: 4 },
    { date: "2026-05-04", available: 0, waitlist: 15 },
    { date: "2026-05-05", available: 25 },
    { date: "2026-05-06", available: 40 },
    { date: "2026-05-07", available: 55 },
    { date: "2026-05-08", available: 80 }
  ],
  "12009": [
    { date: "2026-05-02", available: 50 },
    { date: "2026-05-03", available: 10 },
    { date: "2026-05-04", available: 5 },
    { date: "2026-05-05", available: 30 },
    { date: "2026-05-06", available: 45 },
    { date: "2026-05-07", available: 60 },
    { date: "2026-05-08", available: 90 }
  ]
};

export const stationsList = [
  "Mumbai Central (MMCT)",
  "New Delhi (NDLS)",
  "Ahmedabad Jn (ADI)",
  "Ernakulam Jn (ERS)",
  "Nizamuddin (NZM)",
  "Ksr Bengaluru (SBC)",
  "Howrah Jn (HWH)"
];
