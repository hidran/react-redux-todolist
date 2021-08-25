import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, getTodos } from './features/todos/todosSlice';
import { filterTodo } from './features/todos/filterSlice';
import './App.css';
import Todos from './features/todos/Todos';

import AddTodo from './features/todos/AddTodo';
import FilterTodo from './features/todos/FilterTodo';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodos())
            .unwrap()
            .then((res) => {})
            .catch((error) => {
                toast.error(error.message);
            });
        return () => {};
    }, [dispatch]);
    let todos = useSelector((state) => state.todos);
    const activeFilter = useSelector((state) => state.filter);
    todos = todos.filter((todo) => {
        if (activeFilter === 'ALL') {
            return true;
        }
        if (activeFilter === 'COMPLETED') {
            return todo.completed;
        }
        // default TODO
        return !todo.completed;
    });

    const todoEl = useRef('');
    const manageClick = (e) => {
        e.preventDefault();
        dispatch(
            addTodo({
                name: todoEl.current.value,
                dueDate: new Date().toLocaleDateString(),
                user_id: 1,
            })
        );
        todoEl.current.value = '';
    };
    const onFilterTodo = (filter) => {
        dispatch(filterTodo(filter));
    };

    return (
        <div className='App container-fluid'>
            <div className='row d-flex justify-content-center'>
                <h1>MY TODO LIST</h1>
                <div className='col-md-6'>
                    <AddTodo todoEl={todoEl} manageClick={manageClick} />
                    <ErrorBoundary>
                        <Todos todos={todos} />
                    </ErrorBoundary>

                    <FilterTodo filter={activeFilter} onFilter={onFilterTodo} />
                </div>
            </div>
            <ToastContainer
                position='bottom-right'
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default App;
