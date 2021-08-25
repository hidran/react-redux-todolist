import { removeTodo, toggleTodo } from './todosSlice';
import { useDispatch } from 'react-redux';
import Todo from './Todo';
import PropTypes from 'prop-types';
export const Todos = ({ todos }) => {
    const dispatch = useDispatch();
    const onRemove = (todo) => {
        dispatch(removeTodo(todo));
    };
    const onToggle = async (todo) => {
        const newtodo = { ...todo, completed: !todo.completed};
        try {
            const res = await dispatch(toggleTodo(newtodo)).unwrap();
            console.log('res=', res);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <ul className='list-group list-group-flush'>
            {todos.map((todo) => (
                <Todo
                    key={todo.id}
                    onToggleTodo={onToggle}
                    todo={todo}
                    onRemoveTodo={onRemove}
                />
            ))}
        </ul>
    );
};
Todos.proTypes = {
    todos: PropTypes.arrayOf(Todo),
};
export default Todos;
