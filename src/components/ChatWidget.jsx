import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../lib/supabaseClient";
import { FiMessageSquare, FiX, FiSend, FiUser, FiPhone } from "react-icons/fi";
import { format } from "date-fns";
import styled from "styled-components";
import { FiPaperclip } from "react-icons/fi";
import FilePreview from "./FilePreview";
import { useChat } from "../contexts/ChatContext";

// Styled Components
const ChatContainer = styled.div`
  position: fixed;
  bottom: 20%;
  right: 20px;
  z-index: 1000;
`;

const ToggleButton = styled.button`
  background: #3b82f6;
  color: white;
  padding: 16px;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #2563eb;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ChatWindow = styled.div`
  width: 320px;
  height: 450px;
  background: #1e293b;
  border-radius: 8px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  border: 1px solid #334155;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  padding: 12px 16px;
  background: #3b82f6;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  background: #0f172a;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MessageBubble = styled.div`
  padding: 8px 12px;
  border-radius: 12px;
  max-width: 80%;
  font-size: 14px;
  line-height: 1.4;
  word-break: break-word;

  ${({ $isCustomer }) =>
    $isCustomer
      ? `
        background: #3b82f6;
        color: white;
        align-self: flex-end;
      `
      : `
        background: #334155;
        color: #e2e8f0;
        align-self: flex-start;
      `}

  ${({ $hasAttachment }) =>
    $hasAttachment &&
    `
    padding: 12px;
  `}
`;

const MessageTime = styled.div`
  font-size: 11px;
  margin-top: 4px;
  opacity: 0.8;
  color: ${({ $isCustomer }) => ($isCustomer ? "#bfdbfe" : "#94a3b8")};
`;

const InputContainer = styled.div`
  display: flex;
  padding: 12px;
  border-top: 1px solid #334155;
  background: #1e293b;
  gap: 8px;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border-radius: 20px;
  border: 1px solid #334155;
  background: #0f172a;
  color: #e2e8f0;
  outline: none;

  &:focus {
    border-color: #3b82f6;
  }
`;

const SendButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }

  &:disabled {
    background: #64748b;
    cursor: not-allowed;
  }
`;

const InfoForm = styled.form`
  padding: 16px;
  background: #1e293b;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FormLabel = styled.label`
  font-size: 14px;
  color: #e2e8f0;
`;

const FormInput = styled.input`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #334155;
  background: #0f172a;
  color: #e2e8f0;
  outline: none;

  &:focus {
    border-color: #3b82f6;
  }
`;

const SubmitButton = styled.button`
  background: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin-top: 8px;

  &:hover {
    background: #2563eb;
  }

  &:disabled {
    background: #64748b;
    cursor: not-allowed;
  }
