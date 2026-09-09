export function calculateHeatRisk({
  temperature,
  humidity,
  wind,
  solar,
  age,
  occupation,
  pregnancy,
  conditions = []
}) {
  let score = 0;

  // Environmental component
  if (temperature >= 40) score += 35;
  else if (temperature >= 37) score += 28;
  else if (temperature >= 34) score += 20;
  else if (temperature >= 30) score += 12;

  if (humidity >= 70) score += 20;
  else if (humidity >= 60) score += 15;
  else if (humidity >= 50) score += 10;
  else if (humidity >= 40) score += 5;

  if (wind <= 8) score += 12;
  else if (wind <= 15) score += 7;
  else if (wind <= 25) score += 3;

  if (solar === "High") score += 13;
  else if (solar === "Medium") score += 7;

  // Personal vulnerability
  if (age >= 65) score += 10;
  else if (age >= 60) score += 8;
  else if (age <= 5) score += 9;
  else if (age <= 12) score += 7;

  if (occupation === "Outdoor Worker") {
    score += 10;
  } else if (occupation === "Student") {
    score += 3;
  }

  if (pregnancy) {
    score += 5;
  }

  if (conditions.length > 0 && !conditions.includes("None")) {
    score += Math.min(10, conditions.length * 4);
  }

  score = Math.min(Math.round(score), 100);

  let level = "Low";
  if (score >= 85) level = "Extreme";
  else if (score >= 70) level = "Very High";
  else if (score >= 50) level = "High";
  else if (score >= 30) level = "Moderate";

  // Generate reasons
  const reasons = [];
  if (temperature >= 37) reasons.push("🌡 High temperature");
  if (humidity >= 60) reasons.push("💧 High humidity");
  if (solar === "High") reasons.push("☀️ Strong solar exposure");
  if (wind <= 10) reasons.push("💨 Low wind speed");
  if (age >= 60 || age <= 12) reasons.push("👤 Age vulnerability");
  if (occupation === "Outdoor Worker") reasons.push("🔧 Outdoor work exposure");

  return {
    score,
    level,
    reasons
  };
}
