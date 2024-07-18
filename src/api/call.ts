import {
  TCall,
} from '@/types/api/call';
import {
  apiHttpClient,
} from '@/api/api-http-client';
import {
  TApiResponse,
} from '@/types/api/api-response';

export const getAllCalls = (): TApiResponse<TCall[]> => {
  return apiHttpClient.get('activities');
};

export const getCall = (payload: TCall): TApiResponse<TCall> => {
  return apiHttpClient.get(`activities/${payload.id}`);
};

export const updateCall = (payload: TCall): TApiResponse<TCall> => {
  return apiHttpClient.patch(`activities/${payload.id}`, {
    is_archived: payload.is_archived,
  });
};

export const resetAllCalls = (): TApiResponse<void> => {
  return apiHttpClient.patch('reset');
};