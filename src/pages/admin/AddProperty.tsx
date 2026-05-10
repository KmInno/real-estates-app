import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import Sidebar from "../../components/dashboard/sidebar";
import Topbar from "../../components/dashboard/Topbar";
import { supabase } from "../../lib/supabase";
import { uploadPropertyImage } from "../../lib/storage";

type Props = {
  user: User;
};

export default function AddProperty({ user }: Props) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const form = e.currentTarget;

    const formData = new FormData(form);

    let imageUrl = "";

    try {
      if (image) {
        imageUrl = await uploadPropertyImage(image);
      }

      const property = {
        title: formData.get("title"),
        location: formData.get("location"),
        price: Number(formData.get("price")),
        type: formData.get("type"),
        status: formData.get("status"),
        description: formData.get("description"),
        image_url: imageUrl,
        created_by: user.id,
      };

      const { error } = await supabase
        .from("properties")
        .insert([property]);

      if (error) {
        console.error(error.message);
        alert("Failed to add property");
      } else {
        alert("Property added successfully");
        form.reset();
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen bg-[#07111f] text-white">
      <Sidebar />

      <main className="flex-1">
        <Topbar
          user={user}
          title="Add Property"
          subtitle="Create new property listings for AKILO"
        />

        <div className="p-6">
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-5xl space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Property Title
                </label>
                <input
                  name="title"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                  placeholder="Luxury Villa"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Location
                </label>
                <input
                  name="location"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                  placeholder="Dubai"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Price
                </label>
                <input
                  name="price"
                  type="number"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                  placeholder="500000"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Property Type
                </label>
                <select
                  name="type"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                >
                  <option value="house">House</option>
                  <option value="building">Building</option>
                  <option value="farmland">Farmland</option>
                  <option value="car">Car</option>
                  <option value="furniture">Furniture</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Status
                </label>
                <select
                  name="status"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                >
                  <option value="available">Available</option>
                  <option value="auction">Auction</option>
                  <option value="leased">Leased</option>
                  <option value="sold">Sold</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Property Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/60">
                Description
              </label>
              <textarea
                name="description"
                rows={6}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                placeholder="Property description"
              />
            </div>

            <button
              disabled={loading}
              className="rounded-full bg-emerald-400 px-8 py-3 font-semibold text-slate-950 hover:bg-emerald-300 disabled:opacity-60"
            >
              {loading ? "Uploading..." : "Add Property"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}