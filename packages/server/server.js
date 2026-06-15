import express, { urlencoded } from "express";
import client from "./routes/clients.js";
import invoice from "./routes/invoices.js";
import projects from "./routes/projects.js";
import tasks from "./routes/tasks.js";
import teammember from "./routes/tasks.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/clients", client);
app.use("/invoice", invoice);
app.use("/projects", projects);
app.use("/tasks", tasks);
app.use("/team", teammember);

app.get("/", (req, res) => {
  res.send("this is a test");
});

app.listen(5000, () => {
  console.log("app listening on port http://localhost:5000");
});
