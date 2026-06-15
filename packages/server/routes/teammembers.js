import express from "express";
import {
  addTeamMember,
  deleteTeamMember,
  getTeam,
  updateTeam,
} from "../database/teammembers.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await getTeam();
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, err: error });
  }
});

router.post("/add", async (req, res) => {
  const data = req.body;

  console.log("the member data is: ", data);

  try {
    await addTeamMember(data);
    res
      .status(200)
      .json({ success: true, msg: " added teammember successfully" });
  } catch (error) {
    console.log("error id: ", error);
    res.status(400).json({ success: false, msg: `an error occured: ${error}` });
  }
});

router.put("/update/:id", async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  try {
    const response = await updateTeam(data, id);
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(400).json({ success: false, err: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await deleteTeamMember(id);
    res
      .status(200)
      .json({ success: true, msg: `succesfully deleted teammenber: ${id}` });
  } catch (error) {
    res.status(400).json({ success: false, err: error });
  }
});

export default router;
