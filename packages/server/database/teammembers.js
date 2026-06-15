import supabase from "../services/supabaseClient.js";


export const addTeamMember = async ((name, email,password, hourlyrate=0)=>{
    try {
        const {data,error} = await supabase.auth.signUp(
            email,
            password
        )

        console.log(data, error)

        await supabase
        .from("teammembers")
        .insert({
            id:data.user.id,
            name,
            email,
            password,
            hourlyrate
        })

        return "successfully created teammember"
    } catch (error) {
        console.log("an error occured while attempting to add team member: ", error)
    }
})

export const updateTeam = async (data,id) => {
  try {
    const { data } = await supabase
      .from("teammembers")
      .update(data)
      .eq("id", id)
      .select();
  } catch (error) {}
};

export const deleteTeamMember = async (id) => {
  await supabase.from("teammembers").delete("*").eq("id", id);
};

export const getTeam = async () => {
  const { data } = await supabase.from("teammembers").select("*");

  return data;
};
