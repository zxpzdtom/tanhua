import axios from "axios";
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const baseURL = 'http://3z3vk2wh.dongtaiyuming.net';

const instance = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

instance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  config.headers.Authorization = token;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    if (!!response.data.errMessage) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: '发生错误',
        textBody: response.data.errMessage,
      });
    }
    return response.data;
  },
  (error) => {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: '发生错误',
      textBody: error.message,
    });
    return Promise.reject(error);
  }
);

export default instance;
