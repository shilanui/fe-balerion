import api from '../service';

export const authLoginAdmin = async (payload) => {
  const res = await api.post('/login/admin', payload);

  return res?.data;
};
export const authLoginUser = async (payload) => {
  const res = await api.post('/login/user', payload);

  return res?.data;
};
