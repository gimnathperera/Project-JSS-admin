import {
  SEND_MESSAGE,
  SEND_NOTIFICATION,
  SEND_TO_DO
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
