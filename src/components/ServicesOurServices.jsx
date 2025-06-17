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
import { useState } from "react";

const content = [
  {
    serviceName: "Reparații telefoane",
    serviceDescription:
      "Oferim reparații rapide și profesionale pentru orice model de telefon – display spart, baterie uzată, probleme software sau hardware. Folosim doar componente de calitate și echipamente moderne.",
    serviceIcon: faMobileAlt,
  },
  {
    serviceName: "Reparații tablete",
    serviceDescription:
      "Reparăm tablete de toate tipurile – ecrane crăpate, conectori defecți, încărcare lentă sau blocaje de sistem. Intervențiile sunt eficiente și adaptate fiecărui model în parte.",
    serviceIcon: faTabletAlt,
  },
  {
    serviceName: "Reparații laptopuri",
    serviceDescription:
      "Remediem probleme hardware și software la laptopuri: tastaturi, ecrane, plăci de bază, sistem de răcire sau reinstalare sistem. Diagnostic precis și soluții durabile, indiferent de marcă.",
    serviceIcon: faLaptop,
  },
  {
    serviceName: "Diagnosticare gratuită",
    serviceDescription:
      "Verificăm gratuit dispozitivul tău și îți oferim un diagnostic complet înainte de reparație. Află cauza exactă a problemei fără nicio obligație de a continua.",
    serviceIcon: faShieldAlt,
  },
  {
    serviceName: "Recuperare date",
    serviceDescription:
      "Recuperăm fișiere pierdute de pe telefoane, tablete și laptopuri: documente, poze, videoclipuri sau contacte. Folosim soluții avansate pentru medii deteriorate sau corupte.",
    serviceIcon: faSyncAlt,
  },
  {
    serviceName: "Servicii personalizate",
    serviceDescription:
      "Oferim soluții adaptate cerințelor tale: upgrade hardware, configurări speciale, curățare completă sau optimizare sistem. Discutăm cu tine fiecare detaliu pentru rezultate pe măsură.",
    serviceIcon: faCogs,
  },
];

const StyledServicesOurServices = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 5rem;
`;
const StyledButton = styled.button`
  background-color: #fff;
  color: #000;
  border: none;
  padding: 1rem;
  border-radius: 1rem;

  &.active {
    background-color: #66c9ea;
    color: #fff;
  }
`;

const StyledTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;

  @media (max-width: 576px) {
  }
`;

const StyledContentTabs = styled.div`
  max-width: 650px;
  height: 100px;

  @media (max-width: 576px) {
    height: unset;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    height: 200px;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;

  @media (max-width: 576px) {
    margin: 0;
    font-size: 1.2rem;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    margin: 0;
    font-size: 1.6rem;
  }
`;

const StyledFontAwesomeIcon2 = styled(FontAwesomeIcon)`
  font-size: 3rem;
  flex: 1;

  @media (max-width: 576px) {
    display: none;
  }
`;

const StyledTitle = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;

function Tab({ title, activeTab, num, onClick, serviceIcon }) {
  return (
    <StyledButton
      className={activeTab === num ? "active" : ""}
      onClick={() => onClick(num)}
    >
      <StyledFontAwesomeIcon icon={serviceIcon} />
      <StyledTitle>{title}</StyledTitle>
    </StyledButton>
  );
}

const StyledTabContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: #fff;
  padding: 1rem;

  @media (max-width: 576px) {
    padding: 0;
  }
`;

const StyledDescription = styled.div`
  flex: 5;

  @media (max-width: 576px) {
    font-size: 1.2rem;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

function TabContent({ description, serviceIcon }) {
  return (
    <StyledTabContent>
      <StyledFontAwesomeIcon2 icon={serviceIcon} />
      <StyledDescription>{description}</StyledDescription>
    </StyledTabContent>
  );
}

const OurServicesTitle = styled.h3`
  color: #fff;
`;

const OurServicesParagraph = styled.p`
  color: #fff;
  max-width: 70%;
  text-align: center;

  @media (max-width: 768px) {
    max-width: 100%;
    font-size: 1.2rem;
  }
`;

function ServicesOurServices() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <StyledServicesOurServices>
      <OurServicesTitle>Serviciile Noastre</OurServicesTitle>
      <OurServicesParagraph>
        Oferim o gamă variată de servicii de reparații pentru dispozitivele
        tale. Fie că este vorba de un telefon spart, o tabletă care nu mai
        pornește sau un laptop lent, suntem aici să te ajutăm.
      </OurServicesParagraph>
      <StyledTabs>
        <Tab
          title={content.at(0).serviceName}
          onClick={setActiveTab}
          num={0}
          activeTab={activeTab}
          serviceIcon={content.at(0).serviceIcon}
        />
        <Tab
          title={content.at(1).serviceName}
          onClick={setActiveTab}
          num={1}
          activeTab={activeTab}
          serviceIcon={content.at(1).serviceIcon}
        />
        <Tab
          title={content.at(2).serviceName}
          onClick={setActiveTab}
          num={2}
          activeTab={activeTab}
          serviceIcon={content.at(2).serviceIcon}
        />
        <Tab
          title={content.at(3).serviceName}
          onClick={setActiveTab}
          num={3}
          activeTab={activeTab}
          serviceIcon={content.at(3).serviceIcon}
        />
        <Tab
          title={content.at(4).serviceName}
          onClick={setActiveTab}
          num={4}
          activeTab={activeTab}
          serviceIcon={content.at(4).serviceIcon}
        />
        <Tab
          title={content.at(5).serviceName}
          onClick={setActiveTab}
          num={5}
          activeTab={activeTab}
          serviceIcon={content.at(5).serviceIcon}
        />
      </StyledTabs>
      <StyledContentTabs>
        <TabContent
          description={content.at(activeTab).serviceDescription}
          serviceIcon={content.at(activeTab).serviceIcon}
        />
      </StyledContentTabs>
    </StyledServicesOurServices>
  );
}

export default ServicesOurServices;
