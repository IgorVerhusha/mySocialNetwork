import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import friendsNavReducer from "./friends-nav-reducer";
import usersReducer from "./users-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    friendsNavPage: friendsNavReducer, //друзья, необходимо доработать
    usersPage: usersReducer
});


let store = createStore(reducers);

export default store;