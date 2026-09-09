export function getRecommendations(profile, risk) {
  const recommendations = [];

  if (risk >= 70) {
    recommendations.push("Avoid direct sunlight during peak afternoon hours (12 PM – 4 PM).");
    recommendations.push("Increase hydration — drink 2-3 litres of water daily.");
    recommendations.push("Take frequent cooling breaks in shaded areas.");
  }

  if (risk >= 50 && risk < 70) {
    recommendations.push("Limit outdoor exposure during midday hours.");
    recommendations.push("Stay hydrated and carry water when outdoors.");
  }

  if (profile.occupation === "Outdoor Worker") {
    recommendations.push("Schedule strenuous outdoor work before 10 AM where possible.");
    recommendations.push("Use shade and protective clothing during outdoor activity.");
    recommendations.push("Use protective headgear and light-colored clothing.");
  }

  if (profile.age >= 60) {
    recommendations.push("Avoid prolonged outdoor exposure during peak heat.");
    recommendations.push("Check on elderly family members regularly.");
  }

  if (profile.age <= 12) {
    recommendations.push("Children should avoid strenuous outdoor activity during peak heat.");
    recommendations.push("Ensure children drink water regularly.");
  }

  if (profile.pregnancy) {
    recommendations.push("Avoid prolonged exposure to extreme heat and stay hydrated.");
    recommendations.push("Rest in cool environments and monitor for dizziness.");
  }

  if (profile.conditions?.includes("Heart condition")) {
    recommendations.push("Avoid strenuous activity — heat increases cardiac stress.");
  }

  if (profile.conditions?.includes("Respiratory condition")) {
    recommendations.push("Stay in well-ventilated spaces during extreme heat.");
  }

  if (profile.conditions?.includes("Diabetes")) {
    recommendations.push("Monitor blood sugar more frequently during heat exposure.");
  }

  if (profile.conditions?.includes("Kidney condition")) {
    recommendations.push("Increase fluid intake to prevent dehydration.");
  }

  if (recommendations.length === 0) {
    recommendations.push("Stay hydrated and avoid unnecessary prolonged heat exposure.");
  }

  return recommendations;
}
