import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: sans-serif;
    line-height: 1.5;
    font-size: 16px;
  }
`;

export const theme = {};
