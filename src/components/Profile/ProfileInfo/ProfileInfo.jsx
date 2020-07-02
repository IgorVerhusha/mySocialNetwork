import React from 'react';
import classes from './ProfileInfo.module.css';


const ProfileInfo = () => {
    return <div>
        <div><img src={'/images/main_image.png'}/>
        </div>
        <div className={classes.item}>
            avatar
        </div>
    </div>
}

export default ProfileInfo;