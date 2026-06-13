import supabase from "../services/supabaseClient";

export const createProject = async (data) => {
  const { data, error } = await supabase.from("projects").insert({
    ...data,
  });

  console.log(data, error);
};
