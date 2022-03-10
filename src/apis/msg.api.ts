import { request } from '../common/request';

export const sendMessageApi = async (payload: any) => {
  try {
    const response = await request('POST', `/message`, payload);

    return response;
  } catch (error) {
    throw error;
  }
};