`;

export default function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [visitorInfo, setVisitorInfo] = useState({
    name: "",
    phone: "",
  });
  const [hasSubmittedInfo, setHasSubmittedInfo] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef(null);
  const { isChatOpen, toggleChat } = useChat();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  // Phone number regex for Romanian numbers
  const phoneRegex = /^(?:(?:00|\\+)?40|0)[0-9]{9}$/;

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate file type and size (e.g., 5MB limit)
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
        "Vă rugăm încărcați un fișier care are unul dintre aceste format-uri: JPEG, PNG, GIF, PDF, TXT, DOC, DOCX"
      );
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("Dimensiunea fișierului trebuie să fie mai mică de 5MB");
      return;
    }

    setFile(selectedFile);
    setInput(selectedFile.name);
  };

  // Generate a room ID based on visitor
  const roomId =
    localStorage.getItem("chat_room_id") ||
    `visitor_${Math.random().toString(36).slice(2, 11)}`;

  useEffect(() => {
    localStorage.setItem("chat_room_id", roomId);

    // Check if visitor info exists
    const checkVisitorInfo = async () => {
      const { data } = await supabase
        .from("visitor_profiles")
        .select("*")
        .eq("room_id", roomId)
        .single();

      if (data) {
        setHasSubmittedInfo(true);
        setVisitorInfo({
          name: data.name,
          phone: data.phone,
        });
      }
    };

    checkVisitorInfo();

    // Subscribe to new messages
    const channel = supabase
      .channel(`room:${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    // Load initial messages
    const loadMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("room_id", roomId)
        .order("created_at", { ascending: true });

      if (data) setMessages(data);
    };

    if (hasSubmittedInfo) {
      loadMessages();
    }

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, hasSubmittedInfo]);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = async (data) => {
    try {
      // Save visitor profile with explicit timestamps
      const { error } = await supabase.from("visitor_profiles").upsert(
        {
          room_id: roomId,
          name: data.name,
          phone: data.phone,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "room_id" }
      );

      if (!error) {
        setHasSubmittedInfo(true);
        // Trigger real-time update for visitor profiles
        await supabase
          .from("visitor_profiles")
          .update({ updated_at: new Date().toISOString() })
          .eq("room_id", roomId);
      }
    } catch (err) {
      console.error("Error saving visitor info:", err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() && !file) return;

    setIsUploading(true);

    try {
      let fileUrl = null;
      let fileType = null;

      // Upload file if present
      if (file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${roomId}-${Date.now()}.${fileExt}`;
        const filePath = `chat-files/${fileName}`;

        // Use the storage API directly
        const { error: uploadError } = await supabase.storage
          .from("chat-files")
          .upload(filePath, file);

        if (uploadError) {
          // Handle specific storage errors
          if (uploadError.error === "Unauthorized") {
            throw new Error(
              "Storage upload unauthorized. Check bucket policies."
            );
          }
          throw uploadError;
        }

        // Get public URL - no need for signed URL if bucket is public
        fileUrl = `${supabase.supabaseUrl}/storage/v1/object/public/chat-files/${filePath}`;
        fileType = file.type;
      }

      // Send message to database
      const { error: insertError } = await supabase.from("messages").insert([
        {
          room_id: roomId,
          content: input || (file ? `[File: ${file.name}]` : ""),
          is_from_customer: true,
          file_url: fileUrl,
          file_type: fileType,
          created_at: new Date().toISOString(), // Explicit timestamp
        },
      ]);

      if (insertError) throw insertError;

      setInput("");
      setFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ChatContainer>
      {isChatOpen ? (
        <ChatWindow>
          <ChatHeader>
            <span>Asistență Clienți</span>
            <CloseButton onClick={toggleChat}>
              <FiX size={20} />
            </CloseButton>
          </ChatHeader>

          {!hasSubmittedInfo ? (
            <InfoForm onSubmit={handleSubmit(onSubmit)}>
              <h4 style={{ color: "#e2e8f0", marginBottom: "12px" }}>
                Informații de contact
              </h4>
              <FormGroup>
                <FormLabel>
                  <FiUser size={14} style={{ marginRight: 8 }} />
                  Nume*
                </FormLabel>
                <FormInput
                  type="text"
                  placeholder="Introdu numele tău"
                  {...register("name", {
                    required: "Numele este obligatoriu",
                    minLength: {
                      value: 2,
                      message: "Numele trebuie să aibă minim 2 caractere",
                    },
                  })}
                />
                {errors.name && (
                  <span style={{ color: "#ef4444", fontSize: "12px" }}>
                    {errors.name.message}
                  </span>
                )}
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  <FiPhone size={14} style={{ marginRight: 8 }} />
                  Telefon*
                </FormLabel>
                <FormInput
                  type="tel"
                  placeholder="Introdu numărul de telefon"
                  {...register("phone", {
                    required: "Numărul de telefon este obligatoriu",
                    pattern: {
                      value: phoneRegex,
                      message: "Introdu un număr de telefon valid",
                    },
                  })}
                />
                {errors.phone && (
                  <span style={{ color: "#ef4444", fontSize: "12px" }}>
                    {errors.phone.message}
                  </span>
                )}
              </FormGroup>
              <small style={{ color: "#94a3b8", fontSize: "12px" }}>
                * Câmp obligatoriu
              </small>
              <SubmitButton type="submit">Începe conversația</SubmitButton>
            </InfoForm>
          ) : (
            <>
              <MessagesContainer>
                {messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    $isCustomer={msg.is_from_customer}
                    $hasAttachment={!!msg.file_url}
                  >
                    {msg.file_url ? (
                      <FilePreview
                        fileUrl={msg.file_url}
                        fileType={msg.file_type}
                        fileName={msg.content
                          .replace("[File: ", "")
                          .replace("]", "")}
                      />
                    ) : (
                      <div>{msg.content}</div>
                    )}
                    <MessageTime $isCustomer={msg.is_from_customer}>
                      {format(new Date(msg.created_at), "HH:mm")}
                    </MessageTime>
                  </MessageBubble>
                ))}
                <div ref={messagesEndRef} />
              </MessagesContainer>
              <InputContainer>
                <input
                  type="file"
                  id="file-upload"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                  accept="image/*,.pdf,.txt,.doc,.docx"
                />
                <label
                  htmlFor="file-upload"
                  style={{ cursor: "pointer", padding: "8px" }}
                >
                  <FiPaperclip size={20} color="#e2e8f0" />
                </label>
                <MessageInput
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder={file ? file.name : "Scrie mesajul tău..."}
                />
                <SendButton
                  onClick={sendMessage}
                  disabled={(!input.trim() && !file) || isUploading}
                >
                  {isUploading ? (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <FiSend size={16} />
                  )}
                </SendButton>
              </InputContainer>
            </>
          )}
        </ChatWindow>
      ) : (
        <ToggleButton onClick={toggleChat}>
          <FiMessageSquare size={24} />
        </ToggleButton>
      )}
    </ChatContainer>
  );
}
