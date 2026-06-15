import express from "express";
import {
  createProject,
  getProjects,
  updateProject,
} from "../database/projects.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await getProjects();
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, err: error });
  }
});

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

router.put("/update/:id", async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  try {
    const response = await updateProject(data, id);
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(400).json({ success: false, err: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await deleteProject(id);
    res
      .status(200)
      .json({ success: true, msg: `succesfully deleted project: ${id}` });
  } catch (error) {
    res.status(400).json({ success: false, err: error });
  }
});

export default router;
