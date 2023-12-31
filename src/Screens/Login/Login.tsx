import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Input,
  Icon,
  Pressable,
  Button,
  FormControl,
  WarningOutlineIcon
} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { RootStackParamList } from '@/Navigation'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootScreens } from '@/Screens'
import { useNavigation } from '@react-navigation/native'
import { formDataLoginType } from '@/type'
import { LoginAPI } from '@/Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Modal } from 'native-base'
import LoadingAPI from '@/Components/Loading'

export const Login = () => {
  const [show, setShow] = React.useState(false)
  const [formData, setFormData] = React.useState<formDataLoginType>({})
  const [loading, setLoading] = React.useState(false)
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>()

  const [error, setError] = React.useState<string>('') //Tên đăng nhập ko tồn tại

  const handleLogin = async () => {
    try {
      setLoading(true)
      const res = await LoginAPI(formData)
      if (res.status === 200) {
        AsyncStorage.setItem('access_token', res.data.access_token)
        AsyncStorage.setItem('refresh_token', res.data.refresh_token)
        navigate(RootScreens.MAIN)
      }
    } catch (err) {
      if (err.response.status === 404) {
        setError('Tên đăng nhập không tồn tại')
      } else if (err.response.status === 403) {
        setError('Sai mật khẩu đăng nhập')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#fff', flex: 1, gap: 50 }}>
        <View style={{ paddingTop: 50 }}>
          <Text
            style={{
              color: '#101010',
              fontSize: 25,
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Đăng nhập
          </Text>
          <Text
            style={{
              color: '#337FB6',
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            QR Find Place
          </Text>
        </View>
        <View style={{ gap: 20, paddingHorizontal: 30 }}>
          <View style={{ alignItems: 'center' }}>
            <FormControl
              isInvalid={error === 'Tên đăng nhập không tồn tại' ? true : false}
              style={{ gap: 8 }}
            >
              <FormControl.Label>Tên đăng nhập</FormControl.Label>
              <Input
                onChangeText={(value) =>
                  setFormData({ ...formData, userName: value })
                }
                size="md"
                w={{
                  base: '100%',
                  md: '25%'
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
                color="#101010"
              />
              {error === 'Tên đăng nhập không tồn tại' && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {error}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          </View>
          <View style={{ alignItems: 'center' }}>
            <FormControl
              isInvalid={error === 'Sai mật khẩu đăng nhập' ? true : false}
              style={{ gap: 8 }}
            >
              <FormControl.Label>Mật khẩu</FormControl.Label>
              <Input
                onChangeText={(value) =>
                  setFormData({ ...formData, password: value })
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
                placeholder="Password"
                color="#101010"
              />
              {error === 'Sai mật khẩu đăng nhập' && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {error}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <View>
              <Text style={{ color: '#A4A4A4' }}>Quên mật khẩu ?</Text>
            </View>
          </View>
          <Button size="md" colorScheme="secondary" onPress={handleLogin}>
            Đăng nhập
          </Button>
          <Modal isOpen={loading} onClose={() => setLoading(false)}>
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Body>
                <LoadingAPI />
              </Modal.Body>
            </Modal.Content>
          </Modal>
          <View>
            <TouchableOpacity onPress={() => navigate(RootScreens.SIGNUP)}>
              <Text style={{ color: '#A4A4A4' }}>Chưa có tài khoản?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
