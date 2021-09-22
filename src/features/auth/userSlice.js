import { createSlice } from '@reduxjs/toolkit';

let initialState = null;
const todoData = localStorage.getItem('todolist-data');
if (todoData) {
    alert('tok');
    const data = JSON.parse(todoData);
    if (data && data.access_token) {
        // header.content.passkey
        const tokenInfo = JSON.parse(atob(data.access_token.split('.')[1]));

        const expData = new Date(tokenInfo.exp * 1000);
        console.log('exp data', expData);
        if (expData < new Date()) {
            // Call refresh toke
            // Delete token
            localStorage.removeItem('todolist-data');
        } else {
            initialState = {
                name: data.name,
                email: data.email,
            };
        }
    }
}
const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoggedin(state, action) {
            const data = action.payload;

            if (data && data.name) {
                localStorage.setItem('todolist-data', JSON.stringify(data));
                state = { name: data.name, email: data.email };
            } else {
                state = null;
            }
            return state;
        },
        userLoggedout(state) {
            localStorage.removeItem('todolist-data');
            
            return null;
        },
    },
});

export const { userLoggedin, userLoggedout } = UserSlice.actions;
export default UserSlice.reducer;
