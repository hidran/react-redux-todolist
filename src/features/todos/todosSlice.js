import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit';
import { filterTodo } from './filterSlice';
const TODO_URL = 'http://127.0.0.1:3004/todos';
const FILTER_URL = 'http://127.0.0.1:3004/filter';

export const getTodos = createAsyncThunk('todos/getTodos',async (data = null, {dispatch}) => {
    const todosPromise =  fetch(TODO_URL).then(res => res.json()).then(res => res);
  const filterPromise = fetch(FILTER_URL).then(res => res.json()).then(res => res);
  
  let [todos, activeFilter] = await Promise.all([todosPromise, filterPromise]);
  const filter = activeFilter[0];
  dispatch(filterTodo(filter));
      todos = todos.filter(todo => {
    if (filter=== 'ALL') {
      return true;
    }
    if (filter === 'COMPLETED') {
      return todo.completed;
    }
    // default TODO
    return !todo.completed;
  });
  return todos;
  });
export const todosSlice = createSlice(
    {
        name: 'todos',
        initialState : [],
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
        },
    extraReducers: builder => {
      builder.addCase(getTodos.pending, (state, action) => {
        
      }).addCase(getTodos.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      })
    }
}

);

const { actions, reducer } = todosSlice;
export const { toggleTodo,addTodo, removeTodo } = actions;
export default reducer;
