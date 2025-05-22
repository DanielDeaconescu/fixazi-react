import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faStopwatch,
  faShieldAlt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const StyledParagraph = styled.p`
  text-align: justify;
  max-width: 70%;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 4rem;
  color: hsl(195, 77%, 60%);
`;

const StyledValuesParagraph = styled.p`
  color: white;
  text-align: center;
`;

const StyledValuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function OurValues() {
  return (
    <section id="expertise" className="expertise bg-secondary py-5 text-white">
      <div className="container">
        <StyledValuesContainer className="mb-5 our-values-container">
          <h2 className="fw-bold text-center">Valorile noastre</h2>
          <StyledParagraph className="our-values-paragraph">
            La FIXAZI, nu ne concentrăm doar pe reparații rapide și eficiente,
            ci și pe modul în care ne raportăm la clienți, la calitatea muncii
            noastre și la comunitatea din care facem parte. Valorile de mai jos
            ne ghidează în fiecare interacțiune și în fiecare intervenție
            tehnică.
          </StyledParagraph>
        </StyledValuesContainer>

        <div className="row">
          {/* Transparență */}
          <div className="col-md-3">
            <div className="card bg-transparent border-0 text-center mb-3">
              <div className="card-image">
                <StyledIcon icon={faEye} />
              </div>
              <div className="card-body">
                <h4 className="card-title text-white">Transparență</h4>
                <StyledValuesParagraph className="our-values-p text-white">
                  Comunicăm clar și sincer fiecare etapă a procesului de
                  reparație, fără costuri ascunse.
                </StyledValuesParagraph>
              </div>
            </div>
          </div>

          {/* Promptitudine */}
          <div className="col-md-3">
            <div className="card bg-transparent border-0 text-center mb-3">
              <div className="card-image">
                <StyledIcon icon={faStopwatch} />
              </div>
              <div className="card-body">
                <h4 className="card-title text-white">Promptitudine</h4>
                <StyledValuesParagraph>
                  Ne angajăm să răspundem rapid cererilor și să oferim termene
                  realiste și respectate.
                </StyledValuesParagraph>
              </div>
            </div>
          </div>

          {/* Responsabilitate */}
          <div className="col-md-3">
            <div className="card bg-transparent border-0 text-center mb-3">
              <div className="card-image">
                <StyledIcon icon={faShieldAlt} />
              </div>
              <div className="card-body">
                <h4 className="card-title text-white">Responsabilitate</h4>
                <StyledValuesParagraph>
                  Tratăm fiecare dispozitiv ca și cum ar fi al nostru și oferim
                  garanție pentru serviciile prestate.
                </StyledValuesParagraph>
              </div>
            </div>
          </div>

          {/* Calitate */}
          <div className="col-md-3">
            <div className="card bg-transparent border-0 text-center mb-3">
              <div className="card-image">
                <StyledIcon icon={faStar} />
              </div>
              <div className="card-body">
                <h4 className="card-title text-white">Calitate</h4>
                <StyledValuesParagraph>
                  Folosim doar componente de încredere și respectăm standarde
                  tehnice riguroase în fiecare reparație.
                </StyledValuesParagraph>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurValues;
