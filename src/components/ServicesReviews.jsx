import React from "react";
import styled from "styled-components";
import { Container, Row, Col, Card } from "react-bootstrap";

// Styled components
const ReviewsSection = styled.section`
  padding: 3rem 0;
  background-color: var(--bs-dark); // Or your specific background color
  border-top: 2px solid white;
  border-bottom: 2px solid white;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
  color: white;
`;

const ReviewCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
`;

const CardBody = styled(Card.Body)`
  display: flex;
  flex-direction: column;
`;

const ReviewText = styled.p`
  margin-bottom: 1rem;
  color: black;
`;

const StarRating = styled.div`
  color: #ffc107; // Bootstrap's warning color
  margin-bottom: 0.5rem;
`;

const ReviewBadge = styled.span`
  background-color: #f8f9fa;
  color: #6c757d;
`;

const CardFooter = styled(Card.Footer)`
  background-color: transparent;
  border: 0;
  text-align: right;
  margin-top: auto;
`;

const ReviewerName = styled.small`
  color: #6c757d;
`;

const ServicesReviews = () => {
  const testimonials = [
    {
      id: 1,
      text: "„Băiatul este foarte priceput și rezolvă rapid reparațiile. Mie mi-a înlocuit un display în 15 min. Telefonul funcționează excelent, iar prețul mi s-a parut mai mult decât rezonabil. Recomand cu încredere!”",
      rating: "★★★★★",
      name: "Alina Beșleagă",
    },
    {
      id: 2,
      text: "„Multumesc pentru ajutor.🤳 Mi-a rezolvat problema foarte rapid și a răspuns la toate întrebările mele, explicându-mi clar fiecare pas al procesului de reparație, lucru pe care nu l-am intalnit la alte service-uri.”",
      rating: "★★★★★",
      name: "S. I.Parvan",
    },
    {
      id: 3,
      text: "„Totul perfect, profesionalism si preturi ok pentru serviciile prestate.”",
      rating: "★★★★★",
      name: "Marian",
    },
    {
      id: 4,
      text: "„Un baiat extrem de serios si de treaba! Recomand serviciile sale GSM”",
      rating: "★★★★★",
      name: "Stolo Draghici",
    },
  ];

  return (
    <ReviewsSection className="contact-google-reviews-section">
      <Container>
        <SectionTitle>Ce spun clienții despre serviciile noastre</SectionTitle>
        <Row className="g-4">
          {testimonials.map((testimonial) => (
            <Col key={testimonial.id} md={6} lg={3}>
              <ReviewCard>
                <CardBody>
                  <ReviewText>{testimonial.text}</ReviewText>
                  <div className="mt-auto">
                    <StarRating>{testimonial.rating}</StarRating>
                    <ReviewBadge className="badge">
                      Review de pe Google
                    </ReviewBadge>
                  </div>
                </CardBody>
                <CardFooter>
                  <ReviewerName>— {testimonial.name}</ReviewerName>
                </CardFooter>
              </ReviewCard>
            </Col>
          ))}
        </Row>
      </Container>
    </ReviewsSection>
  );
};

export default ServicesReviews;
