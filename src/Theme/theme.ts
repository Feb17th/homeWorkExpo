import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

export const LightTheme = {
  ...MD3LightTheme,
  // myOwnProperty: true,
  colors: {
    ...MD3LightTheme.colors,
    settings: "#ffffff",
    textSettings: "#000",
  },
};

export const DarkTheme = {
  ...MD3DarkTheme,
  // myOwnProperty: true,
  colors: {
    ...MD3DarkTheme.colors,
    settings: "#202020",
    textSettings: "#fff",
  },
};
