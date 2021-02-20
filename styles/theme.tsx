import { ThemeOptions, createMuiTheme } from "@material-ui/core/styles";
import { cyan, lime, red } from "@material-ui/core/colors";

import { Palette } from "@material-ui/core/styles/createPalette";

// PaletteColorOptions

export interface IPalette extends Palette {
  gradient: {
    lightGradient: string;
  };
}

interface IThemeOptions extends ThemeOptions {
  palette: IPalette;
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: lime[100],
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#c3d0f5",
    },
    gradient: {
      lightGradient: "linear-gradient(-45deg, #ff00ff, blueviolet, purple)",
    },
  },
} as IThemeOptions);

export default theme;
