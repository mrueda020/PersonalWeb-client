import { basePath, apiVersion } from "./config";

export const signUpApi = (data) => {
  const url = `${basePath}/${apiVersion}/sign-up`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url, params)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((result) => {
      if (result.user) {
        return { ok: 200, message: "User created" };
      }
      return { ok: false, message: result.message };
    })
    .catch((err) => {
      return { ok: false, message: err.message };
    });
};

export const signInApi = (data) => {
  const url = `${basePath}/${apiVersion}/sign-in`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};
