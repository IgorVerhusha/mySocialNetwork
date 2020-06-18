import React from 'react';
import classes from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";


// отрисовываем страницу профиля
const Profile = (props) => {
    return <div className={classes.content}>
        <ProfileInfo/>
        <MyPosts posts={props.posts}/>
    </div>
}

export default Profile;