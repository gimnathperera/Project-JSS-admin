import { request } from '../common/request';

export const fetchCustomerListApi = async () => {
  try {
    const response = await request('GET', `/company`);

    return response;
  } catch (error) {
    throw error;
  }
};
