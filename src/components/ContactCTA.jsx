import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

// Styled components
const CallToActionSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  background-color: var(--bs-dark);
  border-bottom: 2px solid white;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h3`
  color: white;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: transform 0.2s ease;
`;

const ContactCTA = ({ onPriceClick }) => {
  return (
    <CallToActionSection className="contact-call-to-action">
      <TextContent className="text-content">
        <SectionTitle>Vrei să știi cât ar putea costa reparația?</SectionTitle>
        <Button
          variant="primary"
          data-bs-toggle="modal"
          data-bs-target="#repairPricesModal"
          className="btn-lg"
        >
          Vezi prețuri estimative
        </Button>
      </TextContent>

      <SocialLinks>
        <SocialIcon
          href="https://www.instagram.com/fix_azi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </SocialIcon>

        <SocialIcon
          href="https://www.facebook.com/FixAzi.GSM"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </SocialIcon>

        <SocialIcon
          href="https://wa.me/40743352949"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <FontAwesomeIcon icon={faWhatsapp} />
        </SocialIcon>
      </SocialLinks>
    </CallToActionSection>
  );
};

export default ContactCTA;
