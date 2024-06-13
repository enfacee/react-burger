import { RequestOptions } from "../types/request";
import { ResponseType } from "../types/response";

export const request = async <T extends ResponseType>(url: string, options?: RequestOptions): Promise<T> =>{
    const response = await fetch(url,{
      method: !options ? 'GET': options.method,
      body: options?.body,
      headers :{
        "Content-Type": "application/json"
      }
    })
    return checkReponse(response);
  };
export const checkReponse = <T>(res: Response):Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };