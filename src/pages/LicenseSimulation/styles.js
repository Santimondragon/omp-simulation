import styled from "styled-components";
import theme from "../../theme";

const SimulatorContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${theme.spacing(4)};
  gap: ${theme.spacing(2)};
`;

const LicenseListContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: white;
  padding: ${theme.spacing(2)} 0;
  border-radius: ${theme.spacing(1)};
  box-shadow: 0 4px 8px -4px #00000077;
  width: 264px;

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: ${theme.spacing(2)};
    padding: ${theme.spacing(3)} ${theme.spacing(4)} ${theme.spacing(1)};
    width: 100%;

    .clear {
      background-color: ${theme.pallete.gray[2]};
      color: ${theme.pallete.darkBlue};
    }

    .simulate {
      background-color: ${theme.pallete.blue};
      color: ${theme.pallete.white};
    }
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: ${theme.spacing(2)};
`;

export default SimulatorContainer;
export { LicenseListContainer, DetailsContainer };
