import React, {
  useRef
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo} from './features/todos/todosSlice';
import './App.css';
import Todos from './features/Todos';

function App() {
 
   const todos = useSelector(state => state.todos)
  const dispatch = useDispatch();
  const todoEl = useRef('');
  const manageClick = (e) => {
     e.preventDefault();
    dispatch(addTodo({ id:todos.length+1, name:todoEl.current.value, dueDate: (new Date()).toLocaleDateString(), user_id:1 }));
  }
 
  return (
    <div className="App container-fluid">
      <div className="row d-flex justify-content-center">
         <h1>MY TODO LIST</h1>
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <input ref = {todoEl} className="form-field" name="todo" id="todo" />
               <button onClick ={manageClick} className=" m-1 btn btn-success">ADD</button>
            </div>
           
          </form>
     
          <Todos todos={todos}/>
          </div>
     </div>
    </div>
  );
}


export default App;
