import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faMapMarkerAlt,
  faCopy,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

// Styled components with chevron icons
const StyledIcon = styled(FontAwesomeIcon)``;

const StyledSection = styled.section`
  background-color: #343a40;

  @media (max-width: 576px) {
    padding: 1.5rem 0 !important;
  }
`;

const AccordionItem = styled.div`
  border-radius: 0.375rem;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const StyledAnchor = styled.a`
  text-decoration: underline;
  color: hsl(195, 77%, 60%);
`;

const StyledAnchor1 = styled.a`
  color: hsl(195, 77%, 60%) !important;

  &:hover {
    color: hsl(195, 77%, 40%) !important;
  }
  /* background-color: red; */
`;

const AccordionHeader = styled.h5`
  margin: 0;
`;

const AccordionButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  padding: 1rem 1.25rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2) !important;
  }

  &:focus {
    box-shadow: none;
  }

  @media (max-width: 576px) {
    font-size: 1rem;
  }
`;

const ChevronIcon = styled.span`
  margin-left: 1rem;
  transition: transform 0.3s ease;
  font-size: 0.9rem;
`;

const AccordionCollapse = styled.div`
  transition: all 0.3s ease-out;
  background-color: rgba(0, 0, 0, 0.15);

  &.collapse {
    display: block;
    height: 0;
    overflow: hidden;
  }

  &.collapse.show {
    height: auto;
  }

  .accordion-body {
    padding: 1rem 1.25rem;
  }
`;

const ContactDataItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border: 1px solid white;
  padding: 0.5rem;
  border-radius: 1rem;

  a {
    color: #f8f9fa;
    transition: color 0.2s;

    &:hover {
      color: #0d6efd;
    }
  }

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
`;

const CopyButton = styled.button`
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const StyledAccordion = styled.div`
  @media (max-width: 576px) {
    padding-bottom: 1rem;
  }
`;

