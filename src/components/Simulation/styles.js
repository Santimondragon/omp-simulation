import styled, { css } from "styled-components";

const SimulationContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;

  button,
  article {
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 4px 8px -4px #00000077;
    padding: 16px;
    width: 280px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 8px;

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
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .title {
      margin-left: 8px;
      margin-bottom: 8px;
    }
  }
`;

export { SimulationContainer };
