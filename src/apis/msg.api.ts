import { request } from '../common/request';

export const sendMessageApi = async (payload: any) => {
  try {
    const response = await request('POST', `/message`, payload);

    return response;
  } catch (error) {
    throw error;
  }
};

export const sendToDoApi = async (payload: any) => {
  try {
    const response = await request('POST', `/to-do-list`, payload);

    return response;
  } catch (error) {
    throw error;
  }
};

export const sendNotificationApi = async (payload: any) => {
  try {
    const response = await request('POST', `/notice`, payload);

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchWorkerMessagesApi = async (payload: any) => {
  try {
    const response = await request('GET', `/message/${payload?.workerId}`);

    return response;
  } catch (error) {
    throw error;
  }
};
