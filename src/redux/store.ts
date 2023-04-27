import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query';

import counterReducer from './slices/countSlice';
import { authApi, pokemonApi } from './services/auth.ts';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [authApi.reducerPath]: authApi.reducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(authApi.middleware, pokemonApi.middleware)
    }
})

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
