import React from 'react';
import MyPosts from "./MyPosts";
import {addPostActionCreator, changeNewPostTextActionCreator} from "../../../Redux/profile-reducer";
import {connect} from "react-redux";




const mapStateToProps = (state) => {
    return{
        profilePage: state.profilePage
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        addPost : ()=>{
            dispatch(addPostActionCreator())
        },
        updateNewPostText : (text)=>{
            dispatch(changeNewPostTextActionCreator(text))
        }
    }
}



const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);


export default MyPostsContainer;