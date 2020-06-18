import React from 'react';
import classes from './MyPosts.module.css';
import Post from "./Post/Post";


// отрисовываем полученные посты
const MyPosts = (props) => {

    // с помощью мапа преобразовываем полученный массив в пост
    let postElements = props.posts.map(p => <Post postText={p.post} likes={p.likesCount}/>);



    return <div className={classes.item}>
        <h3>My posts</h3>
        <div>
            <textarea></textarea>
        </div>
        <div>
            <button>add post</button>
        </div>
        <div>
            New posts
        </div>
        {postElements}
    </div>

}

export default MyPosts;