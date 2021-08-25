import { createSlice } from '@reduxjs/toolkit';

import { getTodos, removeTodo, addTodo, toggleTodo } from './thunksTodo';

export const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTodos.pending, (state, action) => {})
            .addCase(getTodos.fulfilled, (state, action) => {
                state = action.payload;
                return state;
            })
            .addCase(removeTodo.fulfilled, (state, action) => {
                state = state.filter((ele) => ele.id !== action.payload.id);
                return state;
            })
            .addCase(toggleTodo.fulfilled, (state, action) => {
                const idx = state.findIndex(
                    (ele) => ele.id === action.payload.id
                );
                console.log('toggle case', idx, action.payload);
                if (idx !== -1) {
                    state.splice(idx, 1, action.payload);
                }
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.unshift(action.payload);

                return state;
            });
    },
});

const { reducer } = todosSlice;

export default reducer;
export { getTodos, removeTodo, toggleTodo, addTodo };
