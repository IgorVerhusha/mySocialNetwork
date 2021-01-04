import React from "react";
import classes from "./Profile.module.css";

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {profileType} from "../../Redux/types/types";

// отрисовываем страницу профиля
type PropsType = {
    profile: profileType | null;
    status: string;
    isOwner: boolean;
    savePhoto: (file: File) => void;
    saveProfile: (profile: profileType) =>  Promise<any>;
    updateStatus: (status: string) => void;
}

const Profile:React.FC<PropsType> = (props) => {
  return (
    <div className={classes.content}>
      <ProfileInfo
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
