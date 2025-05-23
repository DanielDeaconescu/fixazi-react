import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { FiLogOut, FiSend, FiMessageSquare } from "react-icons/fi";
import { useAuthStore } from "../store/authStore";
import toast, { Toaster } from "react-hot-toast";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Badge,
  Form,
  InputGroup,
  Button,
  Stack,
} from "react-bootstrap";
import styled from "styled-components";

// Styled components with better visibility
const AdminContainer = styled(Container)`
  max-width: 1400px;
  margin: 20px auto;
  height: calc(100vh - 40px);
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const SidebarCard = styled(Card)`
  height: 100%;
  border-right: 1px solid #dee2e6;
  background-color: #fff;
`;

const SidebarHeader = styled(Card.Header)`
  background-color: #f1f3f5;
  border-bottom: 1px solid #dee2e6;
  font-weight: 600;
  padding: 12px 16px;
`;

const RoomItem = styled(ListGroup.Item)`
  padding: 12px 16px;
  border-left: 3px solid
    ${(props) => (props.$active ? "#0d6efd" : "transparent")};
  background-color: ${(props) => (props.$active ? "#e9ecef" : "#fff")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f3f5;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
`;

const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background-color: #f8f9fa;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px 14px;
  margin-bottom: 12px;
  border-radius: 8px;
  font-size: 0.95rem;
  line-height: 1.4;
  word-break: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  ${({ $isCustomer, $unread }) => {
    if ($isCustomer) {
      return $unread
        ? `
          background: #e9ecef;
          color: #212529;
          border-left: 3px solid #0d6efd;
        `
        : `
          background: #e9ecef;
          color: #212529;
        `;
    } else {
      return `
        background: #0d6efd;
        color: white;
      `;
    }
  }}
`;

const InputContainer = styled.div`
  padding: 16px;
  background-color: #fff;
  border-top: 1px solid #dee2e6;
  position: sticky;
  bottom: 0;
`;

const StyledInput = styled(Form.Control)`
  border-radius: 20px;
  padding: 10px 16px;
  border: 1px solid #ced4da;

  &:focus {
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
`;

const SendButton = styled(Button)`
  border-radius: 20px;
  width: auto;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #0d6efd;
  border: none;
  transition: all 0.2s;

  &:hover {
    background-color: #0b5ed7;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #6c757d;
  gap: 12px;
`;

export default function Admin() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { user, logout } = useAuthStore();
  const [unreadCounts, setUnreadCounts] = useState({});
  const [unreadMessages, setUnreadMessages] = useState({});
  const [newConversations, setNewConversations] = useState({});

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
                `Ai primit un nou mesaj de la un vizitator fixazi.com!`,
                {
                  position: "top-center",
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
      <AdminContainer fluid>
        <Row className="g-0 h-100">
          {/* Sidebar - 30% width */}
          <Col md={4} lg={3} className="h-100">
            <SidebarCard>
              <SidebarHeader className="d-flex justify-content-between align-items-center">
                <span>Conversații</span>
                <Button
                  variant="button"
                  className="text-danger p-0 d-flex align-items-center"
                  onClick={logout}
                >
                  Deconectare
                  <FiLogOut className="ms-2" size={18} />
                </Button>
              </SidebarHeader>
              <Card.Body className="p-0 overflow-auto">
                <ListGroup variant="flush">
                  {rooms.map((room) => (
                    <RoomItem
                      key={room}
                      $active={activeRoom === room}
                      onClick={() => loadRoom(room)}
                    >
                      <Stack direction="horizontal" gap={2}>
                        <div className="me-auto">
                          <div className="d-flex align-items-center">
                            {unreadCounts[room] > 0 && (
                              <span
                                className="me-2"
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  backgroundColor: "#0d6efd",
                                  borderRadius: "50%",
                                  display: "inline-block",
                                }}
                              ></span>
                            )}
                            <span className="fw-bold">
                              {room.startsWith("room_")
                                ? "Anonymous"
                                : "Customer"}
                            </span>
                          </div>
                          <small className="text-muted">{room}</small>
                        </div>
                        {unreadCounts[room] > 0 && (
                          <Badge bg="primary" pill>
                            {unreadCounts[room]}
                          </Badge>
                        )}
                      </Stack>
                    </RoomItem>
                  ))}
                </ListGroup>
              </Card.Body>
            </SidebarCard>
          </Col>

          {/* Chat Area - 70% width */}
          <Col md={8} lg={9} className="h-100">
            <ChatContainer>
              {activeRoom ? (
                <>
                  <MessagesArea>
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`d-flex mb-2 ${
                          msg.is_from_customer
                            ? "justify-content-start"
                            : "justify-content-end"
                        }`}
                      >
                        <MessageBubble
                          $isCustomer={msg.is_from_customer}
                          $unread={!msg.is_read && msg.is_from_customer}
                        >
                          {msg.content}
                        </MessageBubble>
                      </div>
                    ))}
                  </MessagesArea>

                  <InputContainer>
                    <InputGroup>
                      <StyledInput
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Scrie răspunsul..."
                      />
                      <SendButton
                        variant="primary"
                        onClick={sendMessage}
                        disabled={!input.trim()}
                      >
                        <FiSend size={16} />
                        <span>Trimite</span>
                      </SendButton>
                    </InputGroup>
                  </InputContainer>
                </>
              ) : (
                <EmptyState>
                  <FiMessageSquare size={48} />
                  <div>Alegeți o conversație pentru a vedea mesajele</div>
                </EmptyState>
              )}
            </ChatContainer>
          </Col>
        </Row>
      </AdminContainer>
    </>
  );
}
