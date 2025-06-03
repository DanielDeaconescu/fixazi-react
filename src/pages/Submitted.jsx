import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Logo from "../components/Logo";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

const StyledSection = styled.section`
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 576px) {
    height: 500px;
  }
`;

const StyledParagraph = styled.p`
  width: 70%;
`;

const StyledIcon = styled(FontAwesomeIcon)``;

function Submitted() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  return (
    <>
      <Helmet>
        <title>Fixazi | Cerere trimisă</title>
        <meta
          name="description"
          content="Mulțumim pentru solicitare! Vom analiza informațiile trimise și revenim cu un mesaj cât de curând. fixazi.com"
        />
      </Helmet>
      <StyledSection className="bg-dark d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column align-items-center text-center bg-dark rounded shadow-lg">
          {/* <Logo /> */}
          <h1 className="mb-3 text-success">
            <StyledIcon icon={faEnvelopeCircleCheck} className="me-2" />
            Cererea ta a fost trimisă!
          </h1>
          <StyledParagraph className="fs-5 text-white p-submitted">
            Am primit solicitarea dumneavoastră de reparație și vom reveni cu un
            răspuns cât mai curând posibil folosind metoda de contact selectată
            în formular. Vă mulțumim!
          </StyledParagraph>
          <a href="/" className="btn btn-primary mt-4">
            Înapoi la pagina principală
          </a>
        </div>
      </StyledSection>
    </>
  );
}

export default Submitted;
