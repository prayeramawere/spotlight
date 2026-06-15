import supabase from "../services/supabaseClient.js";

export const createProject = async (projectData) => {
  const { data, error } = await supabase.from("projects").insert({
    ...projectData,
  });

  console.log(data, error);
};

export const updateProject = async (data) => {
  try {
    const { data } = await supabase
      .from("projects")
      .update(data)
      .eq("id", id)
      .select();
  } catch (error) {}
};

export const deleteProject = async (id) => {
  await supabase.from("projects").delete("*").eq("id", id);
};

export const getProjects = async () => {
  const { data } = await supabase.from("projects").select("*");

  return data;
};
