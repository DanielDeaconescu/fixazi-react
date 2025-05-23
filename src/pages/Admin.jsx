import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { FiLogOut, FiSend, FiMessageSquare } from "react-icons/fi";
import { useAuthStore } from "../store/authStore";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";

// Styled Components
const MessagesContainer = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background-color: #0f172a;
  max-height: 70vh; /* Added max-height */
`;

const MessageBubble = styled.div`
  max-width: 80%;
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  border-radius: 1rem;
  font-size: 0.95rem;
  line-height: 1.4;
  word-break: break-word;
  position: relative;

  ${({ $isCustomer, $unread }) => {
    if ($isCustomer) {
      return $unread
        ? `
          background: #4b5563;
          color: #e2e8f0;
          align-self: flex-start;
          border-left: 3px solid #3b82f6;
        `
        : `
          background: #334155;
          color: #e2e8f0;
          align-self: flex-start;
        `;
    } else {
      return `
        background: #3b82f6;
        color: white;
        align-self: flex-end;
      `;
    }
  }}
`;

const UnreadIndicator = styled.span`
  position: absolute;
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background-color: #3b82f6;
  border-radius: 50%;
`;

const AdminContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #0f172a; /* Dark background */
  color: #e2e8f0; /* Light text */
`;

const Sidebar = styled.div`
  width: 280px;
  background-color: #1e293b;
  border-right: 1px solid #334155;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #334155;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoutButton = styled.button`
  background: transparent;
  border: none;
  color: #f87171;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  &:hover {
    color: #ef4444;
  }
`;

const RoomList = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const RoomItem = styled.div`
  padding: 1rem;
  cursor: pointer;
  border-bottom: 1px solid #334155;
  transition: background-color 0.2s;
  background-color: ${({ $active }) => ($active ? "#334155" : "transparent")};

  &:hover {
    background-color: #334155;
  }
`;

const RoomName = styled.div`
  font-weight: 500;
  color: #f8fafc;
  margin-bottom: 0.25rem;
`;

const RoomMeta = styled.div`
  font-size: 0.8rem;
  color: #94a3b8;
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid #334155;
  background-color: #1e293b;
  display: flex;
  gap: 0.5rem;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 1.5rem;
  border: 1px solid #334155;
  background-color: #0f172a;
  color: #e2e8f0;
  outline: none;
  font-size: 0.95rem;

  &:focus {
    border-color: #3b82f6;
  }
`;

const SendButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #64748b;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #94a3b8;
  gap: 1rem;
`;

