import Todos from './Todos';

import AddTodo from '../../components/AddElement';
import FilterTodo from './FilterTodo';
import ErrorBoundary from '../../components/ErrorBoundary';
import { useSelector, useDispatch } from 'react-redux';
import { filterTodo } from './filterSlice';
import {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
} from '../../service/todosService';
import { useRef } from 'react';

const Mytodos = () => {
    const dispatch = useDispatch();
    const todoEl = useRef('');
    const activeFilter = useSelector((state) => state.filter);

    const onFilterTodo = (filter) => {
        dispatch(filterTodo(filter));
    };

    const {
        data = [],
        error,
        isLoading,
        isFetching,
        refetch: reloadLists,
    } = useGetTodosQuery();

    const todos = data.filter((todo) => {
        if (activeFilter === 'ALL') {
            return true;
        }
        if (activeFilter === 'COMPLETED') {
            return todo.completed;
        }
        // default TODO
        return !todo.completed;
    });
    const [
        removeTodo,
        { isLoading: isDeleting, isSuccess, error: deleteError, isError },
    ] = useDeleteTodoMutation();

    const [
        addTodo,
        {
            isLoading: isAdding,
            isSuccess: isAddSuccess,
            error: addError,
            isError: isAddError,
        },
    ] = useAddTodoMutation();

    const [
        updateTodo,
        {
            isLoading: isUpdating,
            isSuccess: isUpdaeSuccess,
            error: updayeError,
            isError: isUpdateError,
        },
    ] = useUpdateTodoMutation();

    const manageClick = (evt) => {
        evt.preventDefault();
        addTodo({
            name: todoEl.current.value,
            created_at: new Date().toLocaleDateString(),
            user_id: 1,
        });
        todoEl.current.value = '';
    };
    return (
        <>
            <h1>MY TODO LIST</h1>
            <div className='col-md-6'>
                <AddTodo Ele={todoEl} manageClick={manageClick} />
                <ErrorBoundary>
                    <Todos
                        removeTodo={removeTodo}
                        updateTodo={updateTodo}
                        todos={todos}
                    />
                </ErrorBoundary>

                <FilterTodo filter={activeFilter} onFilter={onFilterTodo} />
            </div>
        </>
    );
};
export default Mytodos;
