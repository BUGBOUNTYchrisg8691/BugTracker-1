import { login, register } from '../../utils/otherAxiosCalls';
import axiosWithAuth from '../../utils/axiosWithAuth';

export const types = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_RESOLVE: 'LOGIN_RESOLVE',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_ERROR: 'REGISTER_ERROR',
  REGISTER_RESOLVE: 'REGISTER_RESOLVE',
  GET_USER_INFO_START: 'GET_USER_INFO_START',
  GET_USER_INFO_SUCCESS: 'GET_USER_INFO_SUCCESS',
  GET_USER_INFO_FAIL: 'GET_USER_INFO_FAIL',
  GET_USER_INFO_RESOLVE: 'GET_USER_INFO_RESOLVE',
};

export const actions = {
  loginThunk: creds => dispatch => {
    dispatch({ type: types.LOGIN_START });
    login(creds)
      .then(res => {
        localStorage.setItem('token', res.data.access_token);
        dispatch({ type: types.LOGIN_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: types.LOGIN_ERROR, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: types.LOGIN_RESOLVE });
      });
  },

  registerThunk: newUser => dispatch => {
    dispatch({ type: types.REGISTER_START });
    register(newUser)
      .then(res => {
        localStorage.setItem('token', res.data.access_token);
        dispatch({ type: types.REGISTER_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: types.REGISTER_ERROR, action: err.message });
      })
      .finally(() => {
        dispatch({ type: types.REGISTER_RESOLVE });
      });
  },

  getUserInfoThunk: () => dispatch => {
    dispatch({ type: types.GET_USER_INFO_START });
    axiosWithAuth()
      .get('/getuserinfo')
      .then(res => {
        dispatch({ type: types.GET_USER_INFO_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: types.GET_USER_INFO_FAIL, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: types.GET_USER_INFO_RESOLVE });
      });
  },
};

export const initialState = {
  user: null,
  role: null,
  status: 'idle',
  error: '',
  loggedIn: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_START:
      return {
        ...state,
        status: 'post/pending',
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        status: 'post/success',
        loggedIn: true,
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        status: 'post/error',
        error: action.payload,
      };
    case types.LOGIN_RESOLVE:
      return {
        ...state,
        status: 'idle',
      };
    case types.REGISTER_START:
      return {
        ...state,
        status: 'post/pending',
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        status: 'post/success',
        loggedIn: true,
      };
    case types.REGISTER_ERROR:
      return {
        ...state,
        status: 'post/error',
      };
    case types.REGISTER_RESOLVE:
      return {
        ...state,
        status: 'idle',
      };
    case types.GET_USER_INFO_START:
      return {
        ...state,
        status: 'get/pending',
      };
    case types.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        status: 'get/success',
        user: action.payload,
      };
    case types.GET_USER_INFO_FAIL:
      return {
        ...state,
        status: 'get/error',
        error: action.payload,
      };
    case types.GET_USER_INFO_RESOLVE:
      return {
        ...state,
        status: 'idle',
      };
    default:
      return state;
  }
};

export default userReducer;
