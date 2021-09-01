import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, getTodos } from './features/todos/todosSlice';
import { filterTodo } from './features/todos/filterSlice';
import './App.css';

import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Mytodos from './features/todos/Mytodos';
import Mylists from './features/lists/Mylists';
import Header from './components/Header';

import Lists from './features/lists/Lists';
import { ToastContainer } from 'react-toastify';
function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        /*dispatch(getTodos())
            .unwrap()
            .then((res) => {})
            .catch((error) => {
                toast.error(error.message);
            });
            */
        return () => {};
    }, []);

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
        <div className='App container'>
            <Router>
                <div className='row d-flex justify-content-center'>
                    <Header />
                    <Switch>
                        <Route path='/todos'>
                            <Mytodos
                                todos={todos}
                                todoEl={todoEl}
                                onFilterTodo={onFilterTodo}
                                activeFilter={activeFilter}
                                manageClick={manageClick}
                            />
                        </Route>
                        <Route exact path='(/|/lists)'>
                            <Lists />
                        </Route>
                    </Switch>
                </div>
            </Router>
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
