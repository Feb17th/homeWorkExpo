import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "native-base";
import { Input, Icon, Pressable, Button } from "native-base";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootScreens } from "@/Screens";
import { RootStackParamList } from "@/Navigation";
import { StackNavigationProp } from "@react-navigation/stack";

export const ChangePassword = () => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [show, setShow] = React.useState(false);
  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <View
          style={{
            height: 160,
            backgroundColor: "#6DB5CA",
          }}
        >
          <View
            style={{
              position: "absolute",
              flexDirection: "row",
              alignItems: "center",
              top: 20,
              left: 10,
              gap: 8,
            }}
          >
            <Ionicons
              name="arrow-back"
              size={25}
              color="#fff"
              onPress={() => {
                navigate("Settings");
              }}
            />
            <Text style={{ color: "#fff", fontSize: 20 }}>
              Thay đổi mật khẩu
            </Text>
          </View>

          <View style={{ alignItems: "center", gap: 10 }}>
            <Avatar
              bg="green.500"
              mr="1"
              width={140}
              height={140}
              source={{
                uri: "https://www.facebook.com/photo/?fbid=1691380308038966&set=a.112553472588332",
              }}
              style={{ marginTop: 90 }}
            >
              RS
            </Avatar>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 120, gap: 20 }}>
          <View style={{ gap: 8 }}>
            <Text style={{ fontWeight: "bold" }}>Mật khẩu hiện tại</Text>
            <Input
              size="md"
              w={{
                base: "100%",
                md: "25%",
              }}
              type={show ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              placeholder="Mật khẩu hiện tại"
              color="#000"
            />
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ fontWeight: "bold" }}>Mật khẩu mới</Text>
            <Input
              size="md"
              w={{
                base: "100%",
                md: "25%",
              }}
              type={show1 ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShow1(!show1)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show1 ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              placeholder="Mật khẩu mới"
              color="#000"
            />
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ fontWeight: "bold" }}>Xác nhận mật khẩu</Text>
            <Input
              size="md"
              w={{
                base: "100%",
                md: "25%",
              }}
              type={show2 ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShow2(!show2)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show2 ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              placeholder="Xác nhận mật khẩu"
              color="#000"
            />
          </View>
          <View>
            <View style={{ flexDirection: "row", gap: 20 }}>
              <Button size="md" colorScheme="secondary" style={{ flex: 1 }}>
                Hủy
              </Button>
              <Button size="md" colorScheme="secondary" style={{ flex: 1 }}>
                Cập nhật
              </Button>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
