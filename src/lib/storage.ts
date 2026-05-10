import { supabase } from "./supabase";

export function getPropertyImageUrl(imagePath: string | null): string {
  if (!imagePath) {
    return "https://via.placeholder.com/1000x700?text=Property";
  }

  // If it's already a full URL, return as-is
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // If it's just a filename, construct the full path
  const filePath = imagePath.includes("/") ? imagePath : `properties/${imagePath}`;

  // Get the public URL from Supabase storage
  const { data } = supabase.storage
    .from("property-images")
    .getPublicUrl(filePath);

  return data?.publicUrl || "https://via.placeholder.com/1000x700?text=Property";
}

export async function uploadPropertyImage(file: File) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `properties/${fileName}`;

  const { error } = await supabase.storage
    .from("property-images")
    .upload(filePath, file);

  if (error) {
    console.error("Upload error:", error.message);
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("property-images")
    .getPublicUrl(filePath);

  return publicUrl;
}
