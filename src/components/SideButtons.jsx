import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { faSquareWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";

// Styled Components
const SideButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: fixed;
  right: 20px;
  bottom: 35%;
  z-index: 1000;
`;

const ButtonContainer = styled.div`
  display: flex;
  background-color: #f8f9fa;
  cursor: pointer;
  border-radius: 0.25rem;
  padding: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
  justify-content: flex-end;
  min-width: ${(props) => (props.isHovered ? "auto" : "48px")};
  align-items: center;
`;

const ButtonLabel = styled.div`
  position: absolute;
  right: 94%;
  white-space: nowrap;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.show ? 1 : 0)};
  pointer-events: none;
  transform: translateY(-50%);
  top: 50%;
  background-color: #f8f9fa;
  padding: 0.8rem;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
`;

const ButtonLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: ${(props) => props.color};
  width: 32px;
  height: 32px;
`;

const SideButtons = () => {
  const isDesktop = useMediaQuery({ minWidth: 576 });
  const [showFormLabel, setShowFormLabel] = useState(false);
  const [showWhatsappLabel, setShowWhatsappLabel] = useState(false);

  const { pathname } = useLocation();
  const hideFormButton = ["/repairRequest"].includes(pathname);

  return (
    <SideButtonsContainer>
      {!hideFormButton && (
        <ButtonContainer
          isHovered={showFormLabel}
          onMouseEnter={() => setShowFormLabel(true)}
          onMouseLeave={() => setShowFormLabel(false)}
        >
          {isDesktop && (
            <ButtonLabel show={showFormLabel}>Cerere de reparație</ButtonLabel>
          )}
          <ButtonLink
            color="hsl(195, 77%, 60%)"
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#formModal"
            aria-label="Cerere de reparație"
          >
            <FontAwesomeIcon icon={faSquarePen} size="2x" />
          </ButtonLink>
        </ButtonContainer>
      )}

      <ButtonContainer
        isHovered={showWhatsappLabel}
        onMouseEnter={() => setShowWhatsappLabel(true)}
        onMouseLeave={() => setShowWhatsappLabel(false)}
      >
        {isDesktop && (
          <ButtonLabel show={showWhatsappLabel}>
            Scrie-ne pe WhatsApp
          </ButtonLabel>
        )}
        <ButtonLink
          color="hsl(173, 86%, 20%)"
          href="https://wa.me/40743352949"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Scrie-ne pe WhatsApp"
        >
          <FontAwesomeIcon icon={faSquareWhatsapp} size="2x" />
        </ButtonLink>
      </ButtonContainer>
    </SideButtonsContainer>
  );
};

export default SideButtons;
