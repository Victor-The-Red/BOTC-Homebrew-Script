import { Typography } from "@mui/material";
import React from "react";
import { useStylingContext } from "contexts/StylingContext";

const ScriptTabHeader: React.FC<{ title: string }> = ({ title }) => {
  const { styleState } = useStylingContext();
  const { typeFontSize, useSimpleDesign } = styleState;
  // Уменьшим шрифт, если это "ПРИСПЕШНИКИ"
  const fontSize = styleState.typeFontSize;
  //const fontSize = title === "ПРИСПЕШНИКИ" ? 10 : 16;
  // Если "ПРИСПЕШНИКИ" — подвинем чуть правее
  const leftPosition = -0.5 * fontSize + 12;
  //const leftPosition = title === "ПРИСПЕШНИКИ" ? 7 : 4;
  const color = useSimpleDesign ? "black" : "rgb(230, 230, 220)";
  const fontWeight = useSimpleDesign ? "bold" : "normal";
  
  return (
    <Typography
      variant="scriptHeader"
      textAlign="center"
      fontSize={fontSize}
      color={color}
      fontWeight={fontWeight}
      sx={{
        writingMode: "vertical-lr",
        textOrientation: "upright",
        position: "relative",
        left: leftPosition,
      }}
    >
      {title}
    </Typography>
  );
};

export default ScriptTabHeader;
