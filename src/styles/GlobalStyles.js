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


/* Placeholder styling for dark theme */
.dark-theme .form-control::placeholder,
.dark-theme .form-select:invalid {
  color: rgba(255, 255, 255, 0.7) !important;
  opacity: 1 !important;
}

.dark-theme .form-control:-ms-input-placeholder,
.dark-theme .form-select:-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
}

.dark-theme .form-control::-ms-input-placeholder,
.dark-theme .form-select::-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* Light theme placeholders (default Bootstrap works fine) */
.light-theme .form-control::placeholder {
  color: #6c757d !important;
  opacity: 1 !important;
}


/**Styling the tabbed component */

/* button {
  color: inherit;
  font-family: inherit;
  border: none;
  cursor: pointer;
}

.toggle {
  position: absolute;
  right: 0;
  background: none;
  font-size: 30px;
  padding: 4px;
}

.tabs {
  margin-bottom: 8px;
}

.tab {
  border-radius: 12px;
  background-color: #edf2ff;
  padding: 12px 24px;
  margin-right: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #364fc7;
  transition: all 0.3s;
}

.tab.active,
.tab:hover {
  background-color: #364fc7;
  color: #fff;
}

.tab-content {
  background-color: #edf2ff;
  padding: 32px;
  border-radius: 12px;
}

.tab-content h4 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #364fc7;
}

.tab-content p {
  font-size: 18px;
}

.tab-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  margin-bottom: 24px;
}

.tab-actions > button {
  background: none;
  text-decoration: underline;
  color: #4c6ef5;
  font-size: 14px;
}

.hearts-counter {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hearts-counter button {
  background-color: #f03e3e;
  padding: 4px 6px;
  border-radius: 4px;
  color: #fff;
  line-height: 1;
}

.tab-undo {
  display: flex;
  gap: 8px;
}

.tab-undo button {
  background-color: #364fc7;
  color: #fff;
  padding: 6px 12px;
  border-radius: 4px;
} */

`;

export default GlobalStyles;
