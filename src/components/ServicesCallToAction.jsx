import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

const StyledIcon = styled(FontAwesomeIcon)``;

const StyledSection = styled.section`
  border-bottom: 2px solid white;
`;

function ServicesCallToAction() {
  return (
    <StyledSection className="services-call-to-action bg-dark text-white text-center py-5">
      <div class="container">
        <h2 class="mb-3">Ai nevoie de o reparație rapidă și sigură?</h2>
        <p class="mb-4 fs-5">
          Verifică prețurile estimative sau trimite direct o cerere de
          reparație. Suntem aici să te ajutăm!
        </p>

        <div class="d-flex flex-column flex-sm-row justify-content-center gap-3 mb-4">
          <a
            href="#"
            class="btn btn-outline-light px-4"
            data-bs-toggle="modal"
            data-bs-target="#repairPricesModal"
          >
            Prețuri Estimative
          </a>
          <button
            class="btn btn-primary px-4"
            data-bs-toggle="modal"
            data-bs-target="#formModal"
          >
            Cerere de reparație
          </button>
        </div>

        <div class="d-flex justify-content-center gap-4">
          <a
            href="https://www.instagram.com/fix_azi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            class="text-white fs-4"
            aria-label="Instagram"
          >
            <StyledIcon icon={faInstagram} />
          </a>

          <a
            href="https://www.facebook.com/FixAzi.GSM"
            target="_blank"
            class="text-white fs-4"
            aria-label="Instagram"
          >
            <StyledIcon icon={faFacebook} />
          </a>

          <a
            href="https://wa.me/40743352949"
            target="_blank"
            class="text-white fs-4"
            aria-label="WhatsApp"
          >
            <StyledIcon icon={faWhatsapp} />
          </a>
        </div>
      </div>
    </StyledSection>
  );
}

export default ServicesCallToAction;
