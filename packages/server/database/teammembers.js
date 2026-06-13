import supabase from "../services/supabaseClient";


const addTeamMember = async ((name, email,password, hourlyrate=0)=>{
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