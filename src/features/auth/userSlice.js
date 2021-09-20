import { createSlice } from '@reduxjs/toolkit';

let initialState = null;
 const todoData = localStorage.getItem('todolist-data');
 if(todoData){
     const data = JSON.parse(todoData);
       if(data && data.access_token){
           // header.content.passkey
         const tokenInfo = atob(data.access_token.split('.')[1]);
        
           const expData = new Date( tokenInfo.exp *1000);
           if(expData< (new Date())){
               // Call refresh toke
               // Delete token
               localStorage.deleteItem('todolist-data');
           } else {
                initialState = {
                    name: data.name,
                    email: data.email
                }
           }
       }
      
 }
const UserSlice = createSlice({
   name:'user',
   initialState,
   reducers: {
       userLoggedin(state,action){
           const data = action.payload;
          
           if(data && data.name){
               state = {name:data.name, email:data.email}
           } else {
               state = null;
           }
           
       }
   }

});

export const {userLoggedin} = UserSlice.actions;
export default UserSlice.reducer;