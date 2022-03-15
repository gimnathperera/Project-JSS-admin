import { request } from '../common/request';

export const fetchAllReportsApi = async () => {
  try {
    const response = await request('GET', `/worker-log`);

    return response;
  } catch (error) {
    throw error;
  }
};
