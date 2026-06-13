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
