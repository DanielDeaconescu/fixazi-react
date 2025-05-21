import { Link } from "react-router-dom";
import styled from "styled-components";
import navbarLogo from "../assets/images/fixazi_logo_nobg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";

const CustomNavigation = styled.nav`
  border-bottom: 2px solid white;
  height: 80px;
  padding: 0;
  background-color: rgb(0, 0, 0);

  @media (max-width: 576px) {
    height: unset;
    padding: 0.75rem 0;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  &:hover {
    background-color: white;
    color: #000;
  }
`;

const IconStack = styled.span`
  position: relative;
  width: 2em;
  height: 2em;
  margin-right: 0.5em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const StackedIcon = styled(FontAwesomeIcon)`
  position: absolute;
  font-size: 2em;
  color: hsl(195, 77%, 60%);
`;

const TopIcon = styled(FontAwesomeIcon)`
  position: relative;
  font-size: 1.2em;
  color: white;
  z-index: 1;
`;

function Navbar() {
  return (
    <CustomNavigation className="navbar navbar-expand-md sticky-top fixed-top navbar-dark navbar-custom">
      <div className="container h-100">
        <a className="navbar-brand" href="#">
          <img src={navbarLogo} alt="" width="250" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse h-100" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto h-100">
            <li className="nav-item d-flex align-items-center">
              <StyledLink
                to="/"
                className="nav-link nav-link-custom h-100 d-flex align-items-center"
                aria-current="page"
              >
                Acasă
              </StyledLink>
            </li>
            <li className="nav-item d-flex align-items-center">
              <StyledLink
                className="nav-link nav-link-custom h-100 d-flex align-items-center"
                to="/services"
              >
                Servicii
              </StyledLink>
            </li>
            <li className="nav-item d-flex align-items-center">
              <StyledLink
                className="nav-link nav-link-custom h-100 d-flex align-items-center"
                to="/contact"
              >
                Contact
              </StyledLink>
            </li>
          </ul>
          <span className="nav-item d-flex align-items-center ms-2">
            <a
              href="https://www.facebook.com/FixAzi.GSM"
              target="_blank"
              rel="noreferrer"
            >
              <IconStack>
                <StackedIcon icon={faCircle} />
                <TopIcon icon={faInstagram} />
              </IconStack>
            </a>

            <a
              href="https://www.instagram.com/fix_azi?utm_source=ig_web_button_share_sheet&amp;igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noreferrer"
            >
              <IconStack>
                <StackedIcon icon={faCircle} />
                <TopIcon icon={faFacebook} />
              </IconStack>
            </a>
          </span>
        </div>
      </div>
    </CustomNavigation>
  );
}

export default Navbar;
