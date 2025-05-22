import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

// Styled components
const PolicyContainer = styled.div`
  /* background-color: ${(props) => props.theme.light}; */
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  margin-bottom: 2rem;
`;

const PolicyParagraph = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.7;
  color: black;
`;

const PolicyList = styled.ol`
  counter-reset: item;
  padding-left: 1.5rem;
  margin-top: 2rem;
`;

const PolicyListItem = styled.li`
  margin-bottom: 2rem;
  &::marker {
    font-weight: bold;
    color: var(--bs-primary);
  }
`;

const PolicyListTitle = styled.strong`
  display: block;
  margin-bottom: 0.75rem;
  color: black;
  font-size: 1.1rem;
`;

const CookiesInfo = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={9}>
          <PolicyContainer>
            <div className="d-flex flex-column">
              <PolicyParagraph>
                Acest site nu utilizează cookies pentru a colecta sau stoca
                informații personale despre vizitatori.
              </PolicyParagraph>
              <PolicyParagraph>
                În prezent, nu utilizăm tehnologii de tracking pentru a urmări
                activitatea utilizatorilor sau pentru a personaliza conținutul.
              </PolicyParagraph>
              <PolicyParagraph>
                În cazul în care vom implementa cookies pe acest site în viitor,
                vom actualiza această politică și vom anunța utilizatorii în mod
                corespunzător.
              </PolicyParagraph>
            </div>

            <PolicyList>
              <PolicyListItem>
                <PolicyListTitle>1. Ce sunt cookie-urile?</PolicyListTitle>
                <PolicyParagraph>
                  Cookie-urile (sau cookies) sunt fișiere mici care sunt stocate
                  pe dispozitivul utilizatorului atunci când acesta vizitează un
                  site web. De obicei, acestea sunt folosite pentru a păstra
                  informații care pot îmbunătăți experiența utilizatorului pe
                  site, cum ar fi preferințele sau setările anterioare.
                </PolicyParagraph>
              </PolicyListItem>

              <PolicyListItem>
                <PolicyListTitle>
                  2. De ce sunt importante cookie-urile?
                </PolicyListTitle>
                <PolicyParagraph>
                  Cookie-urile ajută la crearea unei experiențe mai
                  personalizate pentru utilizatori, fiind utilizate pentru a
                  salva sesiuni, preferințe de limbă sau pentru a menține un
                  site funcțional.
                </PolicyParagraph>
              </PolicyListItem>

              <PolicyListItem>
                <PolicyListTitle>
                  3. Ce facem dacă vom implementa cookie-uri?
                </PolicyListTitle>
                <PolicyParagraph>
                  În cazul în care vom implementa cookies în viitor, vă vom
                  informa printr-un pop-up pe site-ul nostru, iar politica de
                  cookies va fi actualizată pentru a reflecta acest lucru.
                </PolicyParagraph>
              </PolicyListItem>
            </PolicyList>
          </PolicyContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default CookiesInfo;
