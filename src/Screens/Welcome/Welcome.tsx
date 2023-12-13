import React, { useState } from "react";
import { i18n, LocalizationKey } from "@/Localization";
import { View, Text, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "native-base";
import { RootScreens } from "..";
import AppIntroSlider from "react-native-app-intro-slider";
import { COLORS, SIZES } from "../../Theme/ColorOnboarding";

export const Welcome = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  const buttonLabel = (label: any) => {
    return (
      <View
        style={{
          padding: 12,
        }}
      >
        <Text
          style={{
            color: COLORS.title,
            fontWeight: "600",
            fontSize: SIZES.h4,
          }}
        >
          {label}
        </Text>
      </View>
    );
  };

  return (
    <AppIntroSlider
      style={{
        backgroundColor: "#101010",
      }}
      data={slides}
      renderItem={({ item }) => {
        return (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              padding: 15,
              paddingTop: 100,
            }}
          >
            <Image
              source={item.image}
              style={{
                width: SIZES.width - 80,
                height: 400,
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontWeight: "bold",
                color: COLORS.title,
                fontSize: SIZES.h1,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                textAlign: "center",
                paddingTop: 5,
                color: COLORS.title,
              }}
            >
              {item.description}
            </Text>
          </View>
        );
      }}
      activeDotStyle={{
        backgroundColor: COLORS.primary,
        width: 30,
      }}
      showSkipButton
      renderNextButton={() => buttonLabel("Next")}
      renderSkipButton={() => buttonLabel("Skip")}
      renderDoneButton={() => buttonLabel("Done")}
      onDone={() => {
        props.onNavigate(RootScreens.MAIN);
      }}
    />
  );
};

const slides = [
  {
    id: 1,
    title: "Chào mừng đến với QR Find Place",
    description:
      "Ứng dụng này được phát triển bởi sinh viên trường đại học Bách Khoa",
    image: require("../../Images/OnBoarding_1.png"),
  },
  {
    id: 2,
    title: "Chức năng chính của ứng dụng",
    description:
      "Bạn có thể quét mã QR để biết thêm thông tin chi tiết của nơi bạn đang đứng.",
    image: require("../../Images/OnBoarding_2.png"),
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
