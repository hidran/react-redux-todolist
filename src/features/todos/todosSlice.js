import { createSlice } from '@reduxjs/toolkit';

const initTodos = [
  {
    completed: true,
    name: 'Call my mum',
    dueDate: new Date().toLocaleDateString(),
    user_id: 1,
    id:1
  },
  {
      completed: false,
    name: 'Go to school',
    dueDate: new Date().toLocaleDateString(),
    user_id: 1,
     id:2
  },
  {
       completed: true,
    name: 'Do my homework',
    dueDate: new Date().toLocaleDateString(),
    user_id: 1,
     id:3
  }

];
export const todosSlice = createSlice(
    {
        name: 'todos',
        initialState: initTodos,
        reducers: {
           addTodo(state, action) {
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
                  
            }
        }
}

);
// todos/addTodo {type: 'todos/addTodo', payload:}
console.log(todosSlice);
const { actions, reducer } = todosSlice;
export const { toggleTodo,addTodo, removeTodo } = actions;
export default reducer;