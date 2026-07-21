import express from 'express';
import cors from 'cors';
import searchRoutes from "./routes/searchRoutes.js";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/search", searchRoutes); 

app.get('/api/test', (req, res) => {
res.json({ message: 'Backend answered successfully.' });
});

export default app;