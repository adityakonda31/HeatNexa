import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import citizenRoutes from "./routes/citizen.js";
import authorityRoutes from "./routes/authority.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "HeatNexa API",
    version: "1.0.0",
    status: "running"
  });
});

app.use("/api/citizen", citizenRoutes);
app.use("/api/authority", authorityRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 HeatNexa API running on port ${PORT}`);
});
