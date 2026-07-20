import express from "express";
import { 
    searchCities,
} from "../controllers/searchController.js";

const router = express.Router();

router.get("/", searchCities);

export default router;