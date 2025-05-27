import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { FiLogOut, FiSend, FiMessageSquare, FiPhone } from "react-icons/fi";
import { useAuthStore } from "../store/authStore";
import toast, { Toaster } from "react-hot-toast";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Badge,
  Button,
  Stack,
} from "react-bootstrap";
import styled from "styled-components";
import { FiPaperclip } from "react-icons/fi";
import { format } from "date-fns";

// Styled components
const AdminContainer = styled(Container)`
  max-width: 1400px;
  margin: 20px auto;
  height: calc(100vh - 40px);
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 768px) {
    margin: 0;
    height: 100vh;
    border-radius: 0;
    overflow-x: hidden;
    padding-top: 60px; /* Space for fixed header */
  }
`;

const SidebarCard = styled(Card)`
  height: 100%;
  border-right: 1px solid #dee2e6;
  background-color: #fff;

  @media (max-width: 768px) {
    position: fixed;
    width: 80%;
    max-width: 300px;
    z-index: 1000;
    left: ${(props) => (props.$show ? "0" : "-100%")};
    transition: left 0.3s ease;
    height: 100%;
    top: 0;
  }
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
  height: 70vh;
  background-color: #fff;

  @media (max-width: 768px) {
    height: calc(100vh - 60px); /* Only account for the single header now */
    position: fixed;
    width: 100%;
    top: 60px;
    left: 0;
    z-index: 1;
  }
`;

const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background-color: #f8f9fa;

  @media (max-width: 768px) {
    height: calc(100% - 80px); /* Adjust for input container */
    padding-bottom: 80px;
  }
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  font-size: 0.95rem;
  line-height: 1.4;
  word-break: break-word;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;

  /* Visitor Messages */
  ${({ $isCustomer }) =>
    $isCustomer &&
    `
    background: #EDF2F7; /* Light gray-blue background */
    color: #2D3748; /* Dark gray text */
    border-left: 4px solid #4299E1; /* Blue accent border */
    
    /* Timestamp for visitor messages */
    small {
      color: #4A5568 !important; /* Dark gray timestamp */
    }
  `}

  /* Admin Messages */
  ${({ $isCustomer }) =>
    !$isCustomer &&
    `
    background: #4299E1; /* Blue background */
    color: white; /* White text */
    
    /* Timestamp for admin messages */
    small {
      color: #EBF8FF !important; /* Very light blue timestamp */
    }
  `}

  /* Unread message styling */
  ${({ $unread }) =>
    $unread &&
    `
    background: #E6FFFA !important;
    border-left: 4px solid #38B2AC !important;
  `}

  @media (max-width: 768px) {
    max-width: 85%;
  }
`;

const InputContainer = styled.div`
  padding: 16px;
  background-color: #fff;
  border-top: 1px solid #dee2e6;
  position: sticky;
  bottom: 0;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    z-index: 10;
    padding-bottom: env(safe-area-inset-bottom); /* For iPhone notches */
  }
`;

const StyledInput = styled.input`
  border-radius: 20px;
  padding: 10px 16px;
  border: 1px solid #ced4da;
  width: 100%;

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
  color: white;

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
  padding: 20px;
  text-align: center;

  @media (max-width: 768px) {
    padding-top: 60px;
  }
