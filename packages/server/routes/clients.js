import express from "express";
import {
  addClient,
  deleteClientData,
  updateClientData,
} from "../controllers/clients.js";
import { deleteClient, getClients, updateClient } from "../database/clients.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await getClients();
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, err: error });
  }
});

router.post("/add", addClient);

router.put("/update/:id", updateClientData);

router.delete("/delete", deleteClientData);

export default router;
