import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const burgerApi = createApi({
    reducerPath: 'burgerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://norma.nomoreparties.space/api',
        prepareHeaders: (headers) => {
                headers.set("Content-Type", "application/json")
            

            return headers;
        }
    }),
    endpoints(build) {
        return {
            getIngridients: build.query({
                query: () => "/ingredients",
                transformResponse: (response) => response.data,
            })
        }
    }
})

export const { useGetIngridientsQuery } = burgerApi;