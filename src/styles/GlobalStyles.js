// styles/GlobalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Reset some default browser styles */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
    font-family: "Poppins", sans-serif;
    background-color: #f8f9fa;
    color: #212529;
    line-height: 1.6;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul, ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  img {
    max-width: 100%;
    display: block;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  input, textarea, select {
    font-family: inherit;
    outline: none;
  }

  input[type="checkbox"] {
  appearance: auto !important;
  -webkit-appearance: auto !important;
  accent-color: #0d6efd !important;
  background-color: #fff !important;
  border: 1px solid #000 !important;
}

input,
textarea,
select {
  background-color: #fff !important;
  color: #000 !important;
}

.custom-file-upload {
  position: relative;
  display: inline-block;
}

input[type="file"] {
  display: none;
}

.custom-file-label {
  display: inline-block;
  padding: 10px 20px;
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
  cursor: pointer;
}

`;

export default GlobalStyles;
