import React,{useState, useEffect} from 'react';

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

function App() {
  const [todos, setTodos] = useState([]);
   useEffect(() => {
     setTodos(initTodos);
     return () => {
      
     }
   }, [todos])
  return (
    <div className="App container-fluid">
      <h1>MY TODO LIST</h1>
      <ul className="list-group list-group-flush">
        {
          todos.map(todo => <li key={todo.name} className="list-group-item">{ todo.name}</li>)
        }
      </ul>
     
    </div>
  );
}

export default App;
