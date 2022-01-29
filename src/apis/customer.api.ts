import { request } from '../common/request';

export const fetchCustomerListApi = async () => {
  try {
    const response = await request('GET', `/company`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchCustomerByIdApi = async (id: string) => {
  try {
    const response = await request('GET', `/company/${id}`);

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteCustomerApi = async (company: any) => {
  try {
    const response = await request('PUT', `/company/${company?.id}`, {
      name: company?.name,
      email: company?.email,
      password: company?.password,
      status: company?.status == 1 ? 0 : 1,
      assign_alias: company?.assign_alias,
      additional_info: company?.additional_info,
      dob: company?.dob,
      address: company?.address,
      contact_number: company?.contact_number,
      certificate: company?.certificate,
      certificate_expire_date: company?.certificate_expire_date,
      employee_number: company?.employee_number
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const createCustomerApi = async (payload: any) => {
  try {
    const response = await request('POST', `/company`, payload, true);

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateCustomerApi = async ({ id, data }: any) => {
  try {
    const response = await request('POST', `/company/${id}`, data);

    return response;
  } catch (error) {
    throw error;
  }
};
