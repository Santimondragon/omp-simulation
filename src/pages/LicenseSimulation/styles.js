import styled, { css } from "styled-components";
import theme from "../../theme";

const SimulatorContainer = styled.div`
  display: flex;
  align-items: stretch;
  padding: ${theme.spacing(4)};
  gap: ${theme.spacing(2)};

  .col {
    display: flex;
    flex-direction: column;
    width: 360px;
    gap: ${theme.spacing(2)};
  }
`;

const LicenseListContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: white;
  border-radius: ${theme.spacing(1)};
  box-shadow: 0 4px 8px -4px #00000077;

  header {
    width: 100%;
    padding: ${theme.spacing(3)} ${theme.spacing(4)};

    .title {
      font-size: ${theme.fontSize.medium};
      text-align: left;
      width: 100%;
    }
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: ${theme.spacing(2)};
    padding: ${theme.spacing(3)} ${theme.spacing(4)};
    width: 100%;

    .clear {
      background-color: ${theme.pallete.gray[2]};
      color: ${theme.pallete.darkBlue};
    }
  }
`;

const LaunchSimulationBtn = styled.button`
  background-color: ${theme.pallete.blue};
  color: ${theme.pallete.white};

  ${(props) =>
    props.shouldFinish &&
    css`
      background-color: ${theme.pallete.red};
    `}

  ${(props) =>
    props.disabled &&
    css`
      cursor: default;
      background-color: ${theme.pallete.gray[2]};
      color: ${theme.pallete.gray[4]};
    `}
`;

const DetailsContainer = styled.section`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing(2)};
  flex: 1 1 auto;
`;

export default SimulatorContainer;
export { LaunchSimulationBtn, LicenseListContainer, DetailsContainer };
