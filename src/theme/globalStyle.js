import { createGlobalStyle } from "styled-components";
import theme from ".";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
  }

  body {
    background: ${theme.pallete.gray[2]};
    color: ${theme.pallete.darkBlue};
    font-family: Open-Sans, Helvetica, Sans-Serif;

    button {
      padding: ${theme.spacing(2)} ${theme.spacing(3)};
      border: none;
      border-radius:  ${theme.spacing(1)};
      cursor: pointer;
    }

    header {
      width: 100%;
      padding: ${theme.spacing(3)} ${theme.spacing(4)};

      .title {
        font-size: ${theme.fontSize.medium};
        font-weight: bold;
        text-align: left;
        width: 100%;
      }
    }
  }
`;

export default GlobalStyle;
