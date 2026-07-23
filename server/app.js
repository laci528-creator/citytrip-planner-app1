import express from 'express';
import cors from 'cors';
import searchRoutes from "./routes/searchRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js"

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/cities/search", searchRoutes);
app.use("/api/cities/details", destinationRoutes);

app.get('/api/test', (req, res) => {
res.json({ message: 'Backend answered successfully.' });
});

export default app;