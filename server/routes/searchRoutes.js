import express from "express";
import { 
    getDestinationData,
} from "../controllers/searchController.js";

const router = express.Router();

router.get("/", getDestinationData);

export default router;