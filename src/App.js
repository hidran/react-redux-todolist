import React, {
  useRef
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo,removeTodo } from './features/todos/todosSlice';
import './App.css';

function App() {
 
   const todos = useSelector(state => state.todos)
  const dispatch = useDispatch();
  const todoEl = useRef('');
  const manageClick = (e) => {
     e.preventDefault();
    dispatch(addTodo({ name:todoEl.current.value, dueDate: (new Date()).toLocaleDateString(), user_id:1 }));
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
     
      <ul className="list-group list-group-flush">
        {
              todos.map(todo => <li key={todo.name} className="list-group-item">{todo.name}
              <button onClick={() => dispatch(removeTodo(todo))} className="btn btn-danger btn-sm">DELETE</button>
              </li>)
        }
          </ul>
          </div>
     </div>
    </div>
  );
}
const matchStateToProps = (state) => {
  return { todos: [...state] };
}
/*const mapDispatchToPros = (dispatch) => {
  return {
    addTodo: name => dispatch(addTodo(name)),
    deleteTodo: todo => dispatch(deleteTodo(todo))
  }
}
*/

export default App;
