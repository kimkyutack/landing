import Axios, { AxiosError, AxiosResponse } from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const axiosStore = defineStore('axiosStore', () => {
  const errorState = ref(false);

  const instantce = Axios.create({
    baseURL: '',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  const request = async (
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    data?: any
  ): Promise<any | AxiosError> => {
    try {
      const response = (await instantce[method](url, data)) as AxiosResponse;
      return response?.data;
    } catch (err: any) {
      return err;
    }
  };

  return {
    request,
    errorState,
  };
});
