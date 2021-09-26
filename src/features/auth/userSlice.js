import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    user: null,
    token: null,
};
const todoData = localStorage.getItem('todolist-data');
if (todoData) {
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
                token: data.access_token,
                user: {
                    name: data.name,
                    email: data.email,
                },
            };
        }
    }
}
export const UserSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedin(draft, action) {
            const data = action.payload;

            if (data && data.name) {
                localStorage.setItem('todolist-data', JSON.stringify(data));
                draft.user = { name: data.name, email: data.email };
                draft.token = data.access_token;
            } else {
                draft.user = null;
            }
        },
        userLoggedout(draft) {
            localStorage.removeItem('todolist-data');
            draft.user = null;
        },

        userRegistered(draft, action) {
            const data = action.payload;

            if (data && data.name) {
                localStorage.setItem('todolist-data', JSON.stringify(data));
                draft.user = { name: data.name, email: data.email };
                draft.token = data.access_token;
            } else {
                draft.user = null;
            }
        },
    },
});

export const { userLoggedin, userLoggedout, userRegistered } =
    UserSlice.actions;
export default UserSlice.reducer;
