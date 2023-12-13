import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeContainer } from "@/Screens/Home";
import {
  Ionicons,
  FontAwesome,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import * as Font from "expo-font";
import { MyProfile } from "@/Screens/MyProfile/MyProfile";
import { Settings } from "@/Screens/Settings/Settings";
import { Save } from "@/Screens/Save/Save";
import { History } from "@/Screens/History/History";

const Tab = createBottomTabNavigator();
type IoniconsNames = any;
export const MainNavigator = () => {
  useEffect(() => {
    Font.loadAsync({
      Ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
    });
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: IoniconsNames;

          switch (route.name) {
            case "Home":
              return <FontAwesome name="home" size={24} color={color} />;
            case "Settings":
              return (
                <Ionicons name="settings-outline" size={24} color={color} />
              );
            case "MyProfile":
              return <AntDesign name="profile" size={24} color={color} />;
            case "History":
              return <MaterialIcons name="history" size={30} color={color} />;
            case "Save":
              return <AntDesign name="hearto" size={24} color={color} />;
            default:
              return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          title: "Trang chủ",
        }}
      />
      <Tab.Screen
        name="Save"
        component={Save}
        options={{
          title: "Đã lưu",
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          title: "Lịch sử",
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          title: "MyProfile",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Cài đặt",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
