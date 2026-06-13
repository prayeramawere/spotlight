import express from "express";
import { createProject } from "../database/projects";

const router = express.Router();

router.post("/add", async (req, res) => {
  const data = req.body;

  console.log("project data is: ", data);

  try {
    await createProject(data);
    res
      .status(200)
      .json({ success: true, msg: " created project successfully" });
  } catch (error) {
    console.log("error id: ", error);
    res.status(400).json({ success: false, msg: `an error occured: ${error}` });
  }
});

export default router;
