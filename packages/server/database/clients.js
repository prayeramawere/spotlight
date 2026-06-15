import supabase from "../services/supabaseClient.js";

export const createClient = async ({
  name,
  email,
  password,
  companyname,
  conatctperson,
  phone,
  industry,
  address,
  notes,
}) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log(
      "the data obtained from the supabase auth is : ",
      data,
      " and the error is: ",
      error,
    );

    const { resdata, reserror } = await supabase.from("clients").insert({
      id: data.user.id,
      name,
      email,
      companyname,
      conatctperson,
      phone,
      industry,
      address,
      notes,
    });
    console.log(
      "response from the create client query is: ",
      resdata,
      " and the error is ",
      reserror,
    );
  } catch (error) {
    console.log("an error occured while creating a client", error);
  }
};

export const updateClient = async (data, id) => {
  try {
    const { data } = await supabase
      .from("clients")
      .update(data)
      .eq("id", id)
      .select();
  } catch (error) {}
};

export const deleteClient = async (id) => {
  await supabase.from("clients").delete("*").eq("id", id);
};

export const getClients = async () => {
  const { data, error } = await supabase.from("clients").select("*");

  console.log("an error occured while fetching clients: ".error);
  return data;
};
