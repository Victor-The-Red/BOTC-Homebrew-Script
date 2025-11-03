import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { useStylingContext } from "contexts/StylingContext";

const ScriptHeader: React.FC<{ title: string; image?: string }> = ({
  title,
  image,
}) => {
  const { styleState } = useStylingContext();
  const { useA4Size, titleFontSize, useSimpleDesign } = styleState;

  // Конфигурация для полоски
  const dividerStyles = useA4Size
    ? { width: 580, left: 107 }  // ширина меньше, чтобы не выходить за края
    : { width: 700, left: 100 }; // оригинальный размер

  return (
    <Stack justifyContent="center" alignItems="center">
      <span style={{ display: "flex", alignItems: "center" }}>
        <Divider
          sx={{
            position: "absolute",
            borderColor: "rgba(0, 0, 0, 0.25)",
            width: dividerStyles.width,
            left: dividerStyles.left,
          }}
        />
        {!useSimpleDesign && image ? (
          <img src={image} style={{ height: 100, position: "relative" }} />
        ) : null}
        <Typography
          textAlign="center"
		  fontSize={titleFontSize}
          variant="scriptName"
          position="relative"
          sx={{
            ...(useSimpleDesign
              ? {
                  fontWeight: "normal",
                  background: "none",
                  WebkitBackgroundClip: "unset",
                  WebkitTextFillColor: "unset",
                  color: "black",
                }
              : {
                  background:
                    "-webkit-radial-gradient(rgb(200, 50, 50), rgb(100, 75, 75))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }),
          }}
        >
          {title}
        </Typography>
      </span>
    </Stack>
  );
};

export default ScriptHeader;
