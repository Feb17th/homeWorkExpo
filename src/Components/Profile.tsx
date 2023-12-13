import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "native-base";
import { Input, Icon, Pressable, Button } from "native-base";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootScreens } from "@/Screens";
import { RootStackParamList } from "@/Navigation";
import { StackNavigationProp } from "@react-navigation/stack";

interface ProfileProps {
  edit?: boolean;
}

export const Profile = ({ edit }: ProfileProps) => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();
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
            {edit && (
              <>
                <Ionicons
                  name="arrow-back"
                  size={25}
                  color="#fff"
                  onPress={() => {
                    navigate("MyProfile");
                  }}
                />
                <Text style={{ color: "#fff", fontSize: 20 }}>
                  Chỉnh sửa thông tin cá nhân
                </Text>
              </>
            )}
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
            {edit && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  justifyContent: "center",
                }}
              >
                <Text>Thay đổi ảnh đại diện</Text>
                <Feather name="upload" size={24} color="black" />
              </View>
            )}
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 120, gap: 20 }}>
          <View style={{ gap: 8 }}>
            <Text style={{ fontWeight: "bold" }}>Họ và tên</Text>
            <Input
              isDisabled={!edit && true}
              size="md"
              w={{
                base: "100%",
                md: "25%",
              }}
              placeholder="Username"
              color="#000"
            />
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ fontWeight: "bold" }}>Số điện thoại</Text>
            <Input
              isDisabled={!edit && true}
              size="md"
              w={{
                base: "100%",
                md: "25%",
              }}
              placeholder="SĐT"
              color="#000"
            />
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ fontWeight: "bold" }}>Địa chỉ</Text>
            <Input
              isDisabled={!edit && true}
              size="md"
              w={{
                base: "100%",
                md: "25%",
              }}
              placeholder="Địa chỉ"
              color="#000"
            />
          </View>
          <View>
            {edit ? (
              <View style={{ flexDirection: "row", gap: 20 }}>
                <Button size="md" colorScheme="secondary" style={{ flex: 1 }}>
                  Hủy
                </Button>
                <Button size="md" colorScheme="secondary" style={{ flex: 1 }}>
                  Cập nhật
                </Button>
              </View>
            ) : (
              <TouchableOpacity>
                <Button
                  size="md"
                  colorScheme="secondary"
                  onPress={() => navigate(RootScreens.EDIT_PROFILE)}
                >
                  Chỉnh sửa
                </Button>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
