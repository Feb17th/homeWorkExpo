import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar } from 'native-base'
import { Input, Button } from 'native-base'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { RootScreens } from '@/Screens'
import { RootStackParamList } from '@/Navigation'
import { StackNavigationProp } from '@react-navigation/stack'
import { GetOneUser } from '@/Api'
import { infoUserType } from '@/type'

export const MyProfile = () => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>()

  const [info, setInfo] = React.useState<infoUserType>({})

  console.log('info:', info)
  const loadUser = async () => {
    try {
      console.log('getOne19:')
      const res = await GetOneUser()
      setInfo(res.data)
      console.log('getOne:', res.data)
    } catch (err) {
      console.log('🚀 ~ file: Profile.tsx:27 ~ loadUser ~ err:', err)
    }
  }
  React.useEffect(() => {
    loadUser()
  }, [])

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
          ></View>

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
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 40, gap: 20 }}>
          <View style={{ gap: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>Họ và tên</Text>
            <Input
              value={info.name}
              isDisabled={true}
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
              isDisabled={true}
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
              isDisabled={true}
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
            <TouchableOpacity>
              <Button
                size="md"
                colorScheme="secondary"
                onPress={() => navigate(RootScreens.EDIT_PROFILE)}
              >
                Chỉnh sửa
              </Button>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
