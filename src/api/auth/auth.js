import api from "../service";

export const authLoginAdmin = async (payload) => {
  const res = await api.post("/login/admin", payload); // set on tweak
  return res?.data;
};
export const authLoginUser = async (payload) => {
  const res = await api.post("/login/user", payload); // set on tweak
  return res?.data;
};
