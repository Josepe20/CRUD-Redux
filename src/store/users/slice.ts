import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
    {
        id: "1",
        name: "Peter Doe",
        email: "PeterDoe@gmail.com",
        github: "Peter Doe",
      },
      {     
        id: "2",
        name: "Lena Whitehouse",
        email: "LenaWhitehouse@gmail.com",
        github: "Lena Whitehouse",
      },
      {      
        id: "3",
        name: "Phil Less",
        email: "PhilLess@gmail.com",
        github: "Phil Less",
  
      },
      {    
        id: "4",
        name: "John Camper",
        email: "JohnCamper@gmail.com",
        github: "John Camper",
      },
];

export type UserId = string

export interface User {
    name: string;
    email: string;
    github: string;
}

export interface UserWithId extends User {
    id: string;
}

const initialState: UserWithId[] = (() => {
    const persistedState = localStorage.getItem("_redux_state_");
    
    return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;

})();


export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addNewUser : (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID();
            state.push({ id, ...action.payload })
        },
        deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
        rollbackUser: (state, action: PayloadAction<UserWithId>) => {
            const isUserAlreadyDefined = state.some(user => user.id === action.payload.id)
            if (!isUserAlreadyDefined) {
                state.push(action.payload)
            }
        },
    },
});

export default usersSlice.reducer;

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;
