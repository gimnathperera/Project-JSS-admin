import axios from 'axios';
import { BASE_URL } from '../constants/common-configurations';
import { store } from '../store/';

axios.defaults.baseURL = BASE_URL;
const setAutToken = () => {
  console.log();
  let token: any = store.getState()?.auth.token
    ? `Bearer ${store.getState()?.auth.token}`
    : null;

  axios.defaults.headers.common['Authorization'] = token;
};

export const request = async (
  method: any,
  endPoint: string,
  data?: object,
  isImageData: boolean = false
) => {
  try {
    let headerDict = {
      accept: 'application/json',
      'Content-Type': isImageData ? 'multipart/form-data' : 'application/json'
    };
    setAutToken();
    const res = await axios({
      method: method,
      url: endPoint,
      ...(data && { data }),
      headers: headerDict
    });

    return res;
  } catch (error) {
    throw error;
  }
};
