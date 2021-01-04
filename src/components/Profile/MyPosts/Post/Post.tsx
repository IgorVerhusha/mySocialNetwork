import React from 'react';
import classes from './Post.module.css';
import {postsType} from "../../../../Redux/types/types";

type PropsType = {
    postText: string
    likes: number
}

const Post: React.FC<PropsType> = (props) => {
    return <div className={classes.item}>
        {props.postText}
        <div className={classes.like}>
            like {props.likes}
        </div>
    </div>

}

export default Post;