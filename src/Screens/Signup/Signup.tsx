import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, Icon, Pressable, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { RootStackParamList } from "@/Navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootScreens } from "@/Screens";
import { useNavigation } from "@react-navigation/native";

export const Signup = () => {
  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#101010", flex: 1, gap: 50 }}>
        <View style={{ paddingTop: 50 }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Đăng ký
          </Text>
          <Text
            style={{
              color: "#337FB6",
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            QR Find Place
          </Text>
        </View>
        <View style={{ gap: 20, paddingHorizontal: 30 }}>
          <View style={{ alignItems: "center" }}>
            <View style={{ gap: 8 }}>
              <Text style={{ color: "#A4A4A4" }}>Tên đăng nhập</Text>
              <Input
                size="md"
                w={{
                  base: "100%",
                  md: "25%",
                }}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="person" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                placeholder="Username"
                color="#fff"
              />
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={{ gap: 8 }}>
              <Text style={{ color: "#A4A4A4" }}>Mật khẩu</Text>
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
                placeholder="Password"
                color="#fff"
              />
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={{ gap: 8 }}>
              <Text style={{ color: "#A4A4A4" }}>Xác nhận mật khẩu</Text>
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
                placeholder="Password"
                color="#fff"
              />
            </View>
          </View>

          <Button size="md" colorScheme="secondary" style={{ marginTop: 10 }}>
            Đăng ký
          </Button>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                navigate(RootScreens.LOGIN);
              }}
            >
              <Text style={{ color: "#A4A4A4", backgroundColor: "#101010" }}>
                Đã có tài khoản?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
