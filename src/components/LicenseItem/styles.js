import styled, { css } from "styled-components";
import theme from "../../theme";

const LicenseItemContainer = styled.article`
  display: flex;
  align-items: center;
  border-bottom: solid 1px ${theme.pallete.gray[2]};
  gap: ${theme.spacing(4)};
  padding: ${theme.spacing(3)} ${theme.spacing(4)};
  width: 100%;
  user-select: none;

  * {
    &::selection {
      background-color: none;
    }
  }

  &:last-child {
    border: none;
  }

  .logo {
    background-color: ${theme.pallete.gray[4]};
    border-radius: 100%;
    height: ${theme.spacing(10)};
    width: ${theme.spacing(10)};
    min-width: ${theme.spacing(10)};
  }

  .data {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    gap: ${theme.spacing(2)};

    .name {
      color: ${theme.pallete.darkGray};
      font-size: ${theme.fontSize.small};
      max-width: ${theme.spacing(20)};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .value {
      font-weight: bold;
      font-size: ${theme.fontSize.medium};
    }
  }

  .setAmount {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: ${theme.spacing(18)};
    min-width: ${theme.spacing(18)};

    .add,
    .remove {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      height: ${theme.spacing(6)};
      width: ${theme.spacing(6)};
      min-width: ${theme.spacing(6)};
      background-color: ${theme.pallete.gray[4]};
      border-radius: ${theme.spacing(1)};
    }

    .add {
      background-color: ${theme.pallete.white};
      color: ${theme.pallete.blue};
    }

    .amount {
      margin: 0 ${theme.spacing(2)};
      font-size: ${theme.fontSize.small};
    }
  }

  ${(props) =>
    props.isSelected &&
    css`
      background: ${theme.pallete.gray[1]};

      .setAmount {
        .add {
          background-color: ${theme.pallete.blue};
          color: ${theme.pallete.white};
        }
      }
    `}
`;

export { LicenseItemContainer };
