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
      "Oferim diagnosticări clare și explicații detaliate, astfel încât clienții să știe exact ce reparații efectuăm și de ce.",
    icon: faEye,
  },
  {
    valueName: "Promptitudine",
    valueDescription:
      "Respectăm termenele stabilite și reparăm rapid dispozitivele, pentru ca tu să te bucuri din nou de ele cât mai curând.",
    icon: faClock,
  },
  {
    valueName: "Responsabilitate",
    valueDescription:
      "Tratăm fiecare reparație cu seriozitate, folosind doar piese de calitate și oferind garanție pentru serviciile noastre.",
    icon: faShieldAlt,
  },
  {
    valueName: "Calitate",
    valueDescription:
      "Lucrăm profesionist, cu atenție la detalii, pentru a oferi reparații durabile și servicii la cele mai înalte standarde.",
    icon: faStar,
  },
];

const StyledTabs = styled.div`
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 576px) {
    gap: 0.5rem;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    gap: 0.75rem;
  }
`;

const StyledButton = styled.button`
  border-radius: 1rem;
  background-color: #000;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  transition: all 0.3s;
  display: flex;
  align-items: center;
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

  @media (max-width: 576px) {
    max-width: 80%;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    max-width: 80%;
  }
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

  @media (max-width: 576px) {
    max-width: 90%;
  }
`;

const StyledTitle = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
  @media (max-width: 576px) {
    font-size: 1.5rem;
    margin-right: 0;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    font-size: 2rem;
    margin-right: 0;
  }
`;

function Tab({ num, activeTab, onClick, title, icon }) {
  return (
    <StyledButton
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      <StyledFontAwesomeIcon icon={icon} />
      <StyledTitle>{title}</StyledTitle>
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
