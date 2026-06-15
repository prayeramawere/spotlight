import supabase from "../services/supabaseClient.js";

export const createTask = async (taskData) => {
  const { data, error } = await supabase.from("tasks").insert({
    ...taskData,
  });

  console.log(data, error);
};

export const updateTasks = async (data, id) => {
  try {
    const { data } = await supabase
      .from("tasks")
      .update(data)
      .eq("id", id)
      .select();
  } catch (error) {}
};

export const deleteTasks = async (id) => {
  await supabase.from("tasks").delete("*").eq("id", id);
};

export const getTasks = async () => {
  const { data } = await supabase.from("tasks").select("*");

  return data;
};
