import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styled from "styled-components";
import CreatedBy from "./CreatedBy";
import SideButtons from "./SideButtons";
import BottomNavigation from "./BottomNavigation";
import ChatWidget from "./ChatWidget";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex-grow: 1;
`;

function AppLayout({ children }) {
  const { pathname } = useLocation(); // Get current path
  const hideChatWidget = ["/login", "/admin"].includes(pathname);

  return (
    <LayoutWrapper>
      <Navbar />
      <Main className="bg-dark">{children}</Main>
      <Footer />
      <CreatedBy />
      <SideButtons />
      <BottomNavigation />
      {!hideChatWidget && <ChatWidget />}{" "}
      {/* Only show if not on /login or /admin */}
    </LayoutWrapper>
  );
}

export default AppLayout;
