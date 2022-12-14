import $api from "src/http";

export const logIn = async (login, password) => {
  const response = await $api.post("/login", { login, password });
  return response;
};

export const registration = async (login, password) => {
  const response = await $api.post("/registration", { login, password });
  return response;
};

export const logout = async () => {
  return $api.get("/logout");
};
