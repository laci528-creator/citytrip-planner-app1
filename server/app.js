import express from 'express';
import cors from 'cors';
import searchRoutes from "./routes/searchRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js"

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());

app.use("/api/cities/search", searchRoutes);
app.use("/api/cities/details", destinationRoutes);

app.get("/api/test", (req, res) => {
  res.json({
    status: "ok",
    message: "CityTrip Planner API is running.",
  });
});

export default app;