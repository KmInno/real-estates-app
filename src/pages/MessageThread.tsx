import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { getMessages, sendMessage } from "../lib/messageApi";
import { HomeNavbar } from "../components/home/HomeNavbar";
import { HomeFooter } from "../components/home/HomeFooter";

interface Message {
  id: string;
  sender_id: string;
  created_at: string;
  message: string;
  profiles?: {
    full_name: string;
    avatar_url: string;
  };
}

export default function MessageThread() {
  const { conversationId } = useParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  async function loadMessages() {
    try {
      if (!conversationId) return;

      setLoading(true);

      const data = await getMessages(conversationId);
      setMessages((data || []) as unknown as Message[]);
    } catch (error) {
      console.error("Load messages error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchMessages() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
      }
      await loadMessages();
    }

    fetchMessages();
  }, [conversationId]);

  async function handleSend() {
    try {
      if (!conversationId) {
        return;
      }

      if (!text.trim()) {
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first");
        return;
      }

      await sendMessage(
        conversationId,
        user.id,
        text.trim()
      );

      setText("");

      await loadMessages();
    } catch (error) {
      console.error("SEND ERROR:", error);
    }
  }

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <HomeNavbar />

      <main className="mx-auto max-w-5xl px-4 py-10 md:px-8">
        <div className="flex items-center gap-3 mb-2">
          <img src="/akilo_logo.png" alt="AKILO Logo" className="h-8 w-8 rounded-lg" />
          <h1 className="text-3xl font-semibold">Conversation</h1>
        </div>
        <p className="text-white/60">
          Send and receive property-related messages here.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 min-h-[400px] max-h-[600px] overflow-y-auto">
          {loading ? (
            <div className="text-white/60">Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className="text-white/60 text-center py-20">No messages yet. Start the conversation!</div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => {
                const isCurrentUser = msg.sender_id === currentUserId;
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${isCurrentUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isCurrentUser && msg.profiles?.avatar_url && (
                      <img
                        src={msg.profiles.avatar_url}
                        alt={msg.profiles.full_name}
                        className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                      />
                    )}
                    <div
                      className={`max-w-xs rounded-2xl px-4 py-3 ${
                        isCurrentUser
                          ? "bg-emerald-400 text-slate-950"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      <div className={`text-xs mb-1 ${isCurrentUser ? "text-slate-900/70" : "text-white/60"}`}>
                        {isCurrentUser ? "You" : msg.profiles?.full_name || "User"}
                      </div>
                      <div className="break-words">{msg.message}</div>
                      <div className={`text-xs mt-2 ${isCurrentUser ? "text-slate-900/60" : "text-white/40"}`}>
                        {new Date(msg.created_at).toLocaleTimeString()}
                      </div>
                    </div>
                    {isCurrentUser && msg.profiles?.avatar_url && (
                      <img
                        src={msg.profiles.avatar_url}
                        alt="Your avatar"
                        className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none placeholder:text-white/40"
          />
          <button
            type="button"
            onClick={handleSend}
            className="rounded-2xl bg-emerald-400 px-6 py-3 font-semibold text-slate-950 hover:bg-emerald-300 transition"
          >
            Send
          </button>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
}