import axios from "axios";
import { formDataLoginType, formDataRegisterType } from "@/type";

export const LoginAPI = async (formData: formDataLoginType) => {
  return await axios({
    method: "post",
    data: formData,
    url: `http://localhost:8081/api/v1/auth/authenticate`,
    //   headers: {
    //     Authorization: `Bearer ${JWT_loginToken}`,
    //   },
  });
};

export const RegisterAPI = async (formData: formDataRegisterType) => {
  return await axios({
    method: "post",
    data: formData,
    url: `http://localhost:8081/api/v1/auth/register`,
  });
};

export const GetLocationById = async (id : string) => {
  console.log("kiem tra id location",id);
  // console.log("den day roif nef");
  
  
  return await axios.get(`http://192.168.31.122:8081/api/v1/location/${id}`)
  .catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
}
