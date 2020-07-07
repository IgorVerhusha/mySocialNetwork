import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import friendsNavReducer from "./friends-nav-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    friendsNavPage: friendsNavReducer, //друзья, необходимо доработать
    usersPage: usersReducer,
    auth: authReducer
});


let store = createStore(reducers);

window.store = store;

export default store;