import express from "express";
import { addTeamMember } from "../database/teammembers";

const router = express.Router();

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

export default router;
