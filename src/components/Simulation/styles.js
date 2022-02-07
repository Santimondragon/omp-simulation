import styled from "styled-components";
import theme from "../../theme";

const SummaryContainer = styled.div`
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

  .withdrawls {
    display: flex;
    justify-content: space-between;
    align-items: center;

    label {
      font-weight: bold;
    }

    .amount {
      border: none;
      border-radius: 4px;
      box-shadow: inset 0 0 8px -2px #00000077;
      font-size: 16px;
      font-weight: bold;
      padding: 12px;
      padding-left: 14px;
      padding-right: 0;
      outline: none;
      text-align: center;
    }
  }

  .numbers {
    display: flex;
    flex-direction: column;
    gap: 4px;

    & > div {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: solid 1px lightgray;

      &:first-child {
        padding-top: 0;
      }

      &:last-child {
        padding-bottom: 0;
        border: none;
      }

      span:last-child {
        font-weight: bold;
      }
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
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing(3)} ${theme.spacing(4)};
  font-size: ${theme.fontSize.small};
  background-color: white;
  border-radius: ${theme.spacing(1)};
  box-shadow: 0 4px 8px -4px #00000077;
  font-size: ${theme.fontSize.medium};
  font-weight: bold;

  .setYield {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: ${theme.fontSize.small};
    font-weight: normal;

    .add,
    .remove {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-weight: bold;
      height: ${theme.spacing(6)};
      width: ${theme.spacing(6)};
      min-width: ${theme.spacing(6)};
      background-color: ${theme.pallete.gray[3]};
      border-radius: ${theme.spacing(1)};
    }

    .monthlyYield {
      margin: 0 ${theme.spacing(2)};
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
  flex: 1 1 auto;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: ${(props) => `repeat(${props.amount}, 1fr)`};
  gap: ${theme.spacing(2)};
  padding: ${theme.spacing(2)};
  border-bottom: dashed 1px ${theme.pallete.gray[4]};
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
  MonthlyYieldContainer,
  NetworkViewContainer,
  SummaryContainer,
  SummaryItem,
  RowLevel,
};
