import { createSlice } from '@reduxjs/toolkit';


import { getTodos, removeTodo, addTodo, toggleTodo } from './thunksTodo';


export const todosSlice = createSlice(
    {
        name: 'todos',
        initialState : [],
        reducers: {
          /*  addTodo(state, action) {
                console.log('reducer', state, action);
                state.push(action.payload);
                
            },
           removeTodo(state, action) {
                
                return state.filter(todo => todo.id !== action.payload.id);
                  
            },
            toggleTodo(state, action) {
              const id = action.payload.id;
               state.map(todo => {
                  if(todo.id ===  id ){
                    todo.completed = !todo.completed;
                }
                return todo;
                } );
                  
            }*/
        },
    extraReducers: builder => {
      builder.addCase(getTodos.pending, (state, action) => {
        
      })
        .addCase(getTodos.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      }) .addCase(removeTodo.fulfilled, (state, action) => {
        state = state.filter(ele => ele.id !== action.payload.id )
        return state;
      }).addCase(toggleTodo.fulfilled, (state, action) => {
        const idx = state.findIndex(ele => ele.id === action.payload.id);
        console.log('toggle case',idx, action.payload)
        if (idx !== -1) {
           state.splice(idx, 1, action.payload);
         }
       
      
      }).addCase(addTodo.fulfilled, (state, action) => {
        state.unshift(action.payload);
       
        return state;
      })
    }
}

);

const { actions, reducer } = todosSlice;

export default reducer;
export {getTodos, removeTodo, toggleTodo,addTodo }