import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader";


const ProfileInfo = (props) => {
    debugger
    if (!props.profile){
        return <Preloader/>
    } else {
        return <div>
            <div><img src={'/images/main_image.png'}/>
            </div>
            <div className={classes.item}>
                <div><img src={props.profile.photos.large}/></div>
                <div>{props.profile.fullName}</div>
            </div>
        </div>
    }
}

export default ProfileInfo;