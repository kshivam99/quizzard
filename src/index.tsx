import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ThemeProvider } from "./contexts/themeContext";

const theme = extendTheme({
  colors: {
    blood: {
      500: "#DC2626",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
