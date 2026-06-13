import express from "express";
import { createInvoice } from "../database/invoices";

const router = express.Router();

router.post("/add", async (req, res) => {
  const data = req.body;

  console.log("invoice data is: ", data);

  try {
    await createInvoice(data);
    res
      .status(200)
      .json({ success: true, msg: " created invoice successfully" });
  } catch (error) {
    console.log("error id: ", error);
    res.status(400).json({ success: false, msg: `an error occured: ${error}` });
  }
});

export default router;
