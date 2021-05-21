import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "./contexts/themeContext";
import { ThemeProvider as MUIProvider } from "@material-ui/core";
import theme from "./theme";


ReactDOM.render(
  <React.StrictMode>
    <MUIProvider theme={theme}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      </MUIProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
