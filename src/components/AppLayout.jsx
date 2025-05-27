import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styled from "styled-components";
import CreatedBy from "./CreatedBy";
import SideButtons from "./SideButtons";
import BottomNavigation from "./BottomNavigation";
import ChatWidget from "./ChatWidget";
import { useState } from "react";
import React from "react";
import { useChat } from "../contexts/ChatContext";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex-grow: 1;
`;

function AppLayout({ children }) {
  const { isChatOpen, toggleChat } = useChat();
  const { pathname } = useLocation();
  const hideChatWidget = ["/login", "/admin"].includes(pathname);

  return (
    <LayoutWrapper>
      <Navbar />
      <Main className="bg-dark">{children}</Main>
      <Footer />
      <CreatedBy />
      <SideButtons />
      {!hideChatWidget && <BottomNavigation />}
      {!hideChatWidget && <ChatWidget />}
    </LayoutWrapper>
  );
}

export default AppLayout;
