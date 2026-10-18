import { Grid, Typography } from "@mui/material";
import React from "react";
import { useStylingContext } from "contexts/StylingContext";

const ScriptFooter: React.FC<{ author: string }> = ({ author }) => {
  const { styleState } = useStylingContext();
  const { authorOffset, useA4Size, useSimpleDesign } = styleState;

  const positions = useA4Size
    ? {
        leftLaurelLeft: 276,
        leftCircle: 348,
        leftLaurelRight: 412,
        laurelHeight: 44,
      }
    : {
        leftLaurelLeft: 315,
        leftCircle: 396,
        leftLaurelRight: 456,
        laurelHeight: 50,
      };

  const spaces = "ㅤ".repeat(authorOffset || 0);
  
  const hasAuthor = author && author.trim() !== "";

  if (useSimpleDesign) {
    return (
      <Grid
        container
        columns={15}
        position="absolute"
        bottom={0}
        alignItems="center"
        style={{ height: 60 }}
      >
        <Grid item sm={7} />

        <Grid
          item
          sm={1}
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Typography
            variant="scriptFooter"
            fontSize={14}
            style={{ whiteSpace: "nowrap", textAlign: "center" }}
          >
            *Не в первую ночь
          </Typography>
        </Grid>

        <Grid item sm={4} />

        <Grid item sm={3} style={{ display: "flex", alignItems: "center" }}>
          {hasAuthor && (
            <Typography variant="scriptFooter" style={{ whiteSpace: "pre-line" }}>
              {`${spaces}Script by ${author}`}
            </Typography>
          )}
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container columns={15} position="absolute" bottom={0}>
      <Grid item sm={7} />
      <Grid item sm={1}>
        <img
          src="/laurel.png"
          style={{
            position: "absolute",
            bottom: 0,
            left: positions.leftLaurelLeft,
            height: positions.laurelHeight,
            transform: "scale(-1, 1)",
          }}
        />
        <img
          src="/footer-circle.png"
          style={{ position: "absolute", bottom: -1, left: positions.leftCircle }}
        />
        <img
          src="/laurel.png"
          style={{
            position: "absolute",
            bottom: 0,
            left: positions.leftLaurelRight,
            height: positions.laurelHeight,
          }}
        />
        <Typography
          variant="scriptFooter"
          textAlign="center"
          fontSize={14}
          position="relative"
		  style={{
			whiteSpace: "pre-line",
			display: "inline-block",
			paddingLeft: 4,
		  }}
        >
          *Не в{'\n'}первую{'\n'}ночь
        </Typography>
      </Grid>
      <Grid item sm={4} />
      <Grid item sm={3}>
        {hasAuthor && (
          <Typography variant="scriptFooter" style={{ whiteSpace: "pre-line" }}>
            {`\n${spaces}Script by ${author}`}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default ScriptFooter;
