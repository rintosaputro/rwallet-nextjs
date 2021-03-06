import http from '../../helper/http';

export const getProfile = (token) => ({
  type: 'USER_PROFILE',
  payload: http(token).get('/profile'),
});

export const getBalance = (token) => ({
  type: 'GET_BALANCE',
  payload: http(token).get('/profile/balance'),
});

export const getPhoneList = (token) => ({
  type: 'GET_PHONELIST',
  payload: http(token).get('/profile/phones'),
});

export const getAllUser = (token) => ({
  type: 'GET_ALL_USER',
  payload: http(token).get('/users'),
});

export const addPhone = (token, phone) => {
  const param = new URLSearchParams();
  param.append('number', phone);
  return {
    type: 'ADD_PHONE',
    payload: http(token).post('/profile/phones', param),
  };
};

export const deletePhone = (token, id) => ({
  type: 'DELETE_PHONE',
  payload: http(token).delete(`/profile/phones/${id}`),
});

export const updateProfile = (token, data) => {
  const param = new FormData();
  Object.keys(data).forEach((item) => {
    if (data[item]) {
      param.append(`${item}`, data[item]);
    }
  });
  return {
    type: 'UPDATE_PROFILE',
    payload: http(token).patch('/profile', param),
  };
};

export const changePin = (token, oldPin, newPin) => {
  const param = new URLSearchParams();
  param.append('oldPin', oldPin);
  param.append('newPin', newPin);
  return {
    type: 'CHANGE_PIN',
    payload: http(token).patch('/profile/change-pin', param),
  };
};
