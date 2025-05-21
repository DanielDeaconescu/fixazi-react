import styled from "styled-components";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";

const StyledSection = styled.section`
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function TooManyRequests() {
  return (
    <StyledSection>
      <div className="container text-center">
        <div className="card shadow-sm p-4">
          <div className="card-body">
            <div className="d-flex justify-content-center">
              <Logo />
            </div>
            <h1 className="card-title text-danger mb-3">Limită atinsă</h1>
            <p className="card-text fs-5 text-white">
              Din motive de securitate, limităm numărul de cereri care pot fi
              trimise într-o anumită perioadă de timp.
            </p>
            <p className="card-text fs-5 text-white">
              Vă rugăm să încercați din nou în decurs de 24 de ore.
            </p>
            <p className="card-text fs-5 text-white">
              Vă mulțumim pentru înțelegere!
            </p>
            <Link to="/" className="btn btn-primary mt-2">
              Înapoi la pagina principală
            </Link>
          </div>
        </div>
      </div>
    </StyledSection>
  );
}

export default TooManyRequests;
