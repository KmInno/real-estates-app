import { supabase } from "./supabase";

async function getProperties() {
  const { data, error } = await supabase
    .from("properties")
    .select("*")

    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching properties:", error.message);
    return [];
  }
  console.log("DATA:", data);
  console.log("ERROR:", error);

  return data;


}

export default getProperties;