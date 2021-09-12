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
import { useLocation, useParams, useRouteMatch } from 'react-router-dom';

const Mytodos = () => {
    const dispatch = useDispatch();
    let { list_id } = useParams();
    list_id = Number(list_id);
    const { search } = useLocation();
    const pars = new URLSearchParams(search);
    const list_name = pars.get('list_name') ?? '';
    const todoEl = useRef('');
    const activeFilter = useSelector((state) => state.filter);

    const onFilterTodo = (filter) => {
        dispatch(filterTodo(filter));
    };

    const {
        data: { data = [] } = {},
        error,
        isLoading,
        isFetching,
        refetch: reloadLists,
    } = useGetTodosQuery(list_id);

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
            list_id,
        });
        todoEl.current.value = '';
    };

    return (
        <>
            <h1> {list_name}</h1>
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