`;

// Add a new styled component for mobile header
const MobileHeader = styled.div`
  display: none;
  padding: 12px 16px;
  background-color: #f1f3f5;
  border-bottom: 1px solid #dee2e6;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 60px;

  @media (max-width: 768px) {
    display: flex;
  }

  .conversation-title {
    flex: 1;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    margin: 0 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default function Admin() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { user, logout } = useAuthStore();
  const [unreadCounts, setUnreadCounts] = useState({});
  const [unreadMessages, setUnreadMessages] = useState({});
  const [visitorProfiles, setVisitorProfiles] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const updateDocumentTitle = (count) => {
    if (count > 0) {
      document.title = `(${count}) Fixazi | Admin Chat`;
    } else {
      document.title = "Fixazi | Admin Chat";
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth <= 768) {
        const sidebar = document.querySelector(".sidebar-card");
        if (sidebar && !sidebar.contains(event.target)) {
          setShowSidebar(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Add file handler
  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(selectedFile.type)) {
      toast.error(
        "Please upload a valid file type (JPEG, PNG, GIF, PDF, TXT, DOC, DOCX)"
      );
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    setFile(selectedFile);
    setInput(selectedFile.name);
  };

  const loadRoom = async (roomId) => {
    setActiveRoom(roomId);
    if (window.innerWidth <= 768) {
      setShowSidebar(false);
    }

    // Clear unread counts for this room
    setUnreadCounts((prev) => {
      const newCounts = { ...prev, [roomId]: 0 };

      // Calculate total unread after clearing this room
      const totalUnread = Object.values(newCounts).reduce(
        (sum, count) => sum + count,
        0
      );
      setUnreadNotifications(totalUnread);
      updateDocumentTitle(totalUnread);

      return newCounts;
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
      .eq("is_read", false)
      .eq("is_from_customer", true);
  };

  useEffect(() => {
    return () => {
      // Reset title when component unmounts
      document.title = "Admin Chat";
    };
  }, []);
  // Fetch all chat rooms and visitor profiles
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Load visitor profiles first
        const { data: profiles } = await supabase
          .from("visitor_profiles")
          .select("*")
          .order("created_at", { ascending: false });

        const profilesMap = profiles?.reduce((acc, profile) => {
          acc[profile.room_id] = profile;
          return acc;
        }, {});
        setVisitorProfiles(profilesMap || {});

        // Get rooms from both messages and visitor profiles
        const { data: roomsData } = await supabase
          .from("messages")
          .select("room_id, created_at")
          .order("created_at", { ascending: false });

        // Combine rooms from messages and visitor profiles
        const messageRooms = roomsData?.map((item) => item.room_id) || [];
        const profileRooms = profiles?.map((profile) => profile.room_id) || [];

        // Create unique rooms list, prioritizing those with messages
        const allRooms = [...new Set([...messageRooms, ...profileRooms])];

        // Sort rooms by latest activity (either message or profile creation)
        const sortedRooms = allRooms.sort((a, b) => {
          const aMessageTime = roomsData?.find(
            (r) => r.room_id === a
          )?.created_at;
          const aProfileTime = profiles?.find(
            (p) => p.room_id === a
          )?.created_at;
          const bMessageTime = roomsData?.find(
            (r) => r.room_id === b
          )?.created_at;
          const bProfileTime = profiles?.find(
            (p) => p.room_id === b
          )?.created_at;

          const aLatest =
            aMessageTime && aProfileTime
              ? Math.max(new Date(aMessageTime), new Date(aProfileTime))
              : new Date(aMessageTime || aProfileTime);
          const bLatest =
            bMessageTime && bProfileTime
              ? Math.max(new Date(bMessageTime), new Date(bProfileTime))
              : new Date(bMessageTime || bProfileTime);

          return bLatest - aLatest;
        });

        setRooms(sortedRooms);

        // Load unread counts
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

        setIsLoading(false);

        const totalUnread = Object.values(counts).reduce(
          (sum, count) => sum + count,
          0
        );
        setUnreadNotifications(totalUnread);
        updateDocumentTitle(totalUnread);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setIsLoading(false);
      }
    };

    fetchInitialData();

    // Set up real-time subscriptions
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
          if (
            payload.new.is_from_customer &&
            payload.new.room_id !== activeRoom
          ) {
            setUnreadCounts((prev) => {
              const newCounts = {
                ...prev,
                [payload.new.room_id]: (prev[payload.new.room_id] || 0) + 1,
              };

              // Calculate total unread
              const totalUnread = Object.values(newCounts).reduce(
                (sum, count) => sum + count,
                0
              );
              setUnreadNotifications(totalUnread);
              updateDocumentTitle(totalUnread);

              return newCounts;
            });

            const message = payload.new.file_url
              ? `Fișier nou de la un vizitator!`
              : `Mesaj nou de la un vizitator!`;

            toast.success(message, {
              position: "top-center",
              duration: 5000,
            });

            setUnreadCounts((prev) => ({
              ...prev,
              [payload.new.room_id]: (prev[payload.new.room_id] || 0) + 1,
            }));
          }
          fetchInitialData();
        }
      )
      .subscribe();

    const visitorChannel = supabase
      .channel("visitor_profiles_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "visitor_profiles",
        },
        (payload) => {
          setVisitorProfiles((prev) => ({
            ...prev,
            [payload.new.room_id]: payload.new,
          }));

          // Also refresh the rooms list to include new visitors
          fetchInitialData();

          // Show notification for new visitor
          if (payload.eventType === "INSERT") {
            toast.success(`Vizitator nou: ${payload.new.name}`, {
              position: "top-center",
              duration: 5000,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(roomChannel);
      supabase.removeChannel(visitorChannel);
    };
  }, [activeRoom]);

  // Message subscription for active room
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

          // Only mark as read if it's from customer and we're viewing this room
          if (newMessage.is_from_customer) {
            supabase
              .from("messages")
              .update({ is_read: true })
              .eq("id", newMessage.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageChannel);
    };
  }, [activeRoom]);

  const sendMessage = async () => {
    if (!input.trim() && !file) return;

    setIsUploading(true);

    try {
      let fileUrl = null;
      let fileType = null;

      if (file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${activeRoom}-${Date.now()}.${fileExt}`;
        const filePath = `chat-files/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("chat-files")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("chat-files")
          .getPublicUrl(filePath);

        fileUrl = urlData.publicUrl;
        fileType = file.type;
      }

      const { error } = await supabase.from("messages").insert([
        {
          room_id: activeRoom,
          content: input || (file ? `[File: ${file.name}]` : ""),
          is_from_customer: false,
          file_url: fileUrl,
          file_type: fileType,
        },
      ]);

      if (!error) {
        setInput("");
        setFile(null);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Error uploading file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const renderRoomList = () => {
    if (isLoading) {
      return (
        <div className="p-3 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    return rooms.map((room) => {
      const visitor = visitorProfiles[room];
      const unreadCount = unreadCounts[room] || 0;

      return (
        <RoomItem
          key={room}
          $active={activeRoom === room}
          onClick={() => loadRoom(room)}
        >
          <div className="d-flex flex-column w-100">
            <div className="d-flex align-items-center">
              {unreadCount > 0 && <span className="unread-dot me-2" />}
              <span className="fw-bold text-truncate">
                {visitor?.name || "Vizitator nou"}
              </span>
              {unreadCount > 0 && (
                <Badge bg="primary" pill className="ms-2">
                  {unreadCount}
                </Badge>
              )}
            </div>

            {visitor ? (
              <>
                <small className="text-muted mt-1 text-truncate">
                  <FiPhone size={12} className="me-1" />
                  {visitor.phone}
                </small>
                <small className="text-muted mt-1 text-truncate">
                  ID: {room}
                </small>
              </>
            ) : (
              <small className="text-muted mt-1">Detalii indisponibile</small>
            )}
          </div>
        </RoomItem>
      );
    });
  };

  return (
    <>
      <Toaster />
      <AdminContainer fluid>
        {/* Mobile Header */}
        <MobileHeader>
          <Button
            variant="link"
            onClick={() => setShowSidebar(true)}
            className="p-0"
          >
            <FiMessageSquare size={20} />
          </Button>
          <div className="conversation-title">
            {activeRoom
              ? visitorProfiles[activeRoom]?.name || "Conversație"
              : "Conversații"}
          </div>
          <Button
            variant="link"
            className="text-danger p-0 d-flex align-items-center"
            onClick={logout}
          >
            <FiLogOut size={20} />
          </Button>
        </MobileHeader>

        <Row className="g-0 h-100 position-relative">
          {/* Sidebar - 30% width */}
          <Col md={4} lg={3} className="h-100">
            <SidebarCard $show={showSidebar} className="sidebar-card">
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
                <ListGroup variant="flush">{renderRoomList()}</ListGroup>
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
                          {msg.file_url ? (
                            <div className="d-flex flex-column">
                              <a
                                href={msg.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={
                                  msg.is_from_customer
                                    ? "text-blue-600"
                                    : "text-white"
                                }
                              >
                                {msg.file_type.startsWith("image/") ? (
                                  <img
                                    src={msg.file_url}
                                    alt="Uploaded content"
                                    style={{
                                      maxWidth: "100%",
                                      maxHeight: "200px",
                                      borderRadius: "6px",
                                    }}
                                  />
                                ) : (
                                  <div className="d-flex align-items-center gap-2">
                                    <FiPaperclip size={16} />
                                    {msg.content
                                      .replace("[File: ", "")
                                      .replace("]", "")}
                                  </div>
                                )}
                              </a>
                              <small className="mt-1">
                                {format(new Date(msg.created_at), "HH:mm")}
                              </small>
                            </div>
                          ) : (
                            <>
                              <div>{msg.content}</div>
                              <small className="d-block mt-1">
                                {format(new Date(msg.created_at), "HH:mm")}
                              </small>
                            </>
                          )}
                        </MessageBubble>
                      </div>
                    ))}
                  </MessagesArea>
                  <InputContainer>
                    <div className="d-flex gap-2 align-items-center">
                      <input
                        type="file"
                        id="admin-file-upload"
                        style={{ display: "none" }}
                        onChange={handleFileUpload}
                        accept="image/*,.pdf,.txt,.doc,.docx"
                      />
                      <label
                        htmlFor="admin-file-upload"
                        className="btn btn-outline-secondary p-2"
                        style={{ cursor: "pointer" }}
                      >
                        <FiPaperclip size={18} />
                      </label>
                      <StyledInput
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder={file ? file.name : "Scrie răspunsul..."}
                      />
                      <SendButton
                        onClick={sendMessage}
                        disabled={(!input.trim() && !file) || isUploading}
                      >
                        {isUploading ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </span>
                        ) : (
                          <>
                            <FiSend size={16} />
                            <span>Trimite</span>
                          </>
                        )}
                      </SendButton>
                    </div>
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
