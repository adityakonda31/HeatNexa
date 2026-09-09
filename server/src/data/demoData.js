export const wards = [
  {
    id: 1,
    state: "Goa",
    city: "Madgaon",
    name: "Ward 1",
    risk: 58,
    vulnerability: 51,
    population: 32000,
    children: 5200,
    elderly: 3100,
    outdoorWorkers: 5800,
    indoorWorkers: 9200,
    latitude: 15.275,
    longitude: 73.957
  },
  {
    id: 2,
    state: "Goa",
    city: "Madgaon",
    name: "Ward 2",
    risk: 76,
    vulnerability: 68,
    population: 41000,
    children: 7100,
    elderly: 4400,
    outdoorWorkers: 8200,
    indoorWorkers: 11100,
    latitude: 15.278,
    longitude: 73.962
  },
  {
    id: 3,
    state: "Goa",
    city: "Madgaon",
    name: "Ward 3",
    risk: 84,
    vulnerability: 82,
    population: 48000,
    children: 8400,
    elderly: 5100,
    outdoorWorkers: 9700,
    indoorWorkers: 12500,
    latitude: 15.271,
    longitude: 73.968
  },
  {
    id: 4,
    state: "Goa",
    city: "Madgaon",
    name: "Ward 4",
    risk: 43,
    vulnerability: 38,
    population: 28000,
    children: 4300,
    elderly: 2400,
    outdoorWorkers: 4100,
    indoorWorkers: 8700,
    latitude: 15.283,
    longitude: 73.952
  },
  {
    id: 5,
    state: "Goa",
    city: "Madgaon",
    name: "Ward 5",
    risk: 63,
    vulnerability: 55,
    population: 35000,
    children: 6100,
    elderly: 3800,
    outdoorWorkers: 6500,
    indoorWorkers: 10200,
    latitude: 15.269,
    longitude: 73.955
  }
];

export const weather = {
  temperature: 41,
  humidity: 68,
  wind: 8,
  solar: "High",
  feelsLike: 48,
  wbgt: 32,
  utci: 43
};

export const forecast = [
  { day: "Today", score: 82, temp: 41 },
  { day: "Tue", score: 87, temp: 42 },
  { day: "Wed", score: 82, temp: 41 },
  { day: "Thu", score: 78, temp: 40 },
  { day: "Fri", score: 68, temp: 38 },
  { day: "Sat", score: 62, temp: 37 },
  { day: "Sun", score: 58, temp: 36 }
];

export const hospitals = [
  {
    id: 1,
    name: "City Hospital",
    distance: "1.4 km",
    phone: "0832-2700000",
    latitude: 15.276,
    longitude: 73.965
  },
  {
    id: 2,
    name: "Community Health Centre",
    distance: "2.1 km",
    phone: "0832-2711111",
    latitude: 15.282,
    longitude: 73.954
  },
  {
    id: 3,
    name: "Hospicio Hospital",
    distance: "3.2 km",
    phone: "0832-2722222",
    latitude: 15.273,
    longitude: 73.970
  }
];

export const coolingCentres = [
  {
    id: 1,
    name: "Madgaon Cooling Centre",
    distance: "650 m",
    capacity: 200,
    available: 72,
    latitude: 15.279,
    longitude: 73.959
  },
  {
    id: 2,
    name: "Community Hall Cooling Centre",
    distance: "1.2 km",
    capacity: 300,
    available: 118,
    latitude: 15.268,
    longitude: 73.961
  }
];

export const alerts = [
  {
    id: 1,
    title: "Heat Alert",
    message: "Extreme heat expected tomorrow between 12 PM and 4 PM.",
    target: "Outdoor Workers",
    severity: "Critical",
    time: "10:24 AM"
  },
  {
    id: 2,
    title: "Hydration Advisory",
    message: "Increase water intake. High humidity expected throughout the day.",
    target: "General Population",
    severity: "High",
    time: "8:00 AM"
  }
];
