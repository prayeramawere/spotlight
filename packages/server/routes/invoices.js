import express from "express";
import {
  createInvoice,
  deleteInvoice,
  getInvoicess,
  updateInvoice,
} from "../database/invoices.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await getInvoicess();
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, err: error });
  }
});

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
    up;
    res.status(400).json({ success: false, msg: `an error occured: ${error}` });
  }
});

router.put("/update/:id", async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  try {
    const response = await updateInvoice(data, id);
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(400).json({ success: false, err: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await deleteInvoice(id);
    res
      .status(200)
      .json({ success: true, msg: `succesfully deleted invoice: ${id}` });
  } catch (error) {
    res.status(400).json({ success: false, err: error });
  }
});

export default router;
