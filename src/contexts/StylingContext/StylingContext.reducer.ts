import { useReducer } from "react";

export enum ActionTypes {
  SET_FABLED_SOLO_PERCENTAGE = "SET_FABLED_SOLO_PERCENTAGE",
  SET_FABLED_IMAGE_OFFSET = "SET_FABLED_IMAGE_OFFSET",
  SET_FABLED_ROW_SIZE = "SET_FABLED_ROW_SIZE",
  SET_LEFT_COLUMN_TOWNSFOLK_COUNT = "SET_LEFT_COLUMN_TOWNSFOLK_COUNT",
  SET_IMAGE_SIZE = "SET_IMAGE_SIZE",
  SET_IMAGE_POSITION = "SET_IMAGE_POSITION",
  SET_IMAGE_OFFSET = "SET_IMAGE_OFFSET",
  SET_ROW_SIZE = "SET_ROW_SIZE",
  SET_ROLE_SPACING = "SET_ROLE_SPACING",
  SET_TITLE_FONT_SIZE = "SET_TITLE_FONT_SIZE",
  SET_TYPE_FONT_SIZE = "SET_TYPE_FONT_SIZE",
  SET_NAME_FONT_SIZE = "SET_NAME_FONT_SIZE",
  SET_FONT_SIZE = "SET_FONT_SIZE",
  SET_ABILITY_TEXT_POSITION = "SET_ABILITY_TEXT_POSITION",
  SET_NAME_TEXT_POSITION = "SET_NAME_TEXT_POSITION",
  SET_PAGE_X_POSITION = "SET_PAGE_X_POSITION",
  SET_PAGE_Y_POSITION = "SET_PAGE_Y_POSITION",
  SET_TAB_HEADER_OFFSET = "SET_TAB_HEADER_OFFSET",
  SET_AUTHOR_OFFSET = "SET_AUTHOR_OFFSET",
  SET_USE_A4_SIZE = "SET_USE_A4_SIZE",
  SET_USE_SIMPLE_DESIGN = "SET_USE_SIMPLE_DESIGN",
}
type setFabledSoloPercentage = {
  type: ActionTypes.SET_FABLED_SOLO_PERCENTAGE;
  value: number;
};
type setfabledImageOffset = {
  type: ActionTypes.SET_FABLED_IMAGE_OFFSET;
  value: number;
};
type setFabledRowSize = {
  type: ActionTypes.SET_FABLED_ROW_SIZE;
  value: number;
};
type setLeftColumnTownsfolkCount = {
  type: ActionTypes.SET_LEFT_COLUMN_TOWNSFOLK_COUNT;
  value: number;
};
type setImageSize = {
  type: ActionTypes.SET_IMAGE_SIZE;
  version: "HOMEBREW" | "OFFICIAL";
  value: number;
};
type setImagePosition = {
  type: ActionTypes.SET_IMAGE_POSITION;
  version: "HOMEBREW" | "OFFICIAL";
  value: number;
};
type setImageOffset = {
  type: ActionTypes.SET_IMAGE_OFFSET;
  version: "HOMEBREW" | "OFFICIAL";
  value: number;
};
type setAbilityTextPosition = {
  type: ActionTypes.SET_ABILITY_TEXT_POSITION;
  version: "HOMEBREW" | "OFFICIAL";
  value: number;
};
type setNameTextPosition = {
  type: ActionTypes.SET_NAME_TEXT_POSITION;
  version: "HOMEBREW" | "OFFICIAL";
  value: number;
};
type setRowSize = {
  type: ActionTypes.SET_ROW_SIZE;
  value: number;
};
type setRoleSpacing = {
  type: ActionTypes.SET_ROLE_SPACING;
  value: number;
};
type setTitleFontSize = {
  type: ActionTypes.SET_TITLE_FONT_SIZE;
  value: number;
};
type setTypeFontSize = {
  type: ActionTypes.SET_TYPE_FONT_SIZE;
  value: number;
};
type setNameFontSize = {
  type: ActionTypes.SET_NAME_FONT_SIZE;
  value: number;
};
type setFontSize = {
  type: ActionTypes.SET_FONT_SIZE;
  value: number;
};
type setPageXPosition = {
  type: ActionTypes.SET_PAGE_X_POSITION;
  value: number;
};
type setPageYPosition = {
  type: ActionTypes.SET_PAGE_Y_POSITION;
  value: number;
};
type setTabHeaderOffset = {
  type: ActionTypes.SET_TAB_HEADER_OFFSET;
  value: number;
};
type setAuthorOffset = {
  type: ActionTypes.SET_AUTHOR_OFFSET;
  value: number;
};
type setUseA4Size = {
  type: ActionTypes.SET_USE_A4_SIZE;
  value: boolean;
};
type setUseSimpleDesign = {
  type: ActionTypes.SET_USE_SIMPLE_DESIGN;
  value: boolean;
};

