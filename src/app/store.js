import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';
import filterReducer from '../features/todos/filterSlice';
import logger from 'redux-logger';
import { listsApi } from '../service/listsService';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
export const store = configureStore({
    // preloadedState,
    reducer: {
        filter: filterReducer,
        todos: todosReducer,
        [listsApi.reducerPath]: listsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger, listsApi.middleware),
});
setupListeners(store.dispatch);
/*

 {
      "name": "test",
      "id": 1,
      "user_id": 1
    }
*/
