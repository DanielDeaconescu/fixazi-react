import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledCookiePopup = styled.div`
  background-color: black;
  z-index: 1050;
  padding: 2rem 0.5rem;
  @media (max-width: 576px) {
    font-size: 0.85rem;
  }
`;

const StyledOkButton = styled.button`
  @media (max-width: 576px) {
    padding: 0.75rem !important;
  }
`;

const StyledLinkFindOutMore = styled(Link)`
  @media (max-width: 576px) {
    padding: 0.75rem 1rem !important;
  }
`;

const StyledLink = styled(Link)`
  color: #66c9ea;
`;

const CookiesPopup = () => {
  const [showBanner, setShowBanner] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");

    // Don't show on cookies page or if already accepted
    if (!cookiesAccepted && pathname !== "/cookies.html") {
      setShowBanner(true);
    }
  }, [pathname]);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <StyledCookiePopup id="cookie-banner" className="fixed-bottom text-white">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="d-flex flex-column align-items-start gap-1">
          <div>
            <p className="mb-2 mb-md-0 cookie-banner-p">
              Acest site nu folosește cookies în prezent. Dacă vom implementa
              cookies, ne vom asigura că vă informăm.
            </p>
          </div>

          <div>
            <p className="mb-2 mb-md-0 cookie-banner-p">
              Vă recomandăm să verificați periodic pagina{" "}
              <StyledLink to="/cookies">fixazi.com/cookies</StyledLink> pentru
              update-uri.
            </p>
          </div>
        </div>

        <div className="d-flex gap-2">
          <StyledOkButton
            id="accept-cookies"
            className="btn btn-primary btn-sm"
            onClick={handleAccept}
          >
            Ok
          </StyledOkButton>
          <StyledLinkFindOutMore
            to="/cookies"
            className="btn btn-outline-light btn-sm more-about-cookies"
          >
            Află mai multe despre cookies
          </StyledLinkFindOutMore>
        </div>
      </div>
    </StyledCookiePopup>
  );
};

export default CookiesPopup;
