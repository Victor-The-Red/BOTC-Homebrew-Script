import { Paper } from "@mui/material";
import React, { MutableRefObject, PropsWithChildren, forwardRef } from "react";
import { useStylingContext } from "contexts/StylingContext";

const StyledPaper = forwardRef(
  ({ children }: PropsWithChildren, ref: MutableRefObject<undefined>) => {
    const { styleState } = useStylingContext();
    const { useA4Size, useSimpleDesign } = styleState;

    // Размеры для A4 и оригинальные
    const paperDimensions = useA4Size
      ? { width: 794, height: 1123 } // A4 при 96 dpi
      : { width: 900, height: 1200 }; // оригинальные

    return (
      <Paper
        variant="outlined"
        sx={{
          display: "inline-block",
          width: paperDimensions.width,
          height: paperDimensions.height,
          margin: "5%",
          position: "relative",
          backgroundColor: useSimpleDesign ? "white" : "transparent",
          backgroundImage: useSimpleDesign ? "none" : "url('/page.png')",
        }}
        ref={ref}
      >
        {children}
      </Paper>
    );
  }
);

export default StyledPaper;
