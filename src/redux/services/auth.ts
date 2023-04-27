// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = import.meta.env.VITE_BASE_URL;

export type Pokemon = {
    abilities: { ability: { name: string, url: string }, is_hidden: boolean }[]
};

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: (builder) => ({
        getPokemonByName: builder.query<Pokemon, string>({
            query: (name) => `pokemon/${name}`,
        }),
    }),
})

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        signUpUser: builder.query<Pokemon, string>({
            query: (name) => `pokemon/${name}`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
//
// note: seems this is the only way to get data directly when using rtk-query
// store.getState() shows methods and such, not the data itself
export const { useGetPokemonByNameQuery } = pokemonApi;
export const { useSignUpUserQuery } = authApi;
