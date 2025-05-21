import Logo from "../components/Logo";
import styled from "styled-components";

const StyledSection = styled.section`
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 576px) {
    height: 500px;
  }
`;

function Submitted() {
  return (
    <StyledSection className="bg-dark d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column align-items-center text-center p-4 bg-dark rounded shadow-lg">
        <Logo />
        <h1 className="mb-3 text-success">
          <i className="fa-solid fa-envelope-circle-check"></i>
          Cererea ta a fost trimisă!
        </h1>
        <p className="fs-5 text-white p-submitted">
          Am primit solicitarea dumneavoastră de reparație și vom reveni cu un
          răspuns cât mai curând posibil folosind metoda de contact selectată în
          formular. Vă mulțumim!
        </p>
        <a href="/" className="btn btn-primary mt-4">
          Înapoi la pagina principală
        </a>
      </div>
    </StyledSection>
  );
}

export default Submitted;
