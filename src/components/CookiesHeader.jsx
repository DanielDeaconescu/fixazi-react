import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import cookiesHeaderImage from "../assets/images/cookies-header.jpg";

// Styled components
const HeaderSection = styled.header`
  text-align: center;
  padding: 4rem 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(${cookiesHeaderImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  color: white;
`;

const TextContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeaderTitle = styled.h1`
  color: white;
  margin-bottom: 1.5rem;
  font-weight: 700;
  font-size: 2.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const LeadText = styled.p`
  color: white;
  font-size: 1.25rem;
  line-height: 1.8;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CookiesHeader = () => {
  return (
    <HeaderSection className="header-section">
      <Container>
        <TextContainer className="text-container">
          <HeaderTitle>Politica de Cookies</HeaderTitle>
          <LeadText className="lead">
            Dorim să fim transparenți în legătură cu modul în care funcționează
            acest site și cu tehnologiile pe care le folosim. De aceea, această
            pagină vă oferă informații despre politica noastră privind fișierele
            cookie.
          </LeadText>
        </TextContainer>
      </Container>
    </HeaderSection>
  );
};

export default CookiesHeader;
