import { useContext } from "react";
import { ActionTypes } from "./StylingContext.reducer";
import { StylingContext } from "./StylingContextProvider";

const useStylingContext = () => {
  const context = useContext(StylingContext);
  const [styleState, dispatch] = context;

  const setFabledSoloPercentage = (value: number) => {
	dispatch({ type: ActionTypes.SET_FABLED_SOLO_PERCENTAGE, value });
  };
  const setFabledImageOffset = (value: number) => {
    dispatch({ type: ActionTypes.SET_FABLED_IMAGE_OFFSET, value });
  };
  const setFabledRowSize = (value: number) => {
    dispatch({ type: ActionTypes.SET_FABLED_ROW_SIZE, value });
  };
  const setLeftColumnTownsfolkCount = (value: number) => {
	dispatch({ type: ActionTypes.SET_LEFT_COLUMN_TOWNSFOLK_COUNT, value });
  };
  const setImageSize = (size: number, version: "HOMEBREW" | "OFFICIAL") => {
    dispatch({ type: ActionTypes.SET_IMAGE_SIZE, version, value: size });
  };
  const setImagePosition = (size: number, version: "HOMEBREW" | "OFFICIAL") => {
    dispatch({ type: ActionTypes.SET_IMAGE_POSITION, version, value: size });
  };
  const setImageOffset = (offset: number, version: "HOMEBREW" | "OFFICIAL") => {
	dispatch({ type: ActionTypes.SET_IMAGE_OFFSET, version, value: offset });
  };
  const setRowSize = (size: number) => {
    dispatch({ type: ActionTypes.SET_ROW_SIZE, value: size });
  };
  const setRoleSpacing = (value: number) => {
    dispatch({ type: ActionTypes.SET_ROLE_SPACING, value });
  };
  const setTitleFontSize = (value: number) => {
    dispatch({ type: ActionTypes.SET_TITLE_FONT_SIZE, value });
  };
  const setTypeFontSize = (size: number) => {
	dispatch({ type: ActionTypes.SET_TYPE_FONT_SIZE, value: size });
  };
  const setNameFontSize = (size: number) => {
	dispatch({ type: ActionTypes.SET_NAME_FONT_SIZE, value: size });
  };
  const setFontSize = (size: number) => {
    dispatch({ type: ActionTypes.SET_FONT_SIZE, value: size });
  };
  const setAbilityTextPosition = (
    position: number,
    version: "HOMEBREW" | "OFFICIAL"
  ) => {
    dispatch({
      type: ActionTypes.SET_ABILITY_TEXT_POSITION,
      version,
      value: position,
    });
  };
  const setNameTextPosition = (
    position: number,
    version: "HOMEBREW" | "OFFICIAL"
  ) => {
    dispatch({
      type: ActionTypes.SET_NAME_TEXT_POSITION,
      version,
      value: position,
    });
  };
  const setPageXPosition = (position: number) => {
    dispatch({ type: ActionTypes.SET_PAGE_X_POSITION, value: position });
  };
  const setPageYPosition = (position: number) => {
    dispatch({ type: ActionTypes.SET_PAGE_Y_POSITION, value: position });
  };
  const setTabHeaderOffset = (value: number) => {
	dispatch({ type: ActionTypes.SET_TAB_HEADER_OFFSET, value });
  };
  const setAuthorOffset = (value: number) => {
	dispatch({ type: ActionTypes.SET_AUTHOR_OFFSET, value });
  };
  const setUseA4Size = (value: boolean) => {
    dispatch({ type: ActionTypes.SET_USE_A4_SIZE, value });
  };
  const setUseSimpleDesign = (value: boolean) => {
	dispatch({ type: ActionTypes.SET_USE_SIMPLE_DESIGN, value });
  };

  return {
    styleState,
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
    setUseA4Size,
	setUseSimpleDesign,
  };
};

export default useStylingContext;
