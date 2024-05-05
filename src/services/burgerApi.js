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
            getIngredients: build.query({
                query: () => "/ingredients",
                transformResponse: (response) => response.data,
            }),
            sendOrder: build.mutation({
                query: (ingredients) => ({
                    url: "/orders",
                    method: "POST",
                    body: JSON.stringify({
                        ingredients: ingredients
                    })
                }),
            }),
        }
    }
})

export const { useGetIngredientsQuery, useSendOrderMutation } = burgerApi;