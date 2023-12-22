import React from "react";
import * as Localization from "expo-localization";
import { i18n, Language } from "@/Localization";
import { NativeBaseProvider } from "native-base";
import { store, persistor } from "@/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApplicationNavigator } from "./Navigation";
import { PaperProvider } from "react-native-paper";
import { useColorScheme } from "react-native";
import { DarkTheme, LightTheme } from "./Theme/theme";
import Toast from "react-native-toast-message";

i18n.locale = Localization.locale;
i18n.enableFallback = true;
i18n.defaultLocale = Language.ENGLISH;

export default function App() {
  const scheme = useColorScheme();

  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={scheme === "dark" ? DarkTheme : LightTheme}>
            <ApplicationNavigator />
            <Toast />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
}
