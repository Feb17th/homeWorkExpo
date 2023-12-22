import axios from "axios";
import { formDataLoginType, formDataRegisterType } from "@/type";

export const LoginAPI = async (formData: formDataLoginType) => {
  return await axios({
    method: "post",
    data: formData,
    url: `http://scanqrapp-env.eba-ajzrxuvn.ap-southeast-1.elasticbeanstalk.com/api/v1/auth/authenticate`,
    //   headers: {
    //     Authorization: `Bearer ${JWT_loginToken}`,
    //   },
  });
};

export const RegisterAPI = async (formData: formDataRegisterType) => {
  return await axios({
    method: "post",
    data: formData,
    url: `http://scanqrapp-env.eba-ajzrxuvn.ap-southeast-1.elasticbeanstalk.com/api/v1/auth/register`,
  });
};
