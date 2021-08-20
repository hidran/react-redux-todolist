import React, {
  useRef, useEffect
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, getTodos } from './features/todos/todosSlice';
import { filterTodo } from './features/todos/filterSlice';
import './App.css';
import Todos from './features/Todos';

import AddTodo from './features/todos/AddTodo';
import FilterTodo from './features/todos/FilterTodo';

function App() {
  const dispatch = useDispatch();
  
   useEffect(() => {
    dispatch(getTodos());
    return () => {
     
    }
  }, [dispatch])
  let todos = useSelector(state => state.todos);
  const activeFilter = useSelector(state => state.filter);
  todos = todos.filter(todo => {
    if (activeFilter === 'ALL') {
      return true;
    }
    if (activeFilter === 'COMPLETED') {
      return todo.completed;
    }
    // default TODO
    return !todo.completed;
  });
  
  const todoEl = useRef('');
  const manageClick = (e) => {
     e.preventDefault();
    dispatch(addTodo({  name:todoEl.current.value, dueDate: (new Date()).toLocaleDateString(), user_id:1 }));
    todoEl.current.value = '';
  }
  const onFilterTodo = (filter) => {
    dispatch(filterTodo(filter));
  }

 
  return (
    <div className="App container-fluid">
      <div className="row d-flex justify-content-center">
         <h1>MY TODO LIST</h1>
        <div className="col-md-6">
         <AddTodo todoEl = {todoEl} manageClick = {manageClick}/>
     
          <Todos todos={todos} />
          <FilterTodo filter = {activeFilter} onFilter = {onFilterTodo}/>
          </div>
     </div>
    </div>
  );
}


export default App;
