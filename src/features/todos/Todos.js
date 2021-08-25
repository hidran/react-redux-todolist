import { removeTodo, toggleTodo } from './todosSlice';
import { useDispatch } from 'react-redux';
import Todo from './Todo';

export const Todos = ({ todos }) => {
    const dispatch = useDispatch();
    const onRemove = (todo) => {
        dispatch(removeTodo(todo));
    };
    const onToggle = async (todo) => {
        const newtodo = { ...todo, completed: !todo.completed, id: 0 };
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
export default Todos;
