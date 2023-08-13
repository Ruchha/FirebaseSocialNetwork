import {createSlice} from "@reduxjs/toolkit"
import { IUser } from "../../models/IUser"

const initialState:IUser = {
    email: "",
    id: "",
    firstName: "",
    lastName: ""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action){
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
        },
        removeUser(state){
            state.email = "";
            state.id = "";
            state.firstName = "";
            state.lastName = "";
        }
    }
})

export const {setUser, removeUser} = userSlice.actions

export default userSlice.reducer
