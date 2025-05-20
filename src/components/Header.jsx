import styled from "styled-components";
import indexBackgroundVideo from "../assets/videos/video_header_background.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";

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

function Header() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (showModal && modalRef.current) {
      const bsModal = new Modal(modalRef.current);
      bsModal.show();

      // Optional: cleanup
      return () => bsModal.hide();
    }
  }, [showModal]);

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
                <button
                  className="btn btn-primary text-white index-header-contact"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <StyledIcon icon={faMessage} />
                  Contact
                </button>
                <a
                  href="#"
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

      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          ref={modalRef}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <img
                    src="./images/fixazi_logo.jpg"
                    width="200"
                    alt="logo fixazi reparatii telefoane"
                  />
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form
                  className="text-dark repairForm"
                  action="/api/sendRepairRequest"
                  method="POST"
                  encType="multipart/form-data"
                  noValidate
                >
                  {/* All your form content here... */}
                  <h4>Cerere de reparație</h4>
                  {/* etc. */}
                  <button type="submit" className="btn btn-primary">
                    Trimite cererea
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
