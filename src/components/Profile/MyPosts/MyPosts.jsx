import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import NewPostForm from "./NewPostForm";

// отрисовываем полученные посты
const MyPosts= React.memo (props => {
    console.log("render");
    let addNewPost = (values) => {
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
});

export default MyPosts;
