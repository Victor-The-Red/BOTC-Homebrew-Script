import React from "react";
import { Stack } from "@mui/material";
import SaveImageButton from "components/SaveImageButton";
import Script from "./Script";
import NightOrder from "./NightOrder";
import { StylingContextProvider } from "contexts/StylingContext";
import StyleConfig from "components/ScriptItems/StyleConfig";
import { DEV_MODE } from "App";

const OfficialScript: React.FC = () => {
  return (
    <Stack spacing={6}>
      {/* SCRIPT BLOCK */}
      <Stack direction="row" spacing={4} alignItems="flex-start">
        <StylingContextProvider style="OFFICIAL" item="SCRIPT">
          {/* Превью */}
          <Script />

          {/* Параметры + кнопка */}
          <Stack spacing={2} minWidth={350} maxHeight="90vh" overflow="auto">
            <StyleConfig style="OFFICIAL" item="SCRIPT" />
            <SaveImageButton item="SCRIPT" />
          </Stack>
        </StylingContextProvider>
      </Stack>

      {/* NIGHT ORDER BLOCK */}
      {DEV_MODE && (
        <Stack direction="row" spacing={4} alignItems="flex-start">
          <StylingContextProvider style="OFFICIAL" item="NIGHT_ORDER">
            <NightOrder />
            <Stack spacing={2} minWidth={350} maxHeight="90vh" overflow="auto">
              <StyleConfig style="OFFICIAL" item="NIGHT_ORDER" />
              <SaveImageButton item="NIGHT_ORDER" />
            </Stack>
          </StylingContextProvider>
        </Stack>
      )}
    </Stack>
  );
};


export default OfficialScript;
