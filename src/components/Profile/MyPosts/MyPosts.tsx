import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import NewPostForm, { AddPostFormValuesType } from "./NewPostForm";
import {postsType} from "../../../Redux/types/types";


type PropsType={
    posts: Array<postsType>
    addPost: (newPostBody: string) => void
}


// отрисовываем полученные посты
const MyPosts: React.FC<PropsType> = (props) => {

    let addNewPost = (values: AddPostFormValuesType) => {

        props.addPost(values.newPostBody);
    };

    // с помощью мапа преобразовываем полученный массив в пост
    let postElements = props.posts.map((p) => (
        <Post postText={p.post} key={p.id} likes={p.likesCount}/>
    ));
    // блок с постами
    return (
        <div className={classes.item}>
            <h3>My posts</h3>
            <NewPostForm onSubmit={addNewPost}/>
            <div>New posts</div>
            {postElements}
        </div>
    );
};

export default MyPosts;
