import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faClock,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import { useChat } from "../contexts/ChatContext";

const BottomNavContainer = styled.nav`
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1020;

  @media (min-width: 576px) {
    display: none;
  }
`;

const NavContent = styled(Container)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 0;
`;

const ActionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-width: 80px;
  background-color: rgb(75, 192, 231);
  color: white;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ActionButtonChatLive = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-width: 80px;
  background-color: #3b82f6;
  color: white;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 0.25rem;
`;

const ButtonText = styled.small`
  font-size: 0.75rem;
`;

const PhoneLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-width: 80px;
  background-color: #198754;
  color: white;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    color: white;
  }

  &:active {
    transform: translateY(0);
  }
`;

const ScheduleBox = styled.div`
  background-color: white;
  border-top: 1px solid #dee2e6;
  padding: 1rem;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 82px;
  left: 0;
  right: 0;
  z-index: 1019;
  display: ${(props) => (props.show ? "block" : "none")};

  @media (min-width: 576px) {
    display: none;
  }
`;

const ScheduleList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
  font-size: 0.875rem;

  li {
    margin-bottom: 0.25rem;
  }

  strong {
    font-weight: 600;
  }
`;

function BottomNavigation() {
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleText, setScheduleText] = useState("Vezi Program");
  const { toggleChat, isChatOpen } = useChat();

  const handleScheduleClick = () => {
    const willShow = !showSchedule;
    setShowSchedule(willShow);
    setScheduleText(willShow ? "Închide" : "Vezi Program");
  };

  return (
    <>
      {/* Schedule Box */}
      <ScheduleBox show={showSchedule}>
        <ScheduleList>
          <li>
            <strong>Luni:</strong> 09:00 – 18:00
          </li>
          <li>
            <strong>Marți:</strong> 09:00 – 18:00
          </li>
          <li>
            <strong>Miercuri:</strong> 09:00 – 18:00
          </li>
          <li>
            <strong>Joi:</strong> 09:00 – 18:00
          </li>
          <li>
            <strong>Vineri:</strong> 09:00 – 18:00
          </li>
          <li>
            <strong>Sâmbătă:</strong> 09:00 - 14:00
          </li>
          <li>
            <strong>Duminică:</strong> Închis
          </li>
        </ScheduleList>
      </ScheduleBox>

      {/* Bottom Navigation Bar */}
      <BottomNavContainer className="d-block d-sm-none">
        <NavContent>
          {/* Call button */}
          <PhoneLink href="tel:+40743352949">
            <IconWrapper>
              <FontAwesomeIcon icon={faPhone} size="lg" />
            </IconWrapper>
            <ButtonText>Sună</ButtonText>
          </PhoneLink>

          <ActionButtonChatLive onClick={toggleChat}>
            <IconWrapper>
              <FontAwesomeIcon icon={faComments} size="lg" />
            </IconWrapper>
            <ButtonText>
              {isChatOpen ? "Închide Chatul" : "Chat Live"}
            </ButtonText>
          </ActionButtonChatLive>

          {/* Schedule toggle button */}
          <ActionButton variant="primary" onClick={handleScheduleClick}>
            <IconWrapper>
              <FontAwesomeIcon icon={faClock} size="lg" />
            </IconWrapper>
            <ButtonText>{scheduleText}</ButtonText>
          </ActionButton>
        </NavContent>
      </BottomNavContainer>
    </>
  );
}

export default BottomNavigation;
