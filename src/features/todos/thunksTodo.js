import { createAsyncThunk} from '@reduxjs/toolkit';
import { filterTodo } from './filterSlice';
import {
    getTodos as fetchTodos,
    getFilter,
    removeTodo as deleteTodo,
    newTodo,
    changeCompleted
} from '../../service/todoService';

export const getTodos = createAsyncThunk('todos/getTodos',
  async (data = null, { dispatch }) => {
   

  let [todos, activeFilter] = await Promise.all([fetchTodos(), getFilter()]);
  const filter = activeFilter[0];
  dispatch(filterTodo(filter));
      todos = todos.filter(todo => {
    if (filter=== 'ALL') {
      return true;
    }
    if (filter === 'COMPLETED') {
      return todo.completed;
    }
    // default TODO
    return !todo.completed;
  });
  return todos;
    });
  
    export const removeTodo = createAsyncThunk('todos/removeTodo',
  async (todo, { dispatch }) => {
   

      const res = await deleteTodo(todo);
      console.log('delete todo', res);
      return todo;
        });
      export const addTodo = createAsyncThunk('todos/addTodo',
  async (todo, { dispatch }) => {
   

     return await newTodo(todo);
     
      
          });
     export const toggleTodo = createAsyncThunk('todos/toggle',
  async (todo, { dispatch }) => {
   

     return await changeCompleted(todo);
     
      
  });