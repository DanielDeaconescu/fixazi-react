import styled from "styled-components";

const StyledCreatedBy = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  background-color: black;
  color: white;
`;

const StyledParagraph = styled.p`
  margin: 0;
`;

const StyledAnchor = styled.a`
  color: rgb(75, 192, 231);
  text-decoration: underline;
`;

function CreatedBy() {
  return (
    <StyledCreatedBy>
      <StyledParagraph class="text-white created-by-p">
        <span className="me-1">Website realizat de</span>
        <StyledAnchor href="https://danieldeaconescu.com/" target="_blank">
          Daniel Dev
        </StyledAnchor>
      </StyledParagraph>
    </StyledCreatedBy>
  );
}

export default CreatedBy;
