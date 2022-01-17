import { request } from '../common/request';

export const fetchWorkerListApi = async () => {
  try {
    const response = await request('GET', `/worker`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteWorkerApi = async (id: string) => {
  console.log('>>===>> >>===>> id', id);
  try {
    // const response = await request('GET', `/worker`);
    // return response;
  } catch (error) {
    throw error;
  }
};

export const createWokerApi = async (payload: any) => {
  try {
    const response = await request('POST', `/worker`, payload);

    return response;
  } catch (error) {
    throw error;
  }
};
