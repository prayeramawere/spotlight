import supabase from "../services/supabaseClient";

export const createInvoice = async (data) => {
  const { data, error } = await supabase.from("invoices").insert({
    ...data,
  });

  console.log(data, error);
};
