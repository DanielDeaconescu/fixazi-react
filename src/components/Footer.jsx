import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import RepairForm from "./RepairForm";
import LogoFixAzi from "../assets/images/fixazi_logo.jpg";
import TablePrices from "./TablePrices";

const StyledIcon = styled(FontAwesomeIcon)``;

const StyledLink = styled(Link)`
  color: rgb(75, 192, 231);
  text-decoration: underline;
`;

const StyledAnchor = styled.a`
  color: rgb(75, 192, 231);
  text-decoration: underline;
`;

const StyledFooter = styled.footer`
  @media (max-width: 576px) {
    padding: 3rem 0 !important;
    font-size: 1.25rem;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const FooterStyledParagraph = styled.p`
  /* font-size: 1.25rem; */
  text-align: justify;
  @media (min-width: 576px) and (max-width: 768px) {
    width: 75%;
  }
`;

const FooterNavigation = styled.li`
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const UsefulLinks = styled.ul`
  @media (max-width: 576px) {
    margin-bottom: 1rem !important;
  }
`;

function Footer() {
  return (
    <>
      <StyledFooter className="footer bg-secondary text-white py-6 footer-custom">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 my-3 d-flex flex-column align-items-start about-section-footer">
              <h5>
                Despre
                <img src="./images/fixazi_logo_nobg.png" width="250" alt="" />
              </h5>
              <FooterStyledParagraph>
                La FIXAZI, ne dedicăm reparației rapide și de calitate a
                dispozitivelor tale preferate. Indiferent dacă este vorba de un
                telefon, tabletă sau laptop, ne asigurăm că primești servicii
                profesionale, transparente și adaptate nevoilor tale.
              </FooterStyledParagraph>
            </div>

            <div className="col-lg-4 my-3 d-flex flex-column align-items-start">
              <h5>Link-uri utile</h5>
              <UsefulLinks className="list-unstyled">
                <li>
                  <StyledLink to="/cookies">Politica de Cookies </StyledLink>
                </li>
                <li>
                  <StyledAnchor
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#formModal"
                  >
                    Cerere de reparație
                  </StyledAnchor>
                </li>
                <li>
                  <StyledAnchor
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#repairPricesModal"
                  >
                    Vezi prețuri estimative
                  </StyledAnchor>
                </li>
              </UsefulLinks>
              <FooterNavigation className="footer-navigation d-flex gap-2">
                <div>Meniu de navigare:</div>
                <div className="d-flex gap-1">
                  <StyledLink to="/">
                    Acasă<span className="text-white">,</span>
                  </StyledLink>
                  <StyledLink to="/services">
                    Servicii
                    <span className="text-white">,</span>
                  </StyledLink>
                  <StyledLink to="/contact">Contact</StyledLink>
                </div>
              </FooterNavigation>
            </div>

            <div className="col-lg-4 my-3 d-flex flex-column align-items-start">
              <div className="mb-4">
                <h5>Rețele de socializare</h5>
                <a
                  href="https://www.instagram.com/fix_azi?utm_source=ig_web_button_share_sheet&amp;igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  className="text-decoration-none"
                >
                  <StyledIcon
                    icon={faInstagram}
                    className="fa-3x text-light mx-2"
                  />
                </a>
                <a
                  href="https://www.facebook.com/FixAzi.GSM"
                  target="_blank"
                  className="text-decoration-none"
                >
                  <StyledIcon
                    icon={faTiktok}
                    className="fa-3x text-light mx-2"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </StyledFooter>

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
              <RepairForm theme="light" />
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
              <p className="text-muted">
                <small>
                  <StyledIcon icon={faCircleInfo} />
                  Prețurile sunt estimative și pot varia în funcție de
                  diagnostic și de specificul situației.
                </small>
              </p>
              <TablePrices />
            </div>

            <div className="modal-footer bg-light">
              <button
                type="button"
                className="btn btn-secondary"
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

export default Footer;
