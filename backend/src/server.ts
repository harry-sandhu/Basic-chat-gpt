import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const wellKnownPath = path.join(__dirname, "../.well-known");
app.use("/.well-known", express.static(wellKnownPath));


import dataRoutes from "./routes/data.js";
app.use("/api", dataRoutes);

app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
