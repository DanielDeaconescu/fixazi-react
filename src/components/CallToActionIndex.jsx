import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const StyledCallToActionSection = styled.section`
  border-top: 2px solid white;
  border-bottom: 2px solid white;
`;

function CallToActionIndex() {
  return (
    <StyledCallToActionSection className="bg-dark text-white call-to-action-section text-center py-5">
      <div className="container">
        <h2 className="mb-3">Ai o problemă cu dispozitivul tău?</h2>
        <p className="lead mb-4 call-to-action-paragraph">
          Solicită o reparație de încredere - simplu și rapid!
        </p>

        {/* Link styled as button */}
        <a
          href="#"
          className="btn btn-primary btn-lg mb-4"
          data-bs-toggle="modal"
          data-bs-target="#formModal"
        >
          Trimite o cerere de reparație
        </a>

        {/* Social Media Icons */}
        <div className="d-flex justify-content-center gap-4">
          <a
            href="https://www.instagram.com/fix_azi?utm_source=ig_web_button_share_sheet&amp;igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-3"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://www.facebook.com/FixAzi.GSM"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-3"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </div>
      </div>
    </StyledCallToActionSection>
  );
}

export default CallToActionIndex;
