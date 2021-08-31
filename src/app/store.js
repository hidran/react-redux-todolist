import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';
import filterReducer from '../features/todos/filterSlice';
import logger from 'redux-logger';
import { listsApi } from '../service/listsService';

export const store = configureStore({
    // preloadedState,
    reducer: {
        filter: filterReducer,
        todos: todosReducer,
        [listsApi.reducerPath]: listsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
