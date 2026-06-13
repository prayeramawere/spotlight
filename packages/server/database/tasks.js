import supabase from "../services/supabaseClient";

export const createTask = async (data) => {
  const { data, error } = await supabase.from("tasks").insert({
    ...data,
  });

  console.log(data, error);
};
