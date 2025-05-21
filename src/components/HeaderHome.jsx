import styled from "styled-components";
import indexBackgroundVideo from "../assets/videos/video_header_background.mp4";
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
  height: 600px;
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

function HeaderHome() {
  return (
    <>
      <StyledHeader className="header position-relative video-background">
        <div className="container">
          <StyledVideo autoPlay muted loop playsInline>
            <source src={indexBackgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </StyledVideo>
          <StyledOverlay className="overlay"></StyledOverlay>
          <StyledContent className="content">
            <div className="pt-5 d-flex flex-column align-items-start repair-services-container">
              <h1 className="mt-5 d-flex flex-column header-title subtitle-custom">
                Servicii de reparații
                <span className="text-primary fw-bold">
                  rapide și calitative
                </span>
              </h1>
              <p className="lead">Servicii de reparații</p>
              <StyledList className="d-flex flex-column list-unstyled p-0 header-list-custom">
                <li>
                  <StyledIcon icon={faSquareCheck} />
                  Telefoane
                </li>
                <li>
                  <StyledIcon icon={faSquareCheck} />
                  Tablete
                </li>
                <li>
                  <StyledIcon icon={faSquareCheck} />
                  Laptop-uri
                </li>
              </StyledList>
              <div className="index-header-buttons d-flex gap-3">
                <a
                  href="#"
                  className="btn btn-primary index-header-prices text-white"
                  data-bs-toggle="modal"
                  data-bs-target="#formModal"
                >
                  <StyledIcon icon={faMessage} />
                  Contact
                </a>
                <a
                  className="btn btn-secondary index-header-prices"
                  data-bs-toggle="modal"
                  data-bs-target="#repairPricesModal"
                >
                  Vezi prețuri estimative
                </a>
              </div>
            </div>
          </StyledContent>
        </div>
      </StyledHeader>

      {/* Repair Form */}
      <div
        className="modal fade"
        id="formModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
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
              <RepairForm />
            </div>
          </div>
        </div>
      </div>

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

export default HeaderHome;
