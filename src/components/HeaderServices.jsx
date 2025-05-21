import styled from "styled-components";
import servicesBackgroundVideo from "../assets/videos/services_hero_section.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faSquareCheck,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import RepairForm from "./RepairForm";
import LogoFixAzi from "../assets/images/fixazi_logo.jpg";
import TablePrices from "./TablePrices";

const StyledHeader = styled.header`
  position: relative;
  overflow: hidden;
  /* height: 600px; */
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

const StyledList = styled.ul`
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`;

const ServicesParagraph = styled.p`
  max-width: 70%;
`;

function HeaderServices() {
  return (
    <>
      <StyledHeader className="header position-relative video-background py-5">
        <div className="container">
          <StyledVideo autoPlay muted loop playsInline>
            <source src={servicesBackgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </StyledVideo>
          <StyledOverlay className="overlay"></StyledOverlay>
          <StyledContent className="content">
            <div className="d-flex flex-column justify-content-center align-items-center content">
              <h1 className="display-4 fw-bold mb-3">Serviciile Noastre</h1>
              <ServicesParagraph className="lead mb-4">
                Oferim reparații rapide și de încredere pentru telefoane și
                tablete. Descoperă ce putem face pentru dispozitivul tău și
                consultă lista noastră cu prețuri estimative pentru cele mai
                frecvente probleme.
              </ServicesParagraph>

              <a
                className="btn btn-primary btn-lg"
                data-bs-toggle="modal"
                data-bs-target="#repairPricesModal"
              >
                Vezi prețuri estimative
              </a>
            </div>
          </StyledContent>
        </div>
      </StyledHeader>

      {/* Repair Prices Modal */}
      <div
        className="modal fade"
        id="repairPricesModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h5 className="modal-title" id="exampleModalLabel">
                <img
                  src={LogoFixAzi}
                  width="200"
                  alt="logo fixazi reparatii telefoane"
                />
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-light">
              <h4>Prețuri Estimative pentru Reparații</h4>
              <p class="text-muted">
                <small>
                  <StyledIcon icon={faCircleInfo} />
                  Prețurile sunt estimative și pot varia în funcție de
                  diagnostic și de specificul situației.
                </small>
              </p>
              <TablePrices />
            </div>

            <div class="modal-footer bg-light">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Închide
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderServices;
