import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
    return <div className={classes.item}>
        {props.postText}
        <div className={classes.like}>
            like {props.likes}
        </div>
    </div>

}

export default Post;