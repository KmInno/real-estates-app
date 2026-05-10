import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Sidebar from "../../components/dashboard/sidebar";
import Topbar from "../../components/dashboard/Topbar";
import { getUsers } from "../../lib/adminApi";

type Props = {
  user: User;
};

export default function Users({ user }: Props) {
  const [users, setUsers] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    }

    loadUsers();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#07111f] text-white">
      <Sidebar />
      <main className="flex-1">
        <Topbar user={user} title="Users" subtitle="Buyers, sellers, and admins" />

        <div className="p-6">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <table className="w-full">
              <thead className="bg-black/20 text-left text-sm text-white/60">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Role</th>
                   </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="px-6 py-6 text-white/60" colSpan={4}>Loading users...</td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td className="px-6 py-6 text-white/60" colSpan={4}>No users found.</td>
                  </tr>
                ) : (
                  users.map((u) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const user = u as any;
                    return (
                    <tr key={user.id} className="border-t border-white/5">
                      <td className="px-6 py-4">{user.full_name || "No name"}</td>
                      <td className="px-6 py-4 text-white/70">{user.email || "No email"}</td>
                      <td className="px-6 py-4 text-white/70">{user.phone || "No phone"}</td>
                      <td className="px-6 py-4 text-emerald-300">{user.role || "buyer"}</td>
                    </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
