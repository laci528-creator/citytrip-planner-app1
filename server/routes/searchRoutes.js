import express from "express";
import { 
    getCitySuggestions,
} from "../controllers/searchController.js";

const router = express.Router();

router.get("/", getCitySuggestions);

export default router;