const ContactMiddleSection = () => {
  const [activeAccordion, setActiveAccordion] = useState("faqOne");
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You might want to add a toast notification here
  };

  const toggleAccordion = (item) => {
    setActiveAccordion(activeAccordion === item ? null : item);
  };

  return (
    <StyledSection className="py-5">
      <div className="container">
        <div className="row">
          <StyledAccordion className="col-lg-6">
            <section className="container">
              <h2 className="mb-4 text-white">Întrebări frecvente</h2>
              <div className="accordion text-white" id="faqAccordion">
                {/* FAQ Item 1 */}
                <AccordionItem className="mb-2">
                  <AccordionHeader>
                    <AccordionButton
                      className={`text-white bg-dark ${
                        activeAccordion === "faqOne" ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() => toggleAccordion("faqOne")}
                      aria-expanded={activeAccordion === "faqOne"}
                      aria-controls="faqOne"
                    >
                      <span>Ce tipuri de dispozitive reparați?</span>
                      <ChevronIcon>
                        <FontAwesomeIcon
                          icon={
                            activeAccordion === "faqOne"
                              ? faChevronUp
                              : faChevronDown
                          }
                        />
                      </ChevronIcon>
                    </AccordionButton>
                  </AccordionHeader>
                  <AccordionCollapse
                    id="faqOne"
                    className={`collapse ${
                      activeAccordion === "faqOne" ? "show" : ""
                    }`}
                    aria-labelledby="faqOneHeading"
                  >
                    <div className="accordion-body text-white">
                      Reparăm telefoane mobile, tablete, laptopuri și alte
                      dispozitive electronice de uz personal. Dacă ai un alt
                      dispozitiv, contactează-ne și vom confirma dacă îl putem
                      repara.
                    </div>
                  </AccordionCollapse>
                </AccordionItem>

                {/* FAQ Item 2 */}
                <AccordionItem className="mb-2">
                  <AccordionHeader>
                    <AccordionButton
                      className={`text-white bg-dark ${
                        activeAccordion === "faqTwo" ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() => toggleAccordion("faqTwo")}
                      aria-expanded={activeAccordion === "faqTwo"}
                      aria-controls="faqTwo"
                    >
                      <span>Cât durează o reparație?</span>
                      <ChevronIcon>
                        <FontAwesomeIcon
                          icon={
                            activeAccordion === "faqTwo"
                              ? faChevronUp
                              : faChevronDown
                          }
                        />
                      </ChevronIcon>
                    </AccordionButton>
                  </AccordionHeader>
                  <AccordionCollapse
                    id="faqTwo"
                    className={`collapse ${
                      activeAccordion === "faqTwo" ? "show" : ""
                    }`}
                    aria-labelledby="faqTwoHeading"
                  >
                    <div className="accordion-body text-white">
                      Durata variază în funcție de complexitatea problemei.
                      Unele reparații se pot face în aceeași zi, altele pot dura
                      până la 2-3 zile lucrătoare.
                    </div>
                  </AccordionCollapse>
                </AccordionItem>

                {/* FAQ Item 3 */}
                <AccordionItem className="mb-2">
                  <AccordionHeader>
                    <AccordionButton
                      className={`text-white bg-dark ${
                        activeAccordion === "faqThree" ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() => toggleAccordion("faqThree")}
                      aria-expanded={activeAccordion === "faqThree"}
                      aria-controls="faqThree"
                    >
                      <span>Trebuie să fac o programare?</span>
                      <ChevronIcon>
                        <FontAwesomeIcon
                          icon={
                            activeAccordion === "faqThree"
                              ? faChevronUp
                              : faChevronDown
                          }
                        />
                      </ChevronIcon>
                    </AccordionButton>
                  </AccordionHeader>
                  <AccordionCollapse
                    id="faqThree"
                    className={`collapse ${
                      activeAccordion === "faqThree" ? "show" : ""
                    }`}
                    aria-labelledby="faqThreeHeading"
                  >
                    <div className="accordion-body text-white">
                      Programarea nu este obligatorie, însă încurajăm
                      completarea formularului de pe website sau telefonarea
                      înainte pentru a ne asigura că piesele necesare sunt
                      disponibile.
                    </div>
                  </AccordionCollapse>
                </AccordionItem>

                {/* FAQ Item 4 */}
                <AccordionItem className="mb-2">
                  <AccordionHeader>
                    <AccordionButton
                      className={`text-white bg-dark ${
                        activeAccordion === "faqFour" ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() => toggleAccordion("faqFour")}
                      aria-expanded={activeAccordion === "faqFour"}
                      aria-controls="faqFour"
                    >
                      <span>Oferiți garanție pentru reparații?</span>
                      <ChevronIcon>
                        <FontAwesomeIcon
                          icon={
                            activeAccordion === "faqFour"
                              ? faChevronUp
                              : faChevronDown
                          }
                        />
                      </ChevronIcon>
                    </AccordionButton>
                  </AccordionHeader>
                  <AccordionCollapse
                    id="faqFour"
                    className={`collapse ${
                      activeAccordion === "faqFour" ? "show" : ""
                    }`}
                    aria-labelledby="faqFourHeading"
                  >
                    <div className="accordion-body text-white">
                      Da, toate reparațiile vin cu o garanție între 30 și 90 de
                      zile, în funcție de tipul de reparație și specificul
                      situației. Vom menționa acest lucru în bonul de reparație.
                    </div>
                  </AccordionCollapse>
                </AccordionItem>

                {/* FAQ Item 5 */}
                <AccordionItem className="mb-2">
                  <AccordionHeader>
                    <AccordionButton
                      className={`text-white bg-dark ${
                        activeAccordion === "faqFive" ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() => toggleAccordion("faqFive")}
                      aria-expanded={activeAccordion === "faqFive"}
                      aria-controls="faqFive"
                    >
                      <span>Cât mă va costa aproximativ reparația?</span>
                      <ChevronIcon>
                        <FontAwesomeIcon
                          icon={
                            activeAccordion === "faqFive"
                              ? faChevronUp
                              : faChevronDown
                          }
                        />
                      </ChevronIcon>
                    </AccordionButton>
                  </AccordionHeader>
                  <AccordionCollapse
                    id="faqFive"
                    className={`collapse ${
                      activeAccordion === "faqFive" ? "show" : ""
                    }`}
                    aria-labelledby="faqFiveHeading"
                  >
                    <div className="accordion-body text-white">
                      Este important să menționăm faptul că prețurile pentru
                      reparații pot varia foarte mult. Echipa noastră a
                      construit un tabel cu prețuri estimative pentru cele mai
                      frecvente tipuri de reparații și cele mai comune
                      dispozitive. Lista este orientativă și poate fi consultată{" "}
                      <StyledAnchor
                        data-bs-toggle="modal"
                        data-bs-target="#repairPricesModal"
                        href="/"
                      >
                        aici
                      </StyledAnchor>
                      .
                    </div>
                  </AccordionCollapse>
                </AccordionItem>
              </div>
            </section>
          </StyledAccordion>

          <div className="col-lg-6 text-white">
            <h2 className="mb-4">Date de contact</h2>
            <ul className="list-unstyled mb-4">
              <ContactDataItem className="mb-2">
                <StyledAnchor1
                  className="text-decoration-none"
                  href="https://maps.app.goo.gl/DjjqwmbCwaBL1BBr5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <StyledIcon icon={faMapMarkerAlt} className="me-2" />
                  <span id="address">
                    Str. 1 Decembrie 1918 Nr. 8, Galați 800258
                  </span>
                </StyledAnchor1>
                <CopyButton
                  onClick={() =>
                    copyToClipboard(
                      "Str. 1 Decembrie 1918 Nr. 8, Galați 800258"
                    )
                  }
                  className="ms-3 btn-sm btn btn-outline-primary"
                >
                  <StyledIcon icon={faCopy} className="me-2" />
                  Copiază
                </CopyButton>
              </ContactDataItem>
              <ContactDataItem className="mb-2">
                <StyledAnchor1
                  href="tel:+40743352949"
                  className="text-decoration-none"
                >
                  <StyledIcon icon={faPhone} className="me-2" />
                  0743 352 949
                </StyledAnchor1>
              </ContactDataItem>
              <ContactDataItem className="mb-2">
                <StyledAnchor1
                  href="mailto:dangsmsrl@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <StyledIcon icon={faEnvelope} className="me-2" />
                  dangsmsrl@gmail.com
                </StyledAnchor1>
              </ContactDataItem>
            </ul>

            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2799.2564775044516!2d28.0206405767239!3d45.44448753475302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc2d44ca8c3eec7%3A0x5f759f243a7885e5!2sFixAzi%20Service%20GSM!5e0!3m2!1sen!2sro!4v1746809538175!5m2!1sen!2sro"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </StyledSection>
  );
};

export default ContactMiddleSection;
