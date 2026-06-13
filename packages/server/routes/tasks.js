import express from "express";
import { createTask } from "../database/tasks";

const router = express.Router();

router.post("/add", async (req, res) => {
  const data = req.body;

  console.log("task data is: ", data);

  try {
    await createTask(data);
    res.status(200).json({ success: true, msg: " created task successfully" });
  } catch (error) {
    console.log("error id: ", error);
    res.status(400).json({ success: false, msg: `an error occured: ${error}` });
  }
});

export default router;
