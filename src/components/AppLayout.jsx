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
import CookiesPopup from "./CookiesPopup";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
`;

const Main = styled.main`
  flex-grow: 1;
  padding-bottom: 60px; // Add padding to prevent content being hidden behind the cookie banner
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
      {!hideChatWidget && <SideButtons />}
      {!hideChatWidget && <BottomNavigation />}
      {!hideChatWidget && <ChatWidget />}
      <CookiesPopup />
    </LayoutWrapper>
  );
}

export default AppLayout;
