import styled from "styled-components";
import indexBackgroundVideo from "../assets/videos/video_header_background.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import ContactForm from "./ContactForm";
import LogoFixAzi from "../assets/images/fixazi_logo.jpg";
import { useState } from "react";

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

const StyledLoadingSpinner = styled.span`
  display: none;
`;

function Header() {
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFileName(file ? file.name : "");
  };

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
              <form
                className="text-dark repairForm bg-light"
                action="/api/sendRepairRequest"
                method="POST"
                encType="multipart/form-data"
                noValidate
              >
                <h4>Cerere de reparație</h4>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Nume complet
                  </label>
                  <input
                    type="text"
                    className="form-control bg-light"
                    id="fullName"
                    name="fullName"
                    placeholder="Ex: Andrei Popescu"
                  />
                  <div
                    className="text-danger small mt-1"
                    id="fullNameError"
                  ></div>
                </div>

                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Număr de telefon
                  </label>
                  <input
                    type="tel"
                    className="form-control bg-light"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Ex: 07xxxxxxxx"
                  />
                  <div className="text-danger small mt-1" id="phoneError"></div>
                </div>

                <div className="mb-3">
                  <label htmlFor="emailAddress" className="form-label">
                    Adresă de email
                  </label>
                  <input
                    type="email"
                    className="form-control bg-light"
                    id="emailAddress"
                    name="emailAddress"
                    placeholder="Ex: exemplu@email.com"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="deviceType" className="form-label">
                    Tip dispozitiv
                  </label>
                  <select
                    className="form-select bg-light"
                    id="deviceType"
                    name="deviceType"
                  >
                    <option defaultValue={"test"} disabled>
                      Alege un dispozitiv
                    </option>
                    <option value="telefon">Telefon</option>
                    <option value="tableta">Tabletă</option>
                    <option value="laptop">Laptop</option>
                    <option value="gps">GPS</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="brandModel" className="form-label">
                    Marcă și model
                  </label>
                  <input
                    type="text"
                    className="form-control bg-light"
                    id="brandModel"
                    name="brandModel"
                    placeholder="Ex: Samsung Galaxy S21"
                  />
                </div>

                <div className="custom-file-upload mb-3 bg-light">
                  <label
                    className="custom-file-label"
                    htmlFor="repairFileInput"
                  >
                    Atașează o imagine (opțional)
                  </label>
                  <input
                    id="repairFileInput"
                    className="file-upload"
                    name="file"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <span className="file-name">
                    {selectedFileName || "Niciun fișier selectat"}
                  </span>
                  <div id="fileError" className="text-danger"></div>
                </div>

                <div className="mb-3 bg-light">
                  <label htmlFor="problemDescription" className="form-label">
                    Descrierea problemei
                  </label>
                  <textarea
                    className="form-control bg-light"
                    id="problemDescription"
                    name="problemDescription"
                    rows="3"
                    placeholder="Scrie aici ce problemă are dispozitivul..."
                  ></textarea>
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input bg-light"
                    type="checkbox"
                    id="acceptContact"
                    name="acceptContact"
                  />
                  <label className="form-check-label" htmlFor="acceptContact">
                    Sunt de acord să fiu contactat(ă) cu privire la această
                    cerere.
                  </label>
                </div>

                <div
                  className="mb-3 transition-collapse collapsed bg-light"
                  id="preferredContactGroup"
                >
                  <label htmlFor="preferredContact" className="form-label">
                    Cum preferi să fii contactat(ă)?
                  </label>
                  <select
                    className="form-select bg-light"
                    id="preferredContact"
                    name="preferredContact"
                  >
                    <option value="Telefon">Telefon</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Email">Email</option>
                    <option value="SMS">SMS</option>
                  </select>
                </div>

                <div
                  className="cf-turnstile d-flex justify-content-center mb-3"
                  data-sitekey="0x4AAAAAABdALOY-DswhxzbS"
                ></div>
                <button
                  id="submitBtn"
                  type="submit"
                  className="btn btn-primary"
                >
                  <StyledLoadingSpinner
                    id="loadingSpinner"
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></StyledLoadingSpinner>
                  <span id="submitText">Trimite cererea</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
