import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileAlt,
  faTabletAlt,
  faLaptop,
  faShieldAlt,
  faSyncAlt,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";

const StyledSection = styled.section`
  border-top: 2px solid white;
  border-bottom: 2px solid white;

  @media (max-width: 576px) {
    padding: 1.5rem 0 !important;
    font-size: 1.25rem;
  }
`;

const StyledCard = styled.div`
  padding: 0 2rem;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: hsl(195, 77%, 60%);
`;

const StyledParagraph = styled.p`
  max-width: 70%;

  @media (max-width: 576px) {
    max-width: 80%;

    margin-bottom: 1.5rem !important;
  }
`;

const StyledSubsection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.h2`
  @media (max-width: 576px) {
    font-size: 2rem;
  }
`;

function ServicesOurServices() {
  return (
    <StyledSection className="py-5">
      <div className="container">
        <StyledSubsection className="our-services-subsection">
          <StyledTitle className="text-center mb-4 text-white">
            Serviciile Noastre
          </StyledTitle>
          <StyledParagraph className="text-center mb-5 text-white our-services-subsection-p">
            Oferim o gamă variată de servicii de reparații pentru dispozitivele
            tale. Fie că este vorba de un telefon spart, o tabletă care nu mai
            pornește sau un laptop lent, suntem aici să te ajutăm.
          </StyledParagraph>
        </StyledSubsection>

        <div className="row g-4">
          <div className="col-md-4">
            <StyledCard className="card h-100 shadow-sm bg-light">
              <div className="card-body text-center">
                <StyledIcon icon={faMobileAlt} size="2x" className="mb-3" />
                <h5 className="card-title fw-bold">Reparații telefoane</h5>
                <p className="card-text">
                  Înlocuire ecran, baterie, port de încărcare, reparații
                  software și multe altele.
                </p>
              </div>
            </StyledCard>
          </div>

          <div className="col-md-4">
            <StyledCard className="card h-100 shadow-sm bg-light">
              <div className="card-body text-center">
                <StyledIcon icon={faTabletAlt} size="2x" className="mb-3" />
                <h5 className="card-title fw-bold">Reparații tablete</h5>
                <p className="card-text">
                  Rezolvăm probleme hardware și software, pentru toate mărcile
                  populare.
                </p>
              </div>
            </StyledCard>
          </div>

          <div className="col-md-4">
            <StyledCard className="card h-100 shadow-sm bg-light">
              <div className="card-body text-center">
                <StyledIcon icon={faLaptop} size="2x" className="mb-3" />
                <h5 className="card-title fw-bold">Reparații laptopuri</h5>
                <p className="card-text">
                  Curățare internă, upgrade SSD/RAM, reinstalare sistem,
                  reparații placă de bază.
                </p>
              </div>
            </StyledCard>
          </div>

          <div className="col-md-4">
            <StyledCard className="card h-100 shadow-sm bg-light">
              <div className="card-body text-center">
                <StyledIcon icon={faShieldAlt} size="2x" className="mb-3" />
                <h5 className="card-title fw-bold">Diagnosticare gratuită</h5>
                <p className="card-text">
                  Îți oferim o evaluare gratuită a defectului înainte de orice
                  intervenție.
                </p>
              </div>
            </StyledCard>
          </div>

          <div className="col-md-4">
            <StyledCard className="card h-100 shadow-sm bg-light">
              <div className="card-body text-center">
                <StyledIcon icon={faSyncAlt} size="2x" className="mb-3" />
                <h5 className="card-title fw-bold">Recuperare date</h5>
                <p className="card-text">
                  Recuperăm date pierdute de pe dispozitive defecte, carduri SD
                  sau hard disk-uri.
                </p>
              </div>
            </StyledCard>
          </div>

          <div className="col-md-4">
            <StyledCard className="card h-100 shadow-sm bg-light">
              <div className="card-body text-center">
                <StyledIcon icon={faCogs} size="2x" className="mb-3" />
                <h5 className="card-title fw-bold">Servicii personalizate</h5>
                <p className="card-text">
                  Contactează-ne pentru soluții adaptate nevoilor tale
                  specifice.
                </p>
              </div>
            </StyledCard>
          </div>
        </div>
      </div>
    </StyledSection>
  );
}

export default ServicesOurServices;
