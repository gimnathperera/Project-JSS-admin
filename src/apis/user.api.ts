import { request } from '../common/request';

export const userLoginApi = async (data) => {
  try {
    const response = await request('POST', `/login`, data);
    return response;
  } catch (error) {
    throw error;
  }
};
