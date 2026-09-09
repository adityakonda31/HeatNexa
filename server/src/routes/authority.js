import express from "express";
import { wards, forecast, alerts } from "../data/demoData.js";
import { simulateIntervention } from "../services/simulator.js";

const router = express.Router();

router.get("/wards", (req, res) => {
  res.json(wards);
});

router.get("/forecast", (req, res) => {
  res.json(forecast);
});

router.get("/alerts", (req, res) => {
  res.json(alerts);
});

router.post("/simulate", (req, res) => {
  const result = simulateIntervention(req.body);
  res.json(result);
});

export default router;
