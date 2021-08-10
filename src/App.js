import React, {
  useRef
} from 'react';
import { connect } from 'react-redux';
import { addTodo } from './actions';
import './App.css';

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

function App({addTodo, todos}) {
 
  

  const todoEl = useRef('');
  const manageClick = (e) => {
     e.preventDefault();
    addTodo(todoEl.current.value);
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
          todos.map(todo => <li key={todo.name} className="list-group-item">{ todo.name}</li>)
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
const mapDispatchToPros = (dispatch) => {
  return {
    addTodo: (name) => dispatch(addTodo(name))
  }
}
const createConnector = connect(matchStateToProps, mapDispatchToPros);
export default createConnector(App);
