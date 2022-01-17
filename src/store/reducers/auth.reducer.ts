import { SET_CURRENT_USER } from '../../constants/common-constant';

const INITIAL_STATE = {
  isAuthenticated: false,
  token: null,
  expiresIn: null,
  user: {}
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.access_token,
        expiresIn: action.payload.expires_in,
        user: action.payload.user
      };

    default:
      return state;
  }
};

export default authReducer;
