import express from "express";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());


import dataRoutes from "./routes/data.js";

app.use("/api", dataRoutes);
app.use("/.well-known", express.static(".well-known"));


app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
