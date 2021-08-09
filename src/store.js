import { createStore } from 'redux';
const initTodos = [
  {
    name: 'Call my mum',
    dueDate: new Date().toLocaleDateString(),
    user_id : 1
  },
   {
    name: 'Go to school',
    dueDate: new Date().toLocaleDateString(),
    user_id : 1
  },
    {
    name: 'Do my homework',
    dueDate: new Date().toLocaleDateString(),
    user_id : 1
  }

];
const reducer = (state, action) => {
    switch (action.type) {
        case   'ADD_TODO':
            const newTodo = {
                name: action.payload.name, user_id: 1,
                dueDate: new Date().toLocaleDateString()
            }
   return  [ newTodo, ...state ];
 
        default:
            return state;
   }
     
};

export const store = createStore(reducer, initTodos);