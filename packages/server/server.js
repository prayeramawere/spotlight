import express, { urlencoded } from "express";
import client from "./routes/clients.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/clients", client);

app.get("/", (req, res) => {
  res.send("this is a test");
});

app.listen(5000, () => {
  console.log("app listening on port http://localhost:5000");
});
