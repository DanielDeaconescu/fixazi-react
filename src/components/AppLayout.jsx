// components/AppLayout.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";
import styled from "styled-components";
import CreatedBy from "./CreatedBy";
import SideButtons from "./SideButtons";
import BottomNavigation from "./BottomNavigation";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* min-height: 100vh; */
`;

const Main = styled.main`
  flex-grow: 1;
`;

function AppLayout({ children }) {
  return (
    <LayoutWrapper>
      <Navbar />
      <Main className="bg-dark">{children}</Main>
      <Footer />
      <CreatedBy />
      <SideButtons />
      <BottomNavigation />
    </LayoutWrapper>
  );
}

export default AppLayout;