export default function Admin() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { user, logout } = useAuthStore();
  const [unreadCounts, setUnreadCounts] = useState({});
  const [unreadMessages, setUnreadMessages] = useState({});
  const [newConversations, setNewConversations] = useState({}); // Add this at the top of your component

  const loadRoom = async (roomId) => {
    setActiveRoom(roomId);

    // Clear unread counts and indicators for this room
    setUnreadCounts((prev) => ({ ...prev, [roomId]: 0 }));
    setUnreadMessages((prev) => {
      const newUnreads = { ...prev };
      delete newUnreads[roomId];
      return newUnreads;
    });

    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("room_id", roomId)
      .order("created_at", { ascending: true });

    setMessages(data || []);

    // Mark messages as read
    await supabase
      .from("messages")
      .update({ is_read: true })
      .eq("room_id", roomId)
      .eq("is_read", false);
  };

  // Fetch all chat rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data: roomsData } = await supabase
          .from("messages")
          .select("room_id, created_at")
          .order("created_at", { ascending: false });

        const uniqueRooms = [
          ...new Set(roomsData?.map((item) => item.room_id) || []),
        ];
        setRooms(uniqueRooms);

        const { data: unreadData } = await supabase
          .from("messages")
          .select("room_id")
          .eq("is_read", false)
          .eq("is_from_customer", true);

        const counts = {};
        unreadData?.forEach(({ room_id }) => {
          counts[room_id] = (counts[room_id] || 0) + 1;
        });
        setUnreadCounts(counts);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();

    // Subscribe to new rooms
    const roomChannel = supabase
      .channel("rooms_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          if (payload.new.is_from_customer) {
            // Mark as new conversation if not the currently active room
            if (payload.new.room_id !== activeRoom) {
              setNewConversations((prev) => ({
                ...prev,
                [payload.new.room_id]: true,
              }));

              toast.success(
                `New message from ${
                  payload.new.room_id.startsWith("room_")
                    ? "Anonymous"
                    : "Customer"
                }`,
                {
                  position: "top-right",
                  duration: 5000,
                }
              );
            }
          }
          fetchRooms(); // Refresh room list
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(roomChannel);
    };
  }, [activeRoom]);

  // Updated message subscription
  useEffect(() => {
    if (!activeRoom) return;

    const messageChannel = supabase
      .channel(`admin:${activeRoom}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `room_id=eq.${activeRoom}`,
        },
        (payload) => {
          const newMessage = payload.new;
          setMessages((prev) => [...prev, newMessage]);

          if (newMessage.is_from_customer) {
            // Show toast
            toast.success(
              `New message from ${
                activeRoom.startsWith("room_") ? "Anonymous" : "Customer"
              }`,
              { position: "top-right" }
            );

            // Mark as read if in current room
            if (activeRoom === newMessage.room_id) {
              supabase
                .from("messages")
                .update({ is_read: true })
                .eq("id", newMessage.id);
            } else {
              // Track unread messages per room
              setUnreadMessages((prev) => ({
                ...prev,
                [newMessage.room_id]: (prev[newMessage.room_id] || 0) + 1,
              }));
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageChannel);
    };
  }, [activeRoom]);

  const sendMessage = async () => {
    if (!input.trim() || !activeRoom) return;
    const { error } = await supabase.from("messages").insert([
      {
        room_id: activeRoom,
        content: input,
        is_from_customer: false,
      },
    ]);
    if (!error) setInput("");
  };

  return (
    <>
      <Toaster />
      <AdminContainer>
        <Sidebar>
          <SidebarHeader>
            Chat Rooms
            <LogoutButton onClick={logout}>
              <FiLogOut /> Logout
            </LogoutButton>
          </SidebarHeader>
          <RoomList>
            {rooms.map((room) => (
              <RoomItem
                key={room}
                onClick={() => loadRoom(room)}
                $active={activeRoom === room}
              >
                <RoomName>
                  {room.startsWith("room_") ? "Anonymous" : "Customer"}
                  {unreadCounts[room] > 0 && (
                    <UnreadBadge>{unreadCounts[room]}</UnreadBadge>
                  )}
                </RoomName>
                <RoomMeta>{room}</RoomMeta>
              </RoomItem>
            ))}
          </RoomList>
        </Sidebar>

        <ChatArea>
          {activeRoom ? (
            <>
              <MessagesContainer>
                {messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    $isCustomer={msg.is_from_customer}
                    $unread={!msg.is_read && msg.is_from_customer}
                  >
                    {msg.content}
                    {!msg.is_read && msg.is_from_customer && (
                      <UnreadIndicator />
                    )}
                  </MessageBubble>
                ))}
              </MessagesContainer>
              <InputContainer>
                <MessageInput
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your reply..."
                />
                <SendButton onClick={sendMessage} disabled={!input.trim()}>
                  <FiSend size={18} />
                </SendButton>
              </InputContainer>
            </>
          ) : (
            <EmptyState>
              <FiMessageSquare size={48} />
              <div>Select a chat room to start conversation</div>
            </EmptyState>
          )}
        </ChatArea>
      </AdminContainer>
    </>
  );
}

// Add this styled component for unread badges
const UnreadBadge = styled.span`
  background-color: #3b82f6;
  color: white;
  border-radius: 50%;
  padding: 0.1rem 0.4rem;
  font-size: 0.7rem;
  margin-left: 0.5rem;
`;
