import express from "express";
import { weather, forecast, hospitals, coolingCentres } from "../data/demoData.js";
import { calculateHeatRisk } from "../services/heatEngine.js";
import { getRecommendations } from "../services/recommendationEngine.js";

const router = express.Router();

router.get("/weather", (req, res) => {
  res.json(weather);
});

router.get("/forecast", (req, res) => {
  res.json(forecast);
});

router.get("/facilities", (req, res) => {
  res.json({
    hospitals,
    coolingCentres
  });
});

router.post("/risk", (req, res) => {
  const profile = req.body;

  const result = calculateHeatRisk({
    ...weather,
    ...profile
  });

  const recommendations = getRecommendations(profile, result.score);

  res.json({
    ...result,
    weather,
    recommendations
  });
});

export default router;
