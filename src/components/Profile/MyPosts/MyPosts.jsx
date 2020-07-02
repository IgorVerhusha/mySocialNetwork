import React from 'react';
import classes from './MyPosts.module.css';
import Post from "./Post/Post";




// отрисовываем полученные посты
const MyPosts = (props) => {
    console.log(props)

    let newPostElement = React.createRef();

    let onAddPost = () => {
        debugger
        if (props.profilePage.newPostText != ''){
        props.addPost();
        }
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }


    // с помощью мапа преобразовываем полученный массив в пост
    let postElements = props.profilePage.posts.map(p => <Post postText={p.post} key={p.id} likes={p.likesCount}/>);


    // блок с постами
    return <div className={classes.item}>
        <h3>My posts</h3>
        <div>
            <textarea ref={newPostElement} value={props.profilePage.newPostText} onChange={onPostChange}></textarea>
        </div>
        <div>
            <button onClick={onAddPost}>add post</button>
        </div>
        <div>
            New posts
        </div>
        {postElements}
    </div>

}

export default MyPosts;