import { request } from '../common/request';

export const fetchJobListApi = async () => {
  try {
    const response = await request('GET', `/job`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchJobByIdApi = async (id: string) => {
  try {
    const response = await request('GET', `/job/${id}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const createJobApi = async (payload: any) => {
  try {
    const response = await request('POST', `/job`, payload);

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateJobApi = async ({ id, data }: any) => {
  try {
    const response = await request('POST', `/job/${id}`, data);

    return response;
  } catch (error) {
    throw error;
  }
};
