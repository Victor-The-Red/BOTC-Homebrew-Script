import { Grid, TextField, Switch, FormControlLabel, Button, Stack } from "@mui/material";
import { useStylingContext } from "contexts/StylingContext";
import React, { ChangeEventHandler, ChangeEvent } from "react";
import { useAppContext } from "contexts/AppContext";
import { DEV_MODE } from "App";

const StyleConfig: React.FC<{
  style: "OFFICIAL" | "CUSTOM";
  item: "SCRIPT" | "NIGHT_ORDER";
}> = ({ style, item }) => {
  const { appState: { scriptName } } = useAppContext();
  const {
    styleState,
    setUseA4Size,
	setUseSimpleDesign,
	setCustomScriptHeight,
	setFabledSoloPercentage,
    setFabledImageOffset,
    setFabledRowSize,
	setLeftColumnTownsfolkCount,
    setImageSize,
    setImagePosition,
	setImageOffset,
    setRowSize,
	setRoleSpacing,
	setTitleFontSize,
	setTypeFontSize,
	setNameFontSize,
    setFontSize,
    setAbilityTextPosition,
    setNameTextPosition,
    setPageXPosition,
    setPageYPosition,
	setTabHeaderOffset,
	setAuthorOffset,
  } = useStylingContext();

  const {
    HOMEBREW,
    OFFICIAL,
    useA4Size,
	useSimpleDesign,
	customScriptHeight,
    fabledSoloPercentage,
    fabledImageOffset,
    fabledRowSize,
    leftColumnTownsfolkCount,
    rowSize,
    fontSize,
    pageXPosition,
    pageYPosition,
  } = styleState;
  
  // 💾 Сохранение в JSON файл
  const handleSaveConfig = () => {
	const safeScriptName =
      scriptName && scriptName.trim() !== ""
        ? scriptName.replace(/[\\/:*?"<>|]/g, "_") // убираем недопустимые символы
        : "script";
    const fileName = `${safeScriptName}-config.json`;
    const json = JSON.stringify(styleState, null, 2); // форматированный JSON
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = fileName;
    downloadLink.click();
    URL.revokeObjectURL(url);
  };

  // 📂 Загрузка из JSON файла
  const handleLoadConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);

        // Универсальное применение обычных числовых/логических полей
        const applyConfig: Record<string, (value: any) => void> = {
          useA4Size: setUseA4Size,
          useSimpleDesign: setUseSimpleDesign,
		  customScriptHeight: setCustomScriptHeight,
          fabledSoloPercentage: setFabledSoloPercentage,
          fabledImageOffset: setFabledImageOffset,
          fabledRowSize: setFabledRowSize,
          leftColumnTownsfolkCount: setLeftColumnTownsfolkCount,
          rowSize: setRowSize,
          roleSpacing: setRoleSpacing,
          titleFontSize: setTitleFontSize,
          typeFontSize: setTypeFontSize,
          nameFontSize: setNameFontSize,
          fontSize: setFontSize,
          pageXPosition: setPageXPosition,
          pageYPosition: setPageYPosition,
          tabHeaderOffset: setTabHeaderOffset,
          authorOffset: setAuthorOffset,
        };

        for (const key in applyConfig) {
          if (json[key] !== undefined) {
            applyConfig[key](json[key]);
          }
        }

        // HOMEBREW и OFFICIAL
        const applyVersionConfig = (
          data: any,
          prefix: "HOMEBREW" | "OFFICIAL"
        ) => {
          if (!data) return;
          if (data.imageSize !== undefined) setImageSize(data.imageSize, prefix);
          if (data.imagePosition !== undefined) setImagePosition(data.imagePosition, prefix);
          if (data.imageOffset !== undefined) setImageOffset(data.imageOffset, prefix);
          if (data.abilityTextPosition !== undefined) setAbilityTextPosition(data.abilityTextPosition, prefix);
          if (data.nameTextPosition !== undefined) setNameTextPosition(data.nameTextPosition, prefix);
        };

        applyVersionConfig(json.HOMEBREW, "HOMEBREW");
        applyVersionConfig(json.OFFICIAL, "OFFICIAL");

        //alert("✅ Настройки успешно загружены!");
      } catch (err) {
        alert("❌ Ошибка при чтении файла настроек!");
      }
    };
    reader.readAsText(file);
  };

  const handleToggleA4 = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setUseA4Size(checked);
  };
  const handleToggleSimpleDesign = (event: ChangeEvent<HTMLInputElement>) => {
	const checked = event.target.checked;
	setUseSimpleDesign(checked);
  };

  const itemLabelText = item === "SCRIPT" ? "Script" : "Night Order";

  const handleHomebrewImageSizeChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setImageSize(Number(event.target.value), "HOMEBREW");
  };
  const handleOfficialImageSizeChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setImageSize(Number(event.target.value), "OFFICIAL");
  };
  const handleHomebrewImagePositionChange: ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    setImagePosition(Number(event.target.value), "HOMEBREW");
  };
  const handleOfficialImagePositionChange: ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    setImagePosition(Number(event.target.value), "OFFICIAL");
  };
  const handleHomebrewAbilityPositionChange: ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    setAbilityTextPosition(Number(event.target.value), "HOMEBREW");
  };
  const handleOfficialAbilityPositionChange: ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    setAbilityTextPosition(Number(event.target.value), "OFFICIAL");
  };
  const handleHomebrewNamePositionChange: ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    setNameTextPosition(Number(event.target.value), "HOMEBREW");
  };
  const handleOfficialNamePositionChange: ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    setNameTextPosition(Number(event.target.value), "OFFICIAL");
  };

  const inputProps = { sx: { color: "rgba(255, 255, 255, 0.7)" } };

  return (
    <Grid container width={400} spacing={1} marginTop="5%">
      {/* 🔘 КНОПКИ СОХРАНЕНИЯ/ЗАГРУЗКИ */}
      <Grid item xs={12}>
        <Stack direction="row" spacing={2} justifyContent="center" mb={1}>
          <Button variant="contained" color="primary" onClick={handleSaveConfig}>
            💾 Сохранить
          </Button>
          <Button variant="outlined" color="secondary" component="label">
            📂 Загрузить
			<input
			  type="file"
			  accept="application/json"
			  hidden
			  onChange={handleLoadConfig}
			/>
          </Button>
        </Stack>
      </Grid>
	  {DEV_MODE && (
		<Grid item xs={12}>
		  <FormControlLabel
			control={
			  <Switch
				checked={useA4Size}
				onChange={handleToggleA4}
				color="primary"
			  />
			}
			label="Использовать размер страницы A4"
			sx={{
			  color: "rgba(255, 255, 255, 0.7)"
			}}
		  />
		</Grid>
	  )}
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={useSimpleDesign}
              onChange={handleToggleSimpleDesign}
              color="primary"
            />
          }
          label="Использовать простой дизайн"
		  sx={{
		    color: "rgba(255, 255, 255, 0.7)"
		  }}
        />
      </Grid>
	  <Grid item xs={12}>
		<TextField
		  label="Custom Script Height"
		  type="number"
		  value={customScriptHeight}
		  onChange={(e) => setCustomScriptHeight(Number(e.target.value))}
		  InputProps={inputProps}
		  fullWidth
		/>
	  </Grid>
	  <Grid item xs={6}>
        <TextField
		  label="Fabled Solo Percentage"
		  type="number"
		  value={fabledSoloPercentage}
		  onChange={(e) => setFabledSoloPercentage(Number(e.target.value))}
		  InputProps={inputProps}
		/>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Fabled Image Offset"
          type="number"
          value={fabledImageOffset}
          onChange={(e) => setFabledImageOffset(Number(e.target.value))}
          InputProps={inputProps}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Fabled Row Size"
          type="number"
          value={fabledRowSize}
          onChange={(e) => setFabledRowSize(Number(e.target.value))}
          InputProps={inputProps}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
		  label="Left Column Townsfolk Count"
		  type="number"
		  value={leftColumnTownsfolkCount}
		  onChange={(e) => setLeftColumnTownsfolkCount(Number(e.target.value))}
		  InputProps={inputProps}
		/>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Homebrew Image Size"
          type="number"
          value={HOMEBREW.imageSize}
          onChange={handleHomebrewImageSizeChange}
          InputProps={inputProps}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Homebrew Image Position"
          type="number"
          value={HOMEBREW.imagePosition}
          onChange={handleHomebrewImagePositionChange}
          InputProps={inputProps}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Official Image Size"
          type="number"
          value={OFFICIAL.imageSize}
          onChange={handleOfficialImageSizeChange}
          InputProps={inputProps}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Official Image Position"
          type="number"
          value={OFFICIAL.imagePosition}
          onChange={handleOfficialImagePositionChange}
          InputProps={inputProps}
        />
      </Grid>
	  <Grid item xs={6}>
		<TextField
		  label="Homebrew Image Offset"
		  type="number"
		  value={HOMEBREW.imageOffset}
		  onChange={(e) => setImageOffset(Number(e.target.value), "HOMEBREW")}
		  InputProps={inputProps}
		/>
	  </Grid>
	  <Grid item xs={6}>
		<TextField
		  label="Official Image Offset"
		  type="number"
		  value={OFFICIAL.imageOffset}
		  onChange={(e) => setImageOffset(Number(e.target.value), "OFFICIAL")}
		  InputProps={inputProps}
	    />
	  </Grid>
      {style === "OFFICIAL" || item === "SCRIPT" ? (
        <>
          <Grid item xs={6}>
            <TextField
              label="Homebrew Ability Text Position"
              type="number"
              value={HOMEBREW.abilityTextPosition}
              onChange={handleHomebrewAbilityPositionChange}
              InputProps={inputProps}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Official Ability Text Position"
              type="number"
              value={OFFICIAL.abilityTextPosition}
              onChange={handleOfficialAbilityPositionChange}
              InputProps={inputProps}
            />
          </Grid>
        </>
      ) : null}
      {style === "CUSTOM" || item === "NIGHT_ORDER" ? (
        <>
          <Grid item xs={6}>
            <TextField
              label="Homebrew Name Text Position"
              type="number"
              value={HOMEBREW.nameTextPosition}
              onChange={handleHomebrewNamePositionChange}
              InputProps={inputProps}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Official Name Text Position"
              type="number"
              value={OFFICIAL.nameTextPosition}
              onChange={handleOfficialNamePositionChange}
              InputProps={inputProps}
            />
          </Grid>
        </>
      ) : null}
      <Grid item xs={6}>
        <TextField
          label="Row Size"
          type="number"
          value={rowSize}
          onChange={(event) => setRowSize(Number(event.target.value))}
          InputProps={inputProps}
        />
      </Grid>
	  <Grid item xs={6}>
		<TextField
		  label="Role Spacing"
		  type="number"
		  value={styleState.roleSpacing}
		  onChange={(e) => setRoleSpacing(Number(e.target.value))}
		  InputProps={inputProps}
		/>
	  </Grid>
	  <Grid item xs={6}>
		<TextField
		  label="Title Font Size"
		  type="number"
		  value={styleState.titleFontSize}
		  onChange={(e) => setTitleFontSize(Number(e.target.value))}
		  InputProps={inputProps}
		/>
	  </Grid>
	  <Grid item xs={6}>
		<TextField
		  label="Tab Header Font Size"
		  type="number"
		  value={styleState.typeFontSize}
		  onChange={(e) => setTypeFontSize(Number(e.target.value))}
		  InputProps={inputProps}
		/>
	  </Grid>
	  <Grid item xs={6}>
		<TextField
		  label="Role Name Font Size"
		  type="number"
		  value={styleState.nameFontSize}
		  onChange={(e) => setNameFontSize(Number(e.target.value))}
		  InputProps={inputProps}
		/>
	  </Grid>
      <Grid item xs={6}>
        <TextField
          label="Font Size"
          type="number"
          value={fontSize}
          onChange={(event) => setFontSize(Number(event.target.value))}
          InputProps={inputProps}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label={`${itemLabelText} X Axis Position`}
          type="number"
          value={pageXPosition}
          onChange={(event) => setPageXPosition(Number(event.target.value))}
          InputProps={inputProps}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label={`${itemLabelText} Y Axis Position`}
          type="number"
          value={pageYPosition}
          onChange={(event) => setPageYPosition(Number(event.target.value))}
          InputProps={inputProps}
        />
      </Grid>
	  <Grid item xs={6}>
		<TextField
		  label="Tab Header Offset"
		  type="number"
		  value={styleState.tabHeaderOffset}
		  onChange={(e) => setTabHeaderOffset(Number(e.target.value))}
		  InputProps={inputProps}
		/>
	  </Grid>
	  <Grid item xs={6}>
		<TextField
		  label="Author Offset"
		  type="number"
		  value={styleState.authorOffset}
		  onChange={(e) => setAuthorOffset(Number(e.target.value))}
		  InputProps={inputProps}
		/>
      </Grid>
	</Grid>
  );
};

export default StyleConfig;
