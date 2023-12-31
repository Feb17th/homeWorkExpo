import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar } from 'native-base'
import { Input, Button } from 'native-base'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '@/Navigation'
import { StackNavigationProp } from '@react-navigation/stack'
import { GetOneUser, UpdateOneUser } from '@/Api'
import { infoUserType } from '@/type'
import { CommonActions } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { Image } from 'react-native'
import { RootScreens } from '..'
import LoadingAPI from '@/Components/Loading'

export const EditProfile = () => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>()
  const navigation = useNavigation()
  const [info, setInfo] = React.useState<infoUserType>({})
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await GetOneUser()
        setInfo(res.data)
      } catch (err) {
        if (err.response.status === 401) {
          alert('Phiên đăng nhập đã hết hạn')
          navigate(RootScreens.LOGIN)
        }
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [])

  const handleUpdate = async () => {
    try {
      const res = await UpdateOneUser(info)
      if (res.status === 200) {
        alert('Cập nhật thông tin thành công')
        navigate('MyProfile')
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'MyProfile'
              }
            ]
          })
        )
      }
    } catch (err) {
      alert('Cập nhật thông tin thất bại')
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    console.log(result)

    if (!result.canceled) {
      setInfo({ ...info, image: result.assets[0].uri })
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <View
          style={{
            height: 120,
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
                navigate('MyProfile')
              }}
            />
            <Text style={{ color: '#fff', fontSize: 20 }}>
              Chỉnh sửa thông tin cá nhân
            </Text>
          </View>

          <View style={{ alignItems: 'center', gap: 10 }}>
            <Image
              source={{
                uri:
                  info.image ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiNiRvww3b0g1mQ6T_4I-NtoLPcmZY4qc-eqmyWx5_TxTuHj6NzXnSZfZRulrab516Kk8&usqp=CAU'
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                marginTop: 60
              }}
            />

            <TouchableOpacity onPress={pickImage}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  justifyContent: 'center'
                }}
              >
                <Text>Thay đổi ảnh đại diệnn</Text>
                <Feather name="upload" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {loading ? (
          <LoadingAPI />
        ) : (
          <View style={{ paddingHorizontal: 20, marginTop: 70, gap: 20 }}>
            <View style={{ gap: 8 }}>
              <Text style={{ fontWeight: 'bold' }}>Họ và tên</Text>
              <Input
                value={info.name}
                onChangeText={(value) => setInfo({ ...info, name: value })}
                size="md"
                w={{
                  base: '100%',
                  md: '25%'
                }}
                placeholder="Username"
                color="#000"
              />
            </View>
            <View style={{ gap: 8 }}>
              <Text style={{ fontWeight: 'bold' }}>Số điện thoại</Text>
              <Input
                value={info.phoneNumber}
                onChangeText={(value) =>
                  setInfo({ ...info, phoneNumber: value })
                }
                size="md"
                w={{
                  base: '100%',
                  md: '25%'
                }}
                placeholder="SĐT"
                color="#000"
              />
            </View>
            <View style={{ gap: 8 }}>
              <Text style={{ fontWeight: 'bold' }}>Địa chỉ</Text>
              <Input
                value={info.address}
                onChangeText={(value) => setInfo({ ...info, address: value })}
                size="md"
                w={{
                  base: '100%',
                  md: '25%'
                }}
                placeholder="Địa chỉ"
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
                    navigate('MyProfile')
                  }}
                >
                  Hủy
                </Button>
                <Button
                  size="md"
                  colorScheme="secondary"
                  style={{ flex: 1 }}
                  onPress={handleUpdate}
                >
                  Cập nhật
                </Button>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}
