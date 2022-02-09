import styled from "styled-components";
import theme from "../../theme";

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: white;
  border-radius: ${theme.spacing(1)};
  box-shadow: ${theme.shadows.container};

  header {
    width: 100%;
    padding: ${theme.spacing(3)} ${theme.spacing(4)};

    .title {
      font-size: ${theme.fontSize.medium};
      text-align: left;
      width: 100%;
    }
  }

  button {
    border: none;
    color: white;
    cursor: pointer;
    background-color: red;
    font-weight: bold;
    letter-spacing: 0.1em;
  }
`;

const MonthlyYieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: ${theme.fontSize.small};
  background-color: white;
  border-radius: ${theme.spacing(1)};
  box-shadow: ${theme.shadows.container};
  font-size: ${theme.fontSize.medium};
  font-weight: bold;

  header {
    width: 100%;
    padding: ${theme.spacing(3)} ${theme.spacing(4)};

    .title {
      font-size: ${theme.fontSize.medium};
      text-align: left;
      width: 100%;
    }
  }

  .inputWrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: ${theme.spacing(1)} ${theme.spacing(4)} ${theme.spacing(3)};
    gap: ${theme.spacing(3)};

    input {
      flex: 1 1 auto;
    }
  }
`;

const NetworkViewContainer = styled.div`
  flex: 1 1 auto;
  height: 100%;

  .tree {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

const RowLevel = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: ${(props) => `repeat(${props.amount}, 1fr)`};
  gap: ${theme.spacing(2)};
  padding: ${theme.spacing(2)};
  border-bottom: dashed 1px ${theme.pallete.gray[4]};
  height: ${theme.spacing(40)};
`;

const LicenseItem = styled.div`
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${theme.spacing(20)};
    width: ${theme.spacing(18)};
    min-width: ${theme.spacing(16)};

    img {
      filter: drop-shadow(${theme.shadows.filterItem});
      max-width: 100%;
      max-height: 100%;
    }
  }
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: solid 1px ${theme.pallete.gray[2]};
  gap: ${theme.spacing(2)};
  padding: ${theme.spacing(3)} ${theme.spacing(4)};
  width: 100%;

  &:nth-child(2) {
    border-top: solid 1px ${theme.pallete.gray[2]};
  }

  .details {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: ${theme.spacing(1)};

    .detail {
      display: flex;
      justify-content: space-between;
      font-size: ${theme.fontSize.small};
      color: ${theme.pallete.darkGray};
    }
  }

  .total {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    width: 100%;
    text-transform: capitalize;
  }
`;

export {
  LicenseItem,
  MonthlyYieldContainer,
  NetworkViewContainer,
  SummaryContainer,
  SummaryItem,
  RowLevel,
};
