import { configureStore, type Middleware } from "@reduxjs/toolkit";
import usersReducer, { rollbackUser } from "./users/slice";
import { toast } from "sonner";

const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
    next(action);
    localStorage.setItem("_redux_state_", JSON.stringify(store.getState()));
};

const syncWithDatabaseMiddleware: Middleware = store => next => action => {
    
    const { type, payload } = action
    const previousState = store.getState()
   
    next(action);

    if (type === "users/deleteUserById") {
        const userIdToRemove = payload
        const userToRemove = previousState.users.find(user => user.id === payload);

        fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    toast.success(`Usuario ${payload} elimnado correctamente`)
                }
                throw new Error('Error al eliminar el usuario')
            })
            .catch(err => {
                toast.error(`Error deleting user ${userIdToRemove}`)
                if (userToRemove) store.dispatch(rollbackUser(userToRemove))
                console.log(err)
                
            })
    }
};

export const store = configureStore({
    reducer: {
        users: usersReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware),
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch