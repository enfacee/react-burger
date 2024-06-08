export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const USER_URL = `${BASE_URL}/auth/user`;

export const getIngredients = () => {
  return request(`${BASE_URL}/ingredients`);
}

export const sendOrder = async (ingredients) => {
  const response = await fetch(`${BASE_URL}/orders`,{
    method: 'POST',
    body: JSON.stringify({
      ingredients: ingredients
    }),
    headers :{
      "Content-Type": "application/json",
			Authorization: localStorage.getItem('accessToken') || '',
    }
  })
  return checkReponse(response);
}

export const register = async (registerInfo) => {
  try {
    const response = await request(`${BASE_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(registerInfo)
    });
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  } catch (err) {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		throw err;
  }
}

export const login = async (loginInfo) => {
  try {
    const response = await request(`${BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(loginInfo)
    });
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  } catch (err) {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		throw err;
  }
}

export const logout = async () => {
  const body = JSON.stringify({
    token: localStorage.getItem('refreshToken')
  });
  await request(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    body: body
  });
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export const forgotPassword = (passwordInfo) => {
  const response = request(`${BASE_URL}/password-reset`, {
    method: 'POST',
    body: JSON.stringify(passwordInfo)
  });
	localStorage.setItem('resetPasswordCalled', '0');
  return response;
}

export const resetPassword = (passwordInfo) => {
  const response = request(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    body: JSON.stringify(passwordInfo)
  });
	localStorage.removeItem('resetPasswordCalled');
  return response;
}

export const getUser = async () => {
  try {
    const response = await fetchWithRefresh(USER_URL, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken'),
        },
    })
    return response;
  } catch (error) {
    return { error }
  }
}

export const changeUserInfo = async (userInfo) => {
  try {
    const response = await fetchWithRefresh(USER_URL, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken'),
        },
      body: JSON.stringify(userInfo),
    })
    return response;
  } catch (error) {
    return { error }
  }
}
const request = async (url, options) =>{
  const response = await fetch(url,{
    method: !options ? 'GET': options.method,
    body: options?.body,
    headers :{
      "Content-Type": "application/json"
    }
  })
  return checkReponse(response);
}
const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
  
export const refreshToken = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
  .then(checkReponse)
  .then((refreshData) => {
    if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
    localStorage.setItem("refreshToken", refreshData.refreshToken); 
    localStorage.setItem("accessToken", refreshData.accessToken);
    return refreshData;
  });
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};