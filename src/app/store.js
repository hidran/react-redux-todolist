import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';
import filterReducer from '../features/todos/filterSlice';
import logger from 'redux-logger';
/*const myLog = store => next => action => {
     //  store.dispatch({type:'INIT_MYLOG', payload: null})
  console.log(action.type);
  console.log('rev', store.getState())
     
  
  const res = next(action);
   console.log(res);
  return res;
     }
   
;
*/
const preloadedState = {
  todos: [
    {
      completed: true,
      name: 'Call my mum',
      dueDate: new Date().toLocaleDateString(),
      user_id: 1,
      id: 1
    },
    {
      completed: false,
      name: 'Go to school',
      dueDate: new Date().toLocaleDateString(),
      user_id: 1,
      id: 2
    },
    {
      completed: true,
      name: 'Do my homework',
      dueDate: new Date().toLocaleDateString(),
      user_id: 1,
      id: 3
    }

  ],
  filter: 'ALL'
};
export const store = configureStore({
 // preloadedState,
  reducer: {
    filter: filterReducer,
    todos: todosReducer,/*,
    lists: listsReducer*/
    
  },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  
});
