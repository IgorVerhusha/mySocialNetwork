import profileReducer, {actions} from "./profile-reducer";
import React from "react";


it('new post should be added', () => {
    let action = actions.addPost("dasdsadasd");
    let state = {
        posts: [
            {id: 1, post: 'hello', likesCount: 10},
            {id: 2, post: 'how are you?', likesCount: 15},
            {id: 3, post: 'it\'s very nice', likesCount: 5}
        ]
    };
let newState = profileReducer(state, action);

expect(newState.posts.length).toBe(4);
});
