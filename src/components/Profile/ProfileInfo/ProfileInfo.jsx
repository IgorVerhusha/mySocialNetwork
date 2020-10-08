import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus"


const ProfileInfo = (props) => {
       if (!props.profile){
        return <Preloader/>
    } else {
        return <div>
            <div><img src={'https://igorverhusha.github.io/mySocialNetwork/images/main_image.png'}/>
            </div>
            <div className={classes.item}>
                <div><img src={!props.profile.photos.large ? "https://cs16planet.ru/steam-avatars/images/avatar449.jpg" : props.profile.photos.large}/></div>
                <div>{props.profile.fullName}</div>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    }
}

export default ProfileInfo;