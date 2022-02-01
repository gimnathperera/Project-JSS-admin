import axios from 'axios';
import { request } from '../common/request';
import { BASE_URL } from '../constants/common-configurations';

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
    const response = await request('PUT', `/job/${id}`, data);

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchJobWorkerListApi = async (id: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}/job-worker`,
      params: { job_id: id }
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const createJobWorkersApi = async (payload: any) => {
  try {
    const response = await request('POST', `/job-worker`, payload);

    return response;
  } catch (error) {
    throw error;
  }
};
