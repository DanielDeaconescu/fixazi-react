import styled from "styled-components";
import contactBackgroundVideo from "../assets/videos/contact_header_background.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledHeader = styled.header`
  position: relative;
  overflow: hidden;
  height: 350px;
  display: flex;
  align-items: center;

  @media (max-width: 576px) {
    height: 280px;
  }
`;

const StyledVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;
`;

const StyledContent = styled.div`
  position: relative;
  color: white;
  text-align: center;
`;

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const ServicesParagraph = styled.p`
  max-width: 70%;

  @media (max-width: 576px) {
    max-width: 90%;
  }
`;

function HeaderServices() {
  return (
    <>
      <StyledHeader className="header position-relative video-background py-5">
        <div className="container">
          <StyledVideo autoPlay muted loop playsInline>
            <source src={contactBackgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </StyledVideo>
          <StyledOverlay className="overlay"></StyledOverlay>
          <StyledContent className="content">
            <div className="d-flex flex-column justify-content-center align-items-center content">
              <h1 className="display-5">Contactează-ne</h1>
              <ServicesParagraph className="lead">
                Completează formularul sau folosește datele de contact de mai
                jos.
              </ServicesParagraph>
            </div>
          </StyledContent>
        </div>
      </StyledHeader>
    </>
  );
}

export default HeaderServices;
