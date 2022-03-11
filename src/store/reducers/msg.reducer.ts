import { SET_WORKER_MESSAGES } from '../../constants/common-constant';

const INITIAL_STATE = {
  list: []
};

const MessageReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_WORKER_MESSAGES:
      return {
        ...state,
        list: action.payload
      };

    default:
      return state;
  }
};

export default MessageReducer;
