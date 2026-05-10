import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Sidebar from "../../components/dashboard/sidebar";
import Topbar from "../../components/dashboard/Topbar";
import { supabase } from "../../lib/supabase";
import { getPropertyImageUrl } from "../../lib/storage";

type Props = {
  user: User;
};

export default function ManageProperties({ user }: Props) {
  const [properties, setProperties] = useState<Record<string, unknown>[]>([]);

  async function fetchProperties() {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

    setProperties(data || []);
  }

  async function deleteProperty(id: string) {
    const confirmed = confirm("Delete this property?");

    if (!confirmed) return;

    await supabase.from("properties").delete().eq("id", id);

    fetchProperties();
  }

  useEffect(() => {
    async function loadProperties() {
      await fetchProperties();
    }
    loadProperties();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#07111f] text-white">
      <Sidebar />

      <main className="flex-1">
        <Topbar
          user={user}
          title="Manage Properties"
          subtitle="Edit and manage all property listings"
        />

        <div className="p-6">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <table className="w-full">
              <thead className="bg-black/20 text-left text-sm text-white/60">
                <tr>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {properties.map((property) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const prop = property as any;
                  return (
                  <tr
                    key={prop.id}
                    className="border-t border-white/5"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={getPropertyImageUrl((prop as Record<string, unknown>).image_url as string | null)}
                          alt={(prop as Record<string, unknown>).title as string}
                          className="h-16 w-16 rounded-2xl object-cover"
                        />

                        <div>
                          <div className="font-medium">
                            {prop.title}
                          </div>
                          <div className="text-sm text-white/50">
                            {prop.description?.slice(0, 50)}...
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-white/70">
                      {prop.location}
                    </td>

                    <td className="px-6 py-4 text-emerald-300">
                      ${prop.price?.toLocaleString()}
                    </td>

                    <td className="px-6 py-4 text-white/70">
                      {prop.type}
                    </td>

                    <td className="px-6 py-4 text-white/70">
                      {prop.status}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button className="rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/10">
                          Edit
                        </button>

                        <button
                          onClick={() => deleteProperty(prop.id)}
                          className="rounded-full bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}