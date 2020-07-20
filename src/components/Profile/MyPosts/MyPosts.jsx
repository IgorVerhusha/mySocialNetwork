import React from 'react';
import classes from './MyPosts.module.css';
import Post from "./Post/Post";




// отрисовываем полученные посты
const MyPosts = (props) => {

    let newPostElement = React.createRef();

    let onAddPost = () => {
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
        <div className={classes.textInput}>
            <textarea className="form-control"   aria-label="With textarea" ref={newPostElement} value={props.profilePage.newPostText} onChange={onPostChange}></textarea>
        </div>
        <div>
            <button type="button" className="btn btn-info" onClick={onAddPost}>add post</button>
        </div>
        <div>
            New posts
        </div>
        {postElements}
    </div>

}

export default MyPosts;