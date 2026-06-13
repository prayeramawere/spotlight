import express from "express";
import { addClient } from "../controllers/clients.js";

const router = express.Router();

router.post("/add", addClient);

export default router;
