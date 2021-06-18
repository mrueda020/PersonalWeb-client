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

export const getUsers = (token) => {
  const url = `${basePath}/${apiVersion}/get-users`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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

export const getActiveUsers = (token, status) => {
  const url = `${basePath}/${apiVersion}/get-active-users?active=${status}`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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

export const uploadAvatarApi = (token, avatar, userId) => {
  const url = `${basePath}/${apiVersion}/upload-avatar/${userId}`;
  const formData = new FormData();
  formData.append("avatar", avatar, avatar.name);
  const params = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: token,
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
      return err.message;
    });
};

export const getAvatarApi = (avatarName) => {
  const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`;
  return fetch(url)
    .then((response) => {
      return response.url;
    })
    .catch((err) => {
      return err.message;
    });
};

export const updateUserApi = (token, user, userId) => {
  const url = `${basePath}/${apiVersion}/update-user/${userId}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(user),
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.message;
    });
};

export const activateUserApi = (token, userId, status) => {
  const url = `${basePath}/${apiVersion}/activate-user/${userId}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ active: status }),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      return err.message;
    });
};
