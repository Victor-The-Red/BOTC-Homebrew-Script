import React from "react";
import { createTheme } from "@mui/material/styles";
import OhChewy from "./fonts/Oh Chewy.ttf";
import AppleGaramond from "./fonts/AppleGaramond.ttf";
import OldEnglish from "./fonts/oldenglishtextmt.ttf";
import LHFUnlovable from "./fonts/LHF Unlovable.ttf";
import Amris from "./fonts/amrys-regular.otf";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    script: React.CSSProperties;
    scriptName: React.CSSProperties;
    scriptHeader: React.CSSProperties;
    scriptFooter: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    script?: React.CSSProperties;
    scriptName: React.CSSProperties;
    scriptHeader: React.CSSProperties;
    scriptFooter: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    script: true;
    scriptName: true;
    scriptHeader: true;
    scriptFooter: true;
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: "rgb(0,0,0)",
    },
  },
  typography: {
    script: {
      color: "black",
      fontFamily: "Amris",
      fontSize: 14,
      lineHeight: 1.25,
    },
    scriptName: {
      color: "black",
      fontFamily: "LHFUnlovable",
      fontSize: 24,
    },
    scriptHeader: {
      color: "black",
      fontFamily: "applegaramond",
      fontSize: 14,
      lineHeight: 1.25,
    },
    scriptFooter: {
      color: "black",
      fontFamily: "Amris",
      fontSize: 12,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "url('/page.png')",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: [
          {
            "@font-face": {
              fontFamily: "ohchewwy",
              src: `url(${OhChewy}) format("truetype")`,
            },
          },
          {
            "@font-face": {
              fontFamily: "applegaramond",
              src: `url(${AppleGaramond}) format("truetype")`,
            },
          },
		  {
			"@font-face": {
			  fontFamily: "oldenglish",
			  src: `url(${OldEnglish}) format("truetype")`,
			}
		  },
		  {
			"@font-face": {
			  fontFamily: "LHFUnlovable",
			  src: `url(${LHFUnlovable}) format("truetype")`,
			}
		  },
		  {
			"@font-face": {
			  fontFamily: "Amris",
			  src: `url(${Amris}) format("opentype")`,
			}
		  }
        ],
      },
    },
  },
});

export default theme;
