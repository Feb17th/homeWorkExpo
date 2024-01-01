import React from "react";
import * as Localization from "expo-localization";
import { i18n, Language } from "@/Localization";
import { NativeBaseProvider } from "native-base";
import { store, persistor } from "@/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApplicationNavigator } from "./Navigation";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { DarkTheme, LightTheme } from "./Theme/theme";

i18n.locale = Localization.locale;
i18n.enableFallback = true;
i18n.defaultLocale = Language.ENGLISH;

const AppWrapper = () => {
  const isSwitchOn = useSelector((state: any) => state.switch.isSwitchOn);

  return (
    <PaperProvider theme={isSwitchOn === true ? DarkTheme : LightTheme}>
      <ApplicationNavigator />
      <Toast />
    </PaperProvider>
  );
};

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppWrapper />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
}
