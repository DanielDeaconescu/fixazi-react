import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { FiMessageSquare, FiX, FiSend } from "react-icons/fi";
import { format } from "date-fns";
import styled from "styled-components";

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
  height: 400px;
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

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Generate a room ID based on visitor
  const roomId =
    localStorage.getItem("chat_room_id") ||
    `visitor_${Math.random().toString(36).slice(2, 11)}`;

  useEffect(() => {
    localStorage.setItem("chat_room_id", roomId);

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

    loadMessages();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    await supabase.from("messages").insert([
      {
        room_id: roomId,
        content: input,
        is_from_customer: true,
      },
    ]);

    setInput("");
  };

  return (
    <ChatContainer>
      {isOpen ? (
        <ChatWindow>
          <ChatHeader>
            <span>Asistență Clienți</span>
            <CloseButton onClick={() => setIsOpen(false)}>
              <FiX size={20} />
            </CloseButton>
          </ChatHeader>
          <MessagesContainer>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} $isCustomer={msg.is_from_customer}>
                <div>{msg.content}</div>
                <MessageTime $isCustomer={msg.is_from_customer}>
                  {format(new Date(msg.created_at), "HH:mm")}
                </MessageTime>
              </MessageBubble>
            ))}
            <div ref={messagesEndRef} />
          </MessagesContainer>
          <InputContainer>
            <MessageInput
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Scrie mesajul tău..."
            />
            <SendButton onClick={sendMessage} disabled={!input.trim()}>
              <FiSend size={16} />
            </SendButton>
          </InputContainer>
        </ChatWindow>
      ) : (
        <ToggleButton onClick={() => setIsOpen(true)}>
          <FiMessageSquare size={24} />
        </ToggleButton>
      )}
    </ChatContainer>
  );
}