type State = {
  fabledSoloPercentage: number;
  fabledImageOffset: number;
  fabledRowSize: number;
  leftColumnTownsfolkCount: number;
  HOMEBREW: {
    imageSize: number;
    imagePosition: number;
	imageOffset: number;
    abilityTextPosition: number;
    nameTextPosition: number;
  };
  OFFICIAL: {
    imageSize: number;
    imagePosition: number;
	imageOffset: number;
    abilityTextPosition: number;
    nameTextPosition: number;
  };
  rowSize: number;
  roleSpacing: number;
  titleFontSize: number;
  typeFontSize: number;
  nameFontSize: number;
  fontSize: number;
  pageXPosition: number;
  pageYPosition: number;
  tabHeaderOffset: number;
  authorOffset: number;
  useA4Size: boolean;
  useSimpleDesign: boolean;
};

type Action =
  | setFabledSoloPercentage
  | setfabledImageOffset
  | setFabledRowSize
  | setLeftColumnTownsfolkCount
  | setImageSize
  | setImagePosition
  | setImageOffset
  | setRowSize
  | setRoleSpacing
  | setTitleFontSize
  | setTypeFontSize
  | setNameFontSize
  | setFontSize
  | setAbilityTextPosition
  | setNameTextPosition
  | setPageXPosition
  | setPageYPosition
  | setTabHeaderOffset
  | setAuthorOffset
  | setUseA4Size
  | setUseSimpleDesign;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_FABLED_SOLO_PERCENTAGE:
      return {
        ...state,
        fabledSoloPercentage: action.value,
      };
    case ActionTypes.SET_FABLED_IMAGE_OFFSET:
      return {
        ...state,
        fabledImageOffset: action.value,
      };
    case ActionTypes.SET_FABLED_ROW_SIZE:
      return {
        ...state,
        fabledRowSize: action.value,
      };
    case ActionTypes.SET_LEFT_COLUMN_TOWNSFOLK_COUNT:
      return {
        ...state,
        leftColumnTownsfolkCount: action.value,
      };
    case ActionTypes.SET_IMAGE_SIZE:
      return {
        ...state,
        [action.version]: {
          ...state[action.version],
          imageSize: action.value,
        },
      };
    case ActionTypes.SET_IMAGE_POSITION:
      return {
        ...state,
        [action.version]: {
          ...state[action.version],
          imagePosition: action.value,
        },
      };
	case ActionTypes.SET_IMAGE_OFFSET:
	  return {
		...state,
		[action.version]: {
		  ...state[action.version],
		  imageOffset: action.value,
		},
	  };
    case ActionTypes.SET_ABILITY_TEXT_POSITION:
      return {
        ...state,
        [action.version]: {
          ...state[action.version],
          abilityTextPosition: action.value,
        },
      };
    case ActionTypes.SET_NAME_TEXT_POSITION:
      return {
        ...state,
        [action.version]: {
          ...state[action.version],
          nameTextPosition: action.value,
        },
      };
    case ActionTypes.SET_ROW_SIZE:
      return {
        ...state,
        rowSize: action.value,
      };
    case ActionTypes.SET_ROLE_SPACING:
      return {
        ...state,
        roleSpacing: action.value,
      };
    case ActionTypes.SET_TITLE_FONT_SIZE:
      return {
        ...state,
        titleFontSize: action.value,
      };
	case ActionTypes.SET_TYPE_FONT_SIZE:
	  return {
		...state,
		typeFontSize: action.value,
	  };
	case ActionTypes.SET_NAME_FONT_SIZE:
	  return {
		...state,
		nameFontSize: action.value,
	  };
    case ActionTypes.SET_FONT_SIZE:
      return {
        ...state,
        fontSize: action.value,
      };
    case ActionTypes.SET_PAGE_X_POSITION:
      return {
        ...state,
        pageXPosition: action.value,
      };
    case ActionTypes.SET_PAGE_Y_POSITION:
      return {
        ...state,
        pageYPosition: action.value,
      };
	case ActionTypes.SET_TAB_HEADER_OFFSET:
	  return {
		...state,
		tabHeaderOffset: action.value,
	  };
	case ActionTypes.SET_AUTHOR_OFFSET:
	  return {
		...state,
		authorOffset: action.value,
	  };
	case ActionTypes.SET_USE_A4_SIZE:
	  return {
		...state,
		useA4Size: action.value,
	  };
	case ActionTypes.SET_USE_SIMPLE_DESIGN:
	  return {
		...state,
		useSimpleDesign: action.value,
	  };
    default:
      return state;
  }
};

