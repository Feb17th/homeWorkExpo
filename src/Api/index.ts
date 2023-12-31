import { infoPasswordType } from './../type'
import axios from 'axios'
import { formDataLoginType, formDataRegisterType, infoUserType } from '@/type'
import AsyncStorage from '@react-native-async-storage/async-storage'

const URL_BE =
  'http://qrscan-env.eba-abenjibs.ap-southeast-1.elasticbeanstalk.com/api/v1'

export const LoginAPI = async (formData: formDataLoginType) => {
  return await axios({
    method: 'post',
    data: formData,
    url: `${URL_BE}/auth/authenticate`
    //   headers: {
    //     Authorization: `Bearer ${JWT_loginToken}`,
    //   },
  })
}

export const RegisterAPI = async (formData: formDataRegisterType) => {
  return await axios({
    method: 'post',
    data: formData,
    url: `${URL_BE}/auth/register`
  })
}

export const GetOneUser = async () => {
  const token = (await AsyncStorage.getItem('access_token')) || undefined

  return await axios({
    method: 'get',
    url: `${URL_BE}/common/info`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const UpdateOneUser = async (infoUpdate: infoUserType) => {
  const token = (await AsyncStorage.getItem('access_token')) || undefined

  return await axios({
    method: 'put',
    data: infoUpdate,
    url: `http://qrscan-env.eba-abenjibs.ap-southeast-1.elasticbeanstalk.com/api/v1/common/info`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const ChangePassword = async (infoPassword: infoPasswordType) => {
  const token = (await AsyncStorage.getItem('access_token')) || undefined
  console.log(token)
  return await axios({
    method: 'put',
    data: infoPassword,
    url: `${URL_BE}/common/password`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const GetLocationById = async (id: string) => {
  console.log('kiem tra id location', id)
  // console.log("den day roif nef");

  const token = (await AsyncStorage.getItem('access_token')) || undefined

  return await axios({
    method: 'get',
    url: `${URL_BE}/location/${id}`,
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  })
}

// export const GetLocationById = async (id: string) => {
//   console.log('kiem tra id location', id)
//   // console.log("den day roif nef");

//   return await axios
//     .get(
//       `http://qrscan-env.eba-abenjibs.ap-southeast-1.elasticbeanstalk.com/api/v1/location/${id}`
//     )
//     .catch(function (error) {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.log(error.response.data)
//         console.log(error.response.status)
//         console.log(error.response.headers)
//       } else if (error.request) {
//         // The request was made but no response was received
//         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//         // http.ClientRequest in node.js
//         console.log(error.request)
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log('Error', error.message)
//       }
//       console.log(error.config)
//     })
// }
