import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import styled from "styled-components";
import navbarLogo from "../assets/images/fixazi_logo_nobg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";

const CustomNavigation = styled(BootstrapNavbar)`
  height: 80px;
  padding: 0;
  background-color: rgb(0, 0, 0);
  position: relative;
  z-index: 1030;
  border-bottom: 2px solid white;

  @media (max-width: 768px) {
    height: unset;
    padding: 0.75rem 0;
    border-bottom: none; /* Remove border from main nav on mobile */
  }
`;

const StyledLink = styled(Link)`
  color: white;
  padding: 0.5rem 1rem;
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;

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

const WhiteNavbarToggle = styled(BootstrapNavbar.Toggle)`
  border-color: white;

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  }

  &:focus {
    box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
  }
`;

const StyledBootstrapCollapse = styled(BootstrapNavbar.Collapse)`
  height: 100%;
  @media (max-width: 768px) {
    background-color: rgb(0, 0, 0);
    padding: 1rem;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    border-bottom: 2px solid white;
    /* Animation for smoother expand/collapse */
    transition: all 0.3s ease;
    max-height: ${(props) => (props.expanded ? "500px" : "0")};
    overflow: hidden;
    visibility: ${(props) => (props.expanded ? "visible" : "hidden")};
    opacity: ${(props) => (props.expanded ? "1" : "0")};
  }
`;

const StyledNavItem = styled(Nav.Item)`
  @media (max-width: 576px) {
    margin-top: 0.5rem;
  }
`;

const StyledNavItemRegular = styled(Nav.Item)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledNav = styled(Nav)`
  height: 100%;
  &.ms-auto {
    @media (max-width: 576px) {
      margin-left: 0;
      display: flex;
      align-items: flex-start !important;
    }
  }
`;

const StyledContainer = styled(Container)`
  height: 100%;
`;

function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggleRef.current && toggleRef.current.contains(event.target)) {
        return;
      }

      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    if (expanded) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [expanded]);

  return (
    <CustomNavigation
      ref={navbarRef}
      expand="md"
      fixed="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <StyledContainer>
        <BootstrapNavbar.Brand href="#">
          <img src={navbarLogo} alt="" width="250" />
        </BootstrapNavbar.Brand>

        <WhiteNavbarToggle
          ref={toggleRef}
          aria-controls="navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />

        <StyledBootstrapCollapse id="navbar-nav" expanded={expanded}>
          <StyledNav className="ms-auto align-items-center">
            <StyledNavItemRegular>
              <StyledLink to="/" onClick={() => setExpanded(false)}>
                Acasă
              </StyledLink>
            </StyledNavItemRegular>

            <StyledNavItemRegular>
              <StyledLink to="/services" onClick={() => setExpanded(false)}>
                Servicii
              </StyledLink>
            </StyledNavItemRegular>

            <StyledNavItemRegular>
              <StyledLink to="/contact" onClick={() => setExpanded(false)}>
                Contact
              </StyledLink>
            </StyledNavItemRegular>

            <StyledNavItem className="ms-2 d-flex">
              <a
                href="https://www.instagram.com/fix_azi?utm_source=ig_web_button_share_sheet&amp;igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noreferrer"
              >
                <IconStack>
                  <StackedIcon icon={faCircle} />
                  <TopIcon icon={faInstagram} />
                </IconStack>
              </a>

              <a
                href="https://www.facebook.com/FixAzi.GSM"
                target="_blank"
                rel="noreferrer"
              >
                <IconStack>
                  <StackedIcon icon={faCircle} />
                  <TopIcon icon={faFacebook} />
                </IconStack>
              </a>
            </StyledNavItem>
          </StyledNav>
        </StyledBootstrapCollapse>
      </StyledContainer>
    </CustomNavigation>
  );
}

export default Navbar;
