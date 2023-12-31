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

export const EditProfile = () => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>()

  const [info, setInfo] = React.useState<infoUserType>({})

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        console.log('getOne110:')
        const res = await GetOneUser()
        setInfo(res.data)
        console.log('getOne:', res.data)
      } catch (err) {
        console.log('🚀 ~ file: Profile.tsx:27 ~ loadUser ~ err:', err)
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
      }
    } catch (err) {
      alert('Cập nhật thông tin thất bại')
      console.log('🚀 ~ file: Profile.tsx:42 ~ handleUpdate ~ err:', err)
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
            <Avatar
              bg="green.500"
              mr="1"
              width={100}
              height={100}
              source={{
                uri: 'https://www.facebook.com/photo/?fbid=1691380308038966&set=a.112553472588332'
              }}
              style={{ marginTop: 60 }}
            >
              RS
            </Avatar>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                justifyContent: 'center'
              }}
            >
              <Text>Thay đổi ảnh đại diện</Text>
              <Feather name="upload" size={24} color="black" />
            </View>
          </View>
        </View>
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
              onChangeText={(value) => setInfo({ ...info, phoneNumber: value })}
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
      </View>
    </SafeAreaView>
  )
}
