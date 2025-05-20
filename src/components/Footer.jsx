import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledIcon = styled(FontAwesomeIcon)``;

const StyledLink = styled(Link)`
  color: rgb(75, 192, 231);
  text-decoration: underline;
`;

function Footer() {
  return (
    <footer class="footer bg-secondary text-white py-6 footer-custom">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 my-3 d-flex flex-column align-items-start about-section-footer">
            <h5>
              Despre
              <img src="./images/fixazi_logo_nobg.png" width="250" alt="" />
            </h5>
            <p>
              La FIXAZI, ne dedicăm reparației rapide și de calitate a
              dispozitivelor tale preferate. Indiferent dacă este vorba de un
              telefon, tabletă sau laptop, ne asigurăm că primești servicii
              profesionale, transparente și adaptate nevoilor tale.
            </p>
          </div>

          <div class="col-lg-4 my-3 d-flex flex-column align-items-start">
            <h5>Link-uri utile</h5>
            <ul class="list-unstyled">
              <li>
                <StyledLink to="/cookies">Politica de Cookies </StyledLink>
              </li>
              <li>
                <a href="#" data-bs-toggle="modal" data-bs-target="#formModal">
                  Cerere de reparație
                </a>
              </li>
              <li>
                <a
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#repairPricesModal"
                >
                  Vezi prețuri estimative
                </a>
              </li>
              <li class="footer-navigation d-flex gap-2">
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
              </li>
            </ul>
          </div>

          <div class="col-lg-4 my-3 d-flex flex-column align-items-start">
            <div class="mb-4">
              <h5>Rețele de socializare</h5>
              <a href="#" class="text-decoration-none">
                <StyledIcon
                  icon={faInstagram}
                  className="fa-3x text-light mx-2"
                />
              </a>
              <a href="#" class="text-decoration-none">
                <StyledIcon icon={faTiktok} className="fa-3x text-light mx-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
