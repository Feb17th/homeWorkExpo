import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./Main";
import { WelcomeContainer } from "@/Screens/Welcome";
import { Login } from "@/Screens/Login/Login";
import { RootScreens } from "@/Screens";
import { EditProfile } from "@/Screens/MyProfile/EditProfile";

export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.ONBOARDING]: undefined;
  [RootScreens.AUTHENTICATION]: undefined;
  [RootScreens.EDIT_PROFILE]: undefined;
  [RootScreens.MY_PROFILE]: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <RootStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={RootScreens.ONBOARDING}
      >
        <RootStack.Screen
          name={RootScreens.ONBOARDING}
          component={WelcomeContainer}
        />
        <RootStack.Screen
          name={RootScreens.MAIN}
          component={MainNavigator}
          options={{}}
        />
        <RootStack.Screen
          name={RootScreens.AUTHENTICATION}
          component={Login}
          options={{}}
        />
        <RootStack.Screen
          name={RootScreens.EDIT_PROFILE}
          component={EditProfile}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
