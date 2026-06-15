import { createClient } from "../database/clients.js";

export const addClient = async (req, res) => {
  const data = await req.body;

  console.log("data obtained from client during signup: ", data);

  const response = await createClient(data);

  res.send(response);
};

export const updateClientData = async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  try {
    const response = await updateClient(data, id);
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(400).json({ success: false, err: error });
  }
};

export const deleteClientData = async (req, res) => {
  try {
    await deleteClient(id);
    res
      .status(200)
      .json({ success: true, msg: `succesfully deleted client: ${id}` });
  } catch (error) {
    res.status(400).json({ success: false, err: error });
  }
};
