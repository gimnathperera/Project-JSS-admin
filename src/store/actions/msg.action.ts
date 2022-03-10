import { SEND_MESSAGE } from '../../constants/common-constant';

export const sendMessage = (payload: any) => ({
  type: SEND_MESSAGE,
  payload: payload
});