const customScriptPreset: State = {
  fabledSoloPercentage: 50,
  fabledImageOffset: 0,
  fabledRowSize: 0,
  leftColumnTownsfolkCount: 0,
  HOMEBREW: {
    imageSize: 60,
    imagePosition: 0,
	imageOffset: -10,
    abilityTextPosition: -25,
    nameTextPosition: 0,
  },
  OFFICIAL: {
    imageSize: 50,
    imagePosition: 5,
	imageOffset: -10,
    abilityTextPosition: -15,
    nameTextPosition: 8,
  },
  rowSize: 40,
  roleSpacing: 5,
  titleFontSize: 48,
  typeFontSize: 12,
  nameFontSize: 16,
  fontSize: 14,
  pageXPosition: 0,
  pageYPosition: 0,
  tabHeaderOffset: 1,
  authorOffset: 3,
  useA4Size: true,
  useSimpleDesign: true,
};
const officialScriptPreset: State = {
  fabledSoloPercentage: 50,
  fabledImageOffset: 0,
  fabledRowSize: 0,
  leftColumnTownsfolkCount: 0,
  HOMEBREW: {
    imageSize: 95,
    imagePosition: 0,
	imageOffset: -10,
    abilityTextPosition: 0,
    nameTextPosition: 0,
  },
  OFFICIAL: {
    imageSize: 95,
    imagePosition: 0,
	imageOffset: -15,
    abilityTextPosition: 0,
    nameTextPosition: 0,
  },
  rowSize: 60,
  roleSpacing: 5,
  titleFontSize: 48,
  typeFontSize: 12,
  nameFontSize: 16,
  fontSize: 13,
  pageXPosition: 0,
  pageYPosition: 0,
  tabHeaderOffset: 1,
  authorOffset: 3,
  useA4Size: true,
  useSimpleDesign: true,
};
const customNightOrderPreset: State = {
  fabledSoloPercentage: 50,
  fabledImageOffset: 0,
  fabledRowSize: 0,
  leftColumnTownsfolkCount: 0,
  HOMEBREW: {
    imageSize: 60,
    imagePosition: 0,
	imageOffset: -10,
    abilityTextPosition: 0,
    nameTextPosition: 10,
  },
  OFFICIAL: {
    imageSize: 40,
    imagePosition: 5,
	imageOffset: -10,
    abilityTextPosition: 0,
    nameTextPosition: 10,
  },
  rowSize: 50,
  roleSpacing: 5,
  titleFontSize: 48,
  typeFontSize: 12,
  nameFontSize: 16,
  fontSize: 14,
  pageXPosition: 0,
  pageYPosition: 0,
  tabHeaderOffset: 1,
  authorOffset: 3,
  useA4Size: true,
  useSimpleDesign: true,
};
const officialNightOrderPreset: State = {
  fabledSoloPercentage: 50,
  fabledImageOffset: 0,
  fabledRowSize: 0,
  leftColumnTownsfolkCount: 0,
  HOMEBREW: {
    imageSize: 50,
    imagePosition: 0,
	imageOffset: -10,
    abilityTextPosition: 0,
    nameTextPosition: 0,
  },
  OFFICIAL: {
    imageSize: 50,
    imagePosition: 5,
	imageOffset: -10,
    abilityTextPosition: 0,
    nameTextPosition: 0,
  },
  rowSize: 50,
  roleSpacing: 5,
  titleFontSize: 48,
  typeFontSize: 12,
  nameFontSize: 16,
  fontSize: 14,
  pageXPosition: 0,
  pageYPosition: 0,
  tabHeaderOffset: 1,
  authorOffset: 3,
  useA4Size: true,
  useSimpleDesign: true,
};

const useStylingContextReducer = (
  style: "OFFICIAL" | "CUSTOM",
  item: "SCRIPT" | "NIGHT_ORDER"
): [State, React.Dispatch<Action>] => {
  const officialScriptReducer = reducer;
  const customScriptReducer = reducer;
  const officialNightOrderReducer = reducer;
  const customNightOrderReducer = reducer;
  if (style === "CUSTOM" && item === "SCRIPT") {
    return useReducer(customScriptReducer, customScriptPreset);
  } else if (style === "OFFICIAL" && item === "SCRIPT") {
    return useReducer(officialScriptReducer, officialScriptPreset);
  } else if (style === "CUSTOM" && item === "NIGHT_ORDER") {
    return useReducer(customNightOrderReducer, customNightOrderPreset);
  } else if (style === "OFFICIAL" && item === "NIGHT_ORDER") {
    return useReducer(officialNightOrderReducer, officialNightOrderPreset);
  }
};

export default useStylingContextReducer;
