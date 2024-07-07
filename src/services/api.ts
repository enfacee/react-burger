import { RequestOptions, TForgotPasswordRequest, TLoginRequest, TRegisterRequest, TResetPasswordRequest } from "../types/request";
import { ResponseType, TDataIngredientResponse, TLogoutResponse, TOrderResponse, TRefreshTokenResponse, TUserResponse } from "../types/response";
import { checkReponse, request } from "../utils/commonApi";

export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const WSS_URL = 'wss://norma.nomoreparties.space/orders';
export const USER_URL = `${BASE_URL}/auth/user`;

export const getIngredients = (): Promise<TDataIngredientResponse> => {
  return request<TDataIngredientResponse>(`${BASE_URL}/ingredients`);
}

export const sendOrder = async (ingredients: Array<string>) => {
  const response = await fetch(`${BASE_URL}/orders`,{
    method: 'POST',
    body: JSON.stringify({
      ingredients: ingredients
    }),
    headers :{
      "Content-Type": "application/json",
			Authorization: localStorage.getItem('accessToken')! ,
    }
  })
  return checkReponse<TOrderResponse>(response);
}

export const register = async (registerInfo: TRegisterRequest) => {
  try {
    const response = await request<TUserResponse>(`${BASE_URL}/auth/register`, {
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

export const login = async (loginInfo: TLoginRequest) => {
  try {
    const response = await request<TUserResponse>(`${BASE_URL}/auth/login`, {
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
  await request<TLogoutResponse>(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    body: body
  });
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export const forgotPassword = (passwordInfo: TForgotPasswordRequest) => {
  const response = request(`${BASE_URL}/password-reset`, {
    method: 'POST',
    body: JSON.stringify(passwordInfo)
  });
	localStorage.setItem('resetPasswordCalled', '0');
  return response;
}

export const resetPassword = (passwordInfo: TResetPasswordRequest) => {
  const response = request(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    body: JSON.stringify(passwordInfo)
  });
	localStorage.removeItem('resetPasswordCalled');
  return response;
}

export const getUser = async () => {
  const response = await fetchWithRefresh<TUserResponse>(USER_URL, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken')!,
        },
    })
    return response;
}

export const changeUserInfo = async (userInfo: TRegisterRequest) => {
    const response = await fetchWithRefresh<TUserResponse>(USER_URL, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken')!,
        },
      body: JSON.stringify(userInfo),
    })
    return response;
}
  
export const refreshToken = () : Promise<TRefreshTokenResponse> => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
  .then(checkReponse<TRefreshTokenResponse>)
  .then((refreshData) => {
    if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
    localStorage.setItem("refreshToken", refreshData.refreshToken); 
    localStorage.setItem("accessToken", refreshData.accessToken);
    return refreshData;
  });
};

export const fetchWithRefresh = async <T extends ResponseType>(url: string, options: RequestOptions): Promise<T> => {
  try {
    const res = await fetch(url, options);
    return await checkReponse<T>(res);
  } catch (e) {
    const err = e as TError;
    if (err.message === "jwt expired") {      
      const refreshData = await refreshToken(); //обновляем токен
      options.headers = {
        ...options.headers,
        authorization: refreshData.accessToken
      }
      const res = await fetch(url, options); //повторяем запрос
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
type TError = {
  message: string;
}