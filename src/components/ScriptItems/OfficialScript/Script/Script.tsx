import React, { useEffect, useRef } from "react";
import { Stack } from "@mui/material";
import { useAppContext } from "contexts/AppContext";
import ScriptEntry from "./ScriptEntry";
import ScriptTabHeader from "./ScriptTabHeader";
import ScriptDivider from "./ScriptDivider";
import ScriptSideBar from "./ScriptSideBar";
import ScriptFooter from "./ScriptFooter";
import ScriptHeader from "./ScriptHeader";
import StyledPaper from "components/StyledPaper";
import { useStylingContext } from "contexts/StylingContext";

const showTravellers = false;  // флаг для показа странников

function splitArray<T>(array: T[], leftCount?: number): [T[], T[]] {
  const midIndex = (leftCount !== undefined && leftCount !== 0) ? leftCount : Math.round(array.length / 2);
  const leftArray = array.slice(0, midIndex);
  const rightArray = array.slice(midIndex);
  return [leftArray, rightArray];
}

const Script: React.FC = () => {
  const scriptRef = useRef();
  const {
    appState: { scriptName, authorName, scriptLogo, characterList },
    setScriptRefs,
  } = useAppContext();

  const {
    styleState: { pageXPosition, pageYPosition, fabledSoloPercentage, leftColumnTownsfolkCount, tabHeaderOffset, useA4Size },
  } = useStylingContext();

  useEffect(() => {
    setScriptRefs([scriptRef, null]);
  }, [scriptRef]);

  const townsfolk = characterList.filter((char) => char.team === "townsfolk");
  const [leftTownsfolk, rightTownsfolk] = splitArray(townsfolk, leftColumnTownsfolkCount);
  const outsiders = characterList.filter((char) => char.team === "outsider");
  const [leftOutsiders, rightOutsiders] = splitArray(outsiders);
  const minions = characterList.filter((char) => char.team === "minion");
  const [leftMinions, rightMinions] = splitArray(minions);
  const demons = characterList.filter((char) => char.team === "demon");
  const [leftDemons, rightDemons] = splitArray(demons);
  const travellers = characterList.filter((char) => char.team === "traveller");
  const [leftTravellers, rightTravellers] = splitArray(travellers);
  const fabled = characterList.filter((char) => char.team === "fabled");
  const [leftFabled, rightFabled] = splitArray(fabled);

  // добавляем смещение для правого блока при нечётном количестве ролей
  /*if (leftTownsfolk.length !== rightTownsfolk.length) {
    rightTownsfolk.unshift({
      id: "blank",
      name: "",
      team: "townsfolk",
      ability: "",
      image: "",
      official: false,
    });
  }*/

  // Параметр ширины столбцов в зависимости от useA4Size
  const roleColumnMaxWidth = useA4Size ? 375 : 425;
  const roleColumnWidth = "50%";
  
  const spaces = "ㅤ".repeat(tabHeaderOffset || 0);

  return (
    <StyledPaper ref={scriptRef}>
      <ScriptSideBar />
      <ScriptHeader title={scriptName} image={scriptLogo} />
      <Stack position="relative" top={pageYPosition}>
        {fabled.length > 0 && (
          <>
            <Stack direction="row">
              <ScriptTabHeader title="ㅤ" />
              <Stack
                direction="row"
                position="relative"
                left={pageXPosition}
                width="100%"
              >
                {fabled.length === 1 && fabledSoloPercentage !== 50 ? (
                  <Stack maxWidth={roleColumnMaxWidth * 2} width={`${fabledSoloPercentage}%`}>
                    <ScriptEntry character={fabled[0]} key={fabled[0].id} />
                  </Stack>
                ) : (
                  <>
                    <Stack maxWidth={roleColumnMaxWidth} width={roleColumnWidth}>
                      {leftFabled.map((char) => (
                        <ScriptEntry character={char} key={char.id} />
                      ))}
                    </Stack>
                    <Stack maxWidth={roleColumnMaxWidth} width={roleColumnWidth}>
                      {rightFabled.map((char) => (
                        <ScriptEntry character={char} key={char.id} />
                      ))}
                    </Stack>
                  </>
                )}
              </Stack>
            </Stack>
            <ScriptDivider />
          </>
        )}
        <Stack direction="row">
          <ScriptTabHeader title={`ГОРОЖАНЕ${spaces}`} />
          <Stack
            direction="row"
            position="relative"
            left={pageXPosition}
            width={"100%"}
          >
            <Stack maxWidth={roleColumnMaxWidth} width={roleColumnWidth}>
              {leftTownsfolk.map((char) => (
                <ScriptEntry character={char} key={char.id} />
              ))}
            </Stack>
            <Stack maxWidth={roleColumnMaxWidth} width={roleColumnWidth}>
              {rightTownsfolk.map((char) => (
                <ScriptEntry character={char} key={char.id} />
              ))}
            </Stack>
          </Stack>
        </Stack>
        <ScriptDivider />
        <Stack direction="row">
          <ScriptTabHeader title={`ИЗГОИ${spaces}`} />
          <Stack
            direction="row"
            position="relative"
            left={pageXPosition}
            width={"100%"}
          >
            <Stack maxWidth={roleColumnMaxWidth} width={roleColumnWidth}>
              {leftOutsiders.map((char) => (
                <ScriptEntry character={char} key={char.id} />
              ))}
            </Stack>
            <Stack maxWidth={roleColumnMaxWidth} width={roleColumnWidth}>
              {rightOutsiders.map((char) => (
                <ScriptEntry character={char} key={char.id} />
              ))}
            </Stack>
          </Stack>
        </Stack>
        <ScriptDivider />
        <Stack direction="row">
          <ScriptTabHeader title={`ПРИСПЕШНИКИ${spaces}`} />
          <Stack
            direction="row"
            position="relative"
            left={pageXPosition}
            width={"100%"}
          >
            <Stack maxWidth={roleColumnMaxWidth} width={roleColumnWidth}>
              {leftMinions.map((char) => (
                <ScriptEntry character={char} key={char.id} />
              ))}
            </Stack>
            <Stack maxWidth={roleColumnMaxWidth} width={roleColumnWidth}>
              {rightMinions.map((char) => (
                <ScriptEntry character={char} key={char.id} />
              ))}
            </Stack>
          </Stack>
        </Stack>
        <ScriptDivider />
        <Stack direction="row">
          <ScriptTabHeader title={`ДЕМОНЫ${spaces}`} />
          <Stack
            direction="row"
            position="relative"
            left={pageXPosition}
            width={"100%"}
          >
            <Stack maxWidth={roleColumnMaxWidth} width={roleColumnWidth}>
              {leftDemons.map((char) => (
                <ScriptEntry character={char} key={char.id} />
              ))}
            </Stack>
            <Stack maxWidth={roleColumnMaxWidth} width={roleColumnWidth}>
              {rightDemons.map((char) => (
                <ScriptEntry character={char} key={char.id} />
              ))}
            </Stack>
          </Stack>
        </Stack>
        {showTravellers && travellers.length > 0 && (
          <>
            <ScriptDivider />
            <Stack direction="row">
              <ScriptTabHeader title={`СТРАННИКИ${spaces}`} />
              <Stack
                direction="row"
                position="relative"
                left={pageXPosition}
                width={"100%"}
              >
                <Stack maxWidth={roleColumnMaxWidth} width={roleColumnWidth}>
                  {leftTravellers.map((char) => (
                    <ScriptEntry character={char} key={char.id} />
                  ))}
                </Stack>
                <Stack maxWidth={roleColumnMaxWidth} width={roleColumnWidth}>
                  {rightTravellers.map((char) => (
                    <ScriptEntry character={char} key={char.id} />
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </>
        )}
      </Stack>
      <ScriptFooter author={authorName} />
    </StyledPaper>
  );
};

export default Script;
