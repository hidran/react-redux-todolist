import React,{useState, useEffect, useRef} from 'react';

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

function App(props) {
  console.log(props);
  const [todos, setTodos] = useState([]);

  const todoEl = useRef('');

  useEffect(() => {
    setTodos(initTodos);
    return () => {
      
    }
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    
    
    const newTodo = {name:todoEl.current.value,user_id:1, dueDate: new Date().toLocaleDateString()}
    setTodos([ newTodo, ...todos ]);
  };

  return (
    <div className="App container-fluid">
      <div className="row d-flex justify-content-center">
         <h1>MY TODO LIST</h1>
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <input ref = {todoEl} className="form-field" name="todo" id="todo" />
               <button onClick ={addTodo} className=" m-1 btn btn-success">ADD</button>
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

export default App;
