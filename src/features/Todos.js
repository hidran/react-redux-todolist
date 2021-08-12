

import { removeTodo, toggleTodo } from './todos/todosSlice';
import {  useDispatch } from 'react-redux';
import Todo from './todos/Todo';
export const Todos = ({ todos }) => {

    const dispatch = useDispatch();
    const onRemove = (todo) => {
        dispatch(removeTodo(todo));
    }
     const onToggle= (todo) => {
        dispatch(toggleTodo(todo));
    }
    return (
       <ul className="list-group list-group-flush">
        {
              todos.map(todo => <Todo  key={todo.id}  onToggleTodo ={onToggle} todo ={todo} onRemoveTodo ={onRemove}/>)
        }
          </ul>
    )
}
export default Todos;