import { request } from '../common/request';

export const fetchWorkerListApi = async () => {
  try {
    const response = await request('GET', `/worker`);

    return response;
  } catch (error) {
    throw error;
  }
};
export const fetchAvailableWorkerListApi = async (id: string) => {
  try {
    const response = await request('POST', `/get-available-workers`, {
      job_id: id
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchWorkerByIdApi = async (id: string) => {
  try {
    const response = await request('GET', `/worker/${id}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteWorkerApi = async (worker: any) => {
  try {
    const response = await request('PUT', `/worker/${worker?.id}`, {
      name: worker?.name,
      email: worker?.email,
      password: worker?.password,
      status: worker?.status == 1 ? 0 : 1,
      assign_alias: worker?.assign_alias,
      additional_info: worker?.additional_info,
      dob: worker?.dob,
      address: worker?.address,
      contact_number: worker?.contact_number,
      certificate: worker?.certificate,
      certificate_expire_date: worker?.certificate_expire_date,
      employee_number: worker?.employee_number
    });
    return response;
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

export const updateWokerApi = async (worker: any) => {
  try {
    const response = await request('PUT', `/worker/${worker?.id}`, {
      name: worker?.name,
      email: worker?.email,
      password: worker?.password,
      status: worker?.status,
      assign_alias: worker?.assign_alias,
      additional_info: worker?.additional_info,
      dob: worker?.dob,
      address: worker?.address,
      contact_number: worker?.contact_number,
      certificate: worker?.certificate,
      certificate_expire_date: worker?.certificate_expire_date,
      employee_number: worker?.employee_number
    });

    return response;
  } catch (error) {
    throw error;
  }
};
