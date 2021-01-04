import React from 'react';
import MyPosts from "./MyPosts";
import {actions} from "../../../Redux/profile-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts
    }
}


const MyPostsContainer = connect(mapStateToProps, {addPost: actions.addPost})(MyPosts);


export default MyPostsContainer;