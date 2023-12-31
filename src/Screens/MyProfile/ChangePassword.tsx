import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar } from 'native-base'
import { Input, Icon, Pressable, Button } from 'native-base'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { RootScreens } from '@/Screens'
import { RootStackParamList } from '@/Navigation'
import { StackNavigationProp } from '@react-navigation/stack'
import { ChangePassword as ChangePasswordAPI } from '@/Api'
import { infoPasswordType } from '@/type'

export const ChangePassword = () => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [show, setShow] = React.useState(false)
  const [show1, setShow1] = React.useState(false)
  const [show2, setShow2] = React.useState(false)
  const [infoPassword, setInfoPassword] = React.useState<infoPasswordType>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })

  const handleChangePassword = async () => {
    try {
      const res = await ChangePasswordAPI(infoPassword)
      if (res.status === 200) {
        alert('Thay đổi mật khẩu thành công')
        navigate('Settings')
      }
    } catch (err) {
      console.log('err:', err)
      if (err.response.status === 400) {
        if (err.response.data.message === 'No overlap') {
          alert('Xác nhận mật khẩu không trùng nhau')
        } else if (
          err.response.data.message === 'The current password is incorrect'
        ) {
          alert('Mật khẩu hiện tại không chính xác')
        }
      } else if (err.response.status === 401) {
        alert('Phiên đăng nhập đã hết hạn')
        navigate(RootScreens.LOGIN)
      } else if (err.response.status === 404) {
        alert('Đã có lỗi xảy ra')
      }
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <View
          style={{
            height: 70,
            backgroundColor: '#6DB5CA'
          }}
        >
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              alignItems: 'center',
              top: 20,
              left: 10,
              gap: 8
            }}
          >
            <Ionicons
              name="arrow-back"
              size={25}
              color="#fff"
              onPress={() => {
                navigate('Settings')
              }}
            />
            <Text style={{ color: '#fff', fontSize: 20 }}>
              Thay đổi mật khẩu
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 30, gap: 20 }}>
          <View style={{ gap: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>Mật khẩu hiện tại</Text>
            <Input
              onChangeText={(value) =>
                setInfoPassword({ ...infoPassword, currentPassword: value })
              }
              size="md"
              w={{
                base: '100%',
                md: '25%'
              }}
              type={show ? 'text' : 'password'}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? 'visibility' : 'visibility-off'}
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
            <Text style={{ fontWeight: 'bold' }}>Mật khẩu mới</Text>
            <Input
              onChangeText={(value) =>
                setInfoPassword({ ...infoPassword, newPassword: value })
              }
              size="md"
              w={{
                base: '100%',
                md: '25%'
              }}
              type={show1 ? 'text' : 'password'}
              InputRightElement={
                <Pressable onPress={() => setShow1(!show1)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show1 ? 'visibility' : 'visibility-off'}
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
            <Text style={{ fontWeight: 'bold' }}>Xác nhận mật khẩu</Text>
            <Input
              onChangeText={(value) =>
                setInfoPassword({ ...infoPassword, confirmNewPassword: value })
              }
              size="md"
              w={{
                base: '100%',
                md: '25%'
              }}
              type={show2 ? 'text' : 'password'}
              InputRightElement={
                <Pressable onPress={() => setShow2(!show2)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show2 ? 'visibility' : 'visibility-off'}
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
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <Button
                size="md"
                colorScheme="secondary"
                style={{ flex: 1 }}
                onPress={() => {
                  navigate('Settings')
                }}
              >
                Hủy
              </Button>
              <Button
                size="md"
                colorScheme="secondary"
                style={{ flex: 1 }}
                onPress={handleChangePassword}
              >
                Cập nhật
              </Button>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
