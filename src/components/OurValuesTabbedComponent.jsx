import { useState } from "react";
import styled from "styled-components";
import {
  faEye,
  faClock,
  faShieldAlt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const content = [
  {
    valueName: "Transparență",
    valueDescription:
      "Comunicăm clar și sincer fiecare etapă a procesului de reparație, fără costuri ascunse.",
    icon: faEye,
  },
  {
    valueName: "Promptitudine",
    valueDescription:
      "Ne angajăm să răspundem rapid cererilor și să oferim termene realiste și respectate.",
    icon: faClock,
  },
  {
    valueName: "Responsabilitate",
    valueDescription:
      "Tratăm fiecare dispozitiv ca și cum ar fi al nostru și oferim garanție pentru serviciile prestate.",
    icon: faShieldAlt,
  },
  {
    valueName: "Calitate",
    valueDescription:
      "Folosim doar componente de încredere și respectăm standarde tehnice riguroase în fiecare reparație.",
    icon: faStar,
  },
];

const StyledTabs = styled.div`
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const StyledButton = styled.button`
  border-radius: 1rem;
  background-color: #000;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  transition: all 0.3s;

  &.active,
  &:hover {
    background-color: #4bc1e7;
    color: #fff;
  }
`;

const StyledTabContent = styled.div`
  display: flex;
  justify-content: center;
  max-width: 600px;
  height: 100px;
`;

const StyledContainerOuter = styled.div`
  background-color: #35353a;
`;

const StyledContainerInner = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledH4 = styled.h4`
  color: #fff;
`;

const StyledP = styled.p`
  color: #fff;
`;

const StyledPOurValues = styled.p`
  max-width: 750px;
  padding: 1rem;
  text-align: justify;
`;

function Tab({ num, activeTab, onClick, title, icon }) {
  return (
    <StyledButton
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      <FontAwesomeIcon icon={icon} className="me-2" />
      {title}
    </StyledButton>
  );
}

function TabContent({ item }) {
  return (
    <StyledTabContent>
      <div className="tab-content">
        <StyledH4>{item.valueName}</StyledH4>
        {<StyledP>{item.valueDescription}</StyledP>}
      </div>
    </StyledTabContent>
  );
}

function OurValuesTabbedComponent() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <StyledContainerOuter>
      <StyledContainerInner className="container">
        <h2 className="text-white text-center">Valorile noastre</h2>
        <StyledPOurValues className="text-white">
          La FIXAZI, nu ne concentrăm doar pe reparații rapide și eficiente, ci
          și pe modul în care ne raportăm la clienți, la calitatea muncii
          noastre și la comunitatea din care facem parte. Valorile de mai jos ne
          ghidează în fiecare interacțiune și în fiecare intervenție tehnică.
        </StyledPOurValues>
        <StyledTabs>
          <Tab
            num={0}
            activeTab={activeTab}
            onClick={setActiveTab}
            title={content.at(0).valueName}
            icon={content.at(0).icon}
          />
          <Tab
            num={1}
            activeTab={activeTab}
            onClick={setActiveTab}
            title={content.at(1).valueName}
            icon={content.at(1).icon}
          />
          <Tab
            num={2}
            activeTab={activeTab}
            onClick={setActiveTab}
            title={content.at(2).valueName}
            icon={content.at(2).icon}
          />
          <Tab
            num={3}
            activeTab={activeTab}
            onClick={setActiveTab}
            title={content.at(3).valueName}
            icon={content.at(3).icon}
          />
        </StyledTabs>
        {
          <TabContent
            item={content.at(activeTab)}
            key={content.at(activeTab).valueName}
          />
        }
      </StyledContainerInner>
    </StyledContainerOuter>
  );
}

export default OurValuesTabbedComponent;
