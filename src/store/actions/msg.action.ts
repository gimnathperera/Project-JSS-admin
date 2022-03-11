import {
  SEND_MESSAGE,
  SEND_NOTIFICATION,
  SEND_TO_DO,
  FETCH_WORKER_MESSAGES
} from '../../constants/common-constant';

export const sendMessage = (payload: any) => ({
  type: SEND_MESSAGE,
  payload: payload
});
export const sendToDo = (payload: any) => ({
  type: SEND_TO_DO,
  payload: payload
});
export const sendNotification = (payload: any) => ({
  type: SEND_NOTIFICATION,
  payload: payload
});
export const fetchWorkerMessages = (payload: any) => ({
  type: FETCH_WORKER_MESSAGES,
  payload: payload
});
