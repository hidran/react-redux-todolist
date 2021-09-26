import { configureStore } from '@reduxjs/toolkit';

import filterReducer from '../features/todos/filterSlice';
import logger from 'redux-logger';
import { listsApi } from '../service/listsService';
import { todosApi } from '../service/todosService';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { AuthApi } from '../service/authService';
import UserReducer from '../features/auth/userSlice';
import { UserSlice } from '../features/auth/userSlice';

export const store = configureStore({
    // preloadedState,
    reducer: {
        [UserSlice.name]: UserReducer,
        filter: filterReducer,
        [todosApi.reducerPath]: todosApi.reducer,
        [listsApi.reducerPath]: listsApi.reducer,
        [AuthApi.reducerPath]: AuthApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            logger,
            listsApi.middleware,
            todosApi.middleware,
            AuthApi.middleware
        ),
});
setupListeners(store.dispatch);
/*

 {
      "name": "test",
      "id": 1,
      "user_id": 1
    }
*/
