const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(url, options = {}) {
  const response = await fetch(`${API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}

export const getWeather = () =>
  request("/citizen/weather");

export const getForecast = () =>
  request("/citizen/forecast");

export const getFacilities = () =>
  request("/citizen/facilities");

export const calculateRisk = (profile) =>
  request("/citizen/risk", {
    method: "POST",
    body: JSON.stringify(profile)
  });

export const getWards = () =>
  request("/authority/wards");

export const getAuthorityForecast = () =>
  request("/authority/forecast");

export const getAlerts = () =>
  request("/authority/alerts");

export const simulateIntervention = (data) =>
  request("/authority/simulate", {
    method: "POST",
    body: JSON.stringify(data)
  });
