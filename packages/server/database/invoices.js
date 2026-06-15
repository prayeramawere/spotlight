import supabase from "../services/supabaseClient.js";

export const createInvoice = async (invoiceData) => {
  const { data, error } = await supabase.from("invoices").insert({
    ...invoiceData,
  });

  console.log(data, error);
};

export const updateInvoice = async (data) => {
  try {
    const { data } = await supabase
      .from("invoice")
      .update(data)
      .eq("id", id)
      .select();
  } catch (error) {}
};

export const deleteInvoice = async (id) => {
  await supabase.from("invoices").delete("*").eq("id", id);
};

export const getInvoicess = async () => {
  const { data } = await supabase.from("invoices").select("*");

  return data;
};
