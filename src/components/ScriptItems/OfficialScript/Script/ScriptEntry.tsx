import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import { Character } from "contexts/AppContext";
import { useStylingContext } from "contexts/StylingContext";

const COLORS = {
  good: "rgb(35, 90, 180)",      // синий
  evil: "rgb(150, 30, 30)",      // красный
  traveller: "rgb(128, 0, 128)", // фиолетовый
  fabled: "rgb(200, 160, 65)",   // золотой
};

const getTeamColor = (team: string): string | null => {
  switch (team) {
    case "townsfolk":
    case "outsider": return COLORS.good;
    case "minion":
    case "demon": return COLORS.evil;
    case "traveller": return COLORS.traveller;
    case "fabled": return COLORS.fabled;
    default: return null;
  }
};

const getColorForWord = (word: string): string | null => {
  const lower = word.toLowerCase();

  if (lower.startsWith("до") || lower.startsWith("г") || lower.startsWith("и")) {
    return COLORS.good;
  }
  if (lower.startsWith("з") || lower.startsWith("п") || lower.startsWith("де")) {
    return COLORS.evil;
  }
  if (lower.startsWith("с")) {
    return COLORS.traveller;
  }
  return null;
};

const getColorByCode = (code: string): string | null => {
  switch (code) {
    case 'g': return COLORS.good;
    case 'e': return COLORS.evil;
    case 't': return COLORS.traveller;
    case 'f': return COLORS.fabled;
    default: return null;
  }
};

const highlightText = (text: string) => {
  // Ищем <...> и {...}
  const regex = /<([^>]+)>|{([^}]+)}/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // <...> — жирный без скобок
      parts.push(<strong key={key++}>{match[1]}</strong>);
    } else if (match[2]) {
      // {...} — цветное выделение
      const content = match[2];
      let color = null;
      let displayText = content;

      if (content.includes('@')) {
        // Формат {g@...}
        const [code, ...rest] = content.split('@');
        const restText = rest.join('@');
        color = getColorByCode(code);
        displayText = restText;
      } else {
        color = getColorForWord(content);
      }

      if (color) {
        parts.push(
          <span key={key++} style={{ color, fontWeight: 'bold' }}>
            {displayText}
          </span>
        );
      } else {
        parts.push(displayText);
      }
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

// вынести в переключатель
const isJustified = true;

const ScriptEntry: React.FC<{ character: Character }> = ({ character }) => {
  const {
    styleState: { HOMEBREW, OFFICIAL, fabledImageOffset, fabledRowSize, rowSize, roleSpacing, nameFontSize, fontSize },
  } = useStylingContext();

  const teamColor = getTeamColor(character.team);

  const image =
    typeof character.image === "string" ? character.image : character.image[0];

  return (
	/*<Stack mb={roleSpacing * 0.1}>
	  <Stack direction="row" alignItems="flex-start" spacing={0} sx={{ position: "relative" }}>
		<img
		  src={image}
		  height={character.official ? OFFICIAL.imageSize : HOMEBREW.imageSize}
		  style={{
		  position: "absolute",
		  left: character.official ? OFFICIAL.imagePosition : HOMEBREW.imagePosition,
		  top: "50%",
		  transform: "translateY(-50%)",
		}}
		/>
		<Stack
		  position="relative"
		  left={character.official ? OFFICIAL.abilityTextPosition : HOMEBREW.abilityTextPosition}
		  sx={{ paddingLeft: `${character.official ? OFFICIAL.imageSize : HOMEBREW.imageSize}px` }}
		>
		  <Typography color={teamColor} fontWeight="bold" fontSize={nameFontSize} variant="script">
			{character.name}
		  </Typography>
		  <Stack>
			<Typography variant="script" fontSize={fontSize} sx={{ textAlign: isJustified ? "justify" : "left" }}>
			  {highlightText(character.ability)}
			</Typography>
		  </Stack>
		</Stack>
	  </Stack>
	</Stack>*/
	<Stack mb={roleSpacing * 0.1} sx={{ minHeight: character.team === "fabled" && fabledRowSize !== 0 ? fabledRowSize : rowSize }}>
	  <Stack direction="row" alignItems="flex-start" spacing={0} sx={{ position: "relative" }}>
		<img
		  src={image}
		  height={character.official ? OFFICIAL.imageSize : HOMEBREW.imageSize}
		  style={{
			position: "absolute",
			left: character.official ? OFFICIAL.imagePosition : HOMEBREW.imagePosition,
			top: character.team === "fabled" && fabledImageOffset !== 0 ? fabledImageOffset : (character.official ? OFFICIAL.imageOffset : HOMEBREW.imageOffset),
			transform: "none",
		  }}
		/>
		<Stack
		  position="relative"
		  left={character.official ? OFFICIAL.abilityTextPosition : HOMEBREW.abilityTextPosition}
		  sx={{ paddingLeft: `${character.official ? OFFICIAL.imageSize : HOMEBREW.imageSize}px` }}
		>
		  <Typography color={teamColor} fontWeight="bold" fontSize={nameFontSize} variant="script">
			{character.name}
		  </Typography>
		  <Stack>
			<Typography variant="script" fontSize={fontSize} sx={{ textAlign: isJustified ? "justify" : "left" }}>
			  {highlightText(character.ability)}
			</Typography>
		  </Stack>
		</Stack>
	  </Stack>
	</Stack>
    /*<Stack direction="row" alignItems="center" spacing={0} height={rowSize}>
      <img
        src={image}
        height={character.official ? OFFICIAL.imageSize : HOMEBREW.imageSize}
        style={{
          position: "relative",
          left: character.official
            ? OFFICIAL.imagePosition
            : HOMEBREW.imagePosition,
        }}
      />
      <Stack
        position="relative"
		alignSelf="flex-start"
        left={
          character.official
            ? OFFICIAL.abilityTextPosition
            : HOMEBREW.abilityTextPosition
        }
      >
        <Typography color={teamColor} fontWeight="bold" fontSize={nameFontSize} variant="script">
          {character.name}
        </Typography>
        <Stack>
          <Typography variant="script" fontSize={fontSize} sx={{ textAlign: isJustified ? "justify" : "left" }}>
            {highlightText(character.ability)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>*/
  );
};

export default ScriptEntry;
