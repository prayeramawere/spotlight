import { createClient } from "../database/clients.js";

export const addClient = async (req, res) => {
  const data = await req.body;

  console.log("data obtained from client during signup: ", data);

  const response = await createClient(data);

  res.send(response);
};
