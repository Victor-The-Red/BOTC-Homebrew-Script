import { Container } from "@mui/material";
import React from "react";
import { useStylingContext } from "contexts/StylingContext";

const ScriptSideBar: React.FC = () => {
  const { styleState } = useStylingContext();
  const { useA4Size, useSimpleDesign } = styleState;
  
  if (useSimpleDesign) {
    return null;
  }

  const height = useA4Size ? 1123 : 1200;

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        maxWidth: 30,
        position: "absolute",
        backgroundImage: "url('/side-bar.png')",
        height: height,
        top: -1,
        left: -1,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
      }}
    />
  );
};

export default ScriptSideBar;
