import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme, Divider, Switch } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FontSize } from "@/Theme/Variables";

export const Settings = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    itemSetting: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    textColor: {
      color: theme.colors.textSettings,
    },
  });

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: theme.colors.settings,
          flex: 1,
          position: "relative",
        }}
      >
        <View
          style={{
            height: 200,
            backgroundColor: "#6DB5CA",
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingTop: 20,
              paddingLeft: 20,
            }}
          >
            <Ionicons
              name="settings-sharp"
              size={FontSize.TITLE + 5}
              color="#fff"
            />
            <Text
              style={{
                fontSize: FontSize.TITLE,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Cài đặt
            </Text>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            top: 100,
            left: 20,
            right: 20,
            bottom: 0,
            backgroundColor: theme.colors.settings,
            gap: 20,
            paddingVertical: 20,
            paddingHorizontal: 20,
            elevation: 5,
            borderRadius: 15,
          }}
        >
          <Text style={styles.textColor}>Icetea1702</Text>
          <Divider />
          <View>
            <Text style={{ color: "#ADADAD" }}>Cài đặt tài khoản</Text>
          </View>
          <View style={styles.itemSetting}>
            <Text style={styles.textColor}>Chỉnh sửa thông tin cá nhân </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              style={styles.textColor}
            />
          </View>
          <View style={styles.itemSetting}>
            <Text style={styles.textColor}>Thay đổi mật khẩu</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              style={styles.textColor}
            />
          </View>
          <View style={styles.itemSetting}>
            <Text style={styles.textColor}>Ngôn ngữ</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              style={styles.textColor}
            />
          </View>
          <View style={styles.itemSetting}>
            <Text style={styles.textColor}>Chế độ tối</Text>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          </View>
          <Divider />
          <View>
            <Text style={{ color: "#ADADAD" }}>Chung</Text>
          </View>
          <View style={styles.itemSetting}>
            <Text style={styles.textColor}>Về chúng tôi</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              style={styles.textColor}
            />
          </View>
          <View style={styles.itemSetting}>
            <Text style={styles.textColor}>Chính sách bảo mật</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              style={styles.textColor}
            />
          </View>
          <View style={styles.itemSetting}>
            <Text style={styles.textColor}>Đăng xuất</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              style={styles.textColor}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
