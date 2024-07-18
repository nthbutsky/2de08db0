import {
  AxiosResponse,
} from 'axios';

export type TApiResponse<T> = Promise<AxiosResponse<T>>;
export type TApiResponseEmpty = Promise<AxiosResponse<''>>;
