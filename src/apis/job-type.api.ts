import axios from 'axios';
import { request } from '../common/request';
import { BASE_URL } from '../constants/common-configurations';

export const fetchJobTypeListApi = async (id: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}/job-type`,
      params: { type_id: id }
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchJobTypeByIdApi = async (id: string) => {
  try {
    const response = await request('GET', `/job-type/${id}`);

    return response;
  } catch (error) {
    throw error;
  }
};