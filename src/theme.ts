import { createMuiTheme } from "@material-ui/core";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface ThemeOptions {
    themeName?: string;
  }
}

const palette = {
  primary: {
    main: "#DC2626"
  },
  secondary: {
    main: "#F59E0B"
  }
};

export default createMuiTheme({ palette });
