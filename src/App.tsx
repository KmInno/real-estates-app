import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "./lib/supabase";
import { ensureProfile, getProfile, type Profile } from "./lib/profile";

import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { Properties } from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import ManageProperties from "./pages/admin/ManageProperties";
import AddProperty from "./pages/admin/AddProperty";
import Users from "./pages/admin/Users";
import Auctions from "./pages/admin/Auctions";
import Messages from "./pages/admin/Messages";
import AddAuction from "./pages/admin/AddAuction";
import MessageThread from "./pages/MessageThread";

export default function App() {
  const [user, setUser] = useState<Session["user"] | null>(null);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    let mounted = true;

    const boot = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) console.error("getSession error:", error);

        const currentUser = data.session?.user ?? null;
        if (!mounted) return;

        setUser(currentUser);

        if (currentUser) {
          await ensureProfile(currentUser);
          const profile = await getProfile(currentUser.id);
          setUserProfile(profile);
        }
      } catch (err) {
        console.error("Auth boot error:", err);
      } finally {
        if (mounted) setLoadingAuth(false);
      }
    };

    boot();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        (async () => {
          await ensureProfile(currentUser);
          const profile = await getProfile(currentUser.id);
          if (mounted) setUserProfile(profile);
        })();
      } else {
        setUserProfile(null);
      }

      setLoadingAuth(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loadingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07111f] text-white">
        Loading...
      </div>
    );
  }

  // Helper function to render role-based dashboard
  const renderDashboard = () => {
    if (!user) return <Navigate to="/" replace />;

    switch (userProfile?.role) {
      case "admin":
        return <AdminDashboard user={user} />;
      case "seller":
        return <SellerDashboard user={user} />;
      case "buyer":
      default:
        return <BuyerDashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route
          path="/admin/add-auction"
          element={user ? <AddAuction user={user} /> : <Navigate to="/" replace />}
        />

        <Route
          path="/dashboard"
          element={renderDashboard()}
        />
        <Route
          path="/admin"
          element={userProfile?.role === "admin" ? <AdminDashboard user={user!} /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/admin/properties"
          element={userProfile?.role === "admin" ? <ManageProperties user={user!} /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/admin/add-property"
          element={user ? <AddProperty user={user} /> : <Navigate to="/" replace />}
        />
        <Route
          path="/admin/users"
          element={userProfile?.role === "admin" ? <Users user={user!} /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/admin/auctions"
          element={userProfile?.role === "admin" ? <Auctions user={user!} /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/admin/messages"
          element={userProfile?.role === "admin" ? <Messages user={user!} /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/messages/:conversationId"
          element={user ? <MessageThread /> : <Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}