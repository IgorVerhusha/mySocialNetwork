import React, {useState} from "react";
import classes from "./ProfileInfo.module.scss";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import { ProfileReduxForm} from "./ProfileDataForm";



const ProfileInfo = (props) => {
    const [editMode, setEditMode] = useState(false);

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
      props.saveProfile(formData).
      then(()=>setEditMode(false),(data)=>{alert(data)})
  }

  if (!props.profile) {
    return <Preloader />;
  } else {
    return (
      <div>
        <div>
          <img
            src={
              "https://igorverhusha.github.io/mySocialNetwork/images/main_image.png"
            }
          />
        </div>
        <div className={classes.item}>
          <div>
            <img
              src={
                !props.profile.photos.large
                  ? "https://cs16planet.ru/steam-avatars/images/avatar449.jpg"
                  : props.profile.photos.large
              }
            />
          </div>
          <div>
            {props.isOwner && (
              <input type="file" onChange={onMainPhotoSelected} />
            )}
          </div>
            <ProfileStatus
                status={props.status}
                updateStatus={props.updateStatus}
            />
            {editMode? <ProfileReduxForm initialValues={props.profile} profile={props.profile} setEditMode={setEditMode} isOwner={props.isOwner} onSubmit={onSubmit}/> : <ProfileData profile={props.profile} setEditMode={setEditMode} isOwner={props.isOwner}/>}

        </div>
      </div>
    );
  }
};

const ProfileData = ({ profile, setEditMode, isOwner }) => {
  return (
    <div className={classes.profileData}>
        <div ><b>{profile.fullName}</b></div>
      <div>{profile.aboutMe}</div>
      <div>Looking for a job: {profile.lookingForAJob ? "yes" : "no"}</div>
      {profile.lookingForAJob && (
        <div>
          <b>My professional skills:</b> {profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>Contacts:</b>
        {Object.keys(profile.contacts).map((key) => (
          <Contact
            key={key}
            contactTitle={key}
            contactValue={profile.contacts[key]}
          />
        ))}
      </div>
        { isOwner && <button onClick={()=>{setEditMode(true)}}>Edit</button>}
    </div>
  );
};




const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={classes.contact}>
      <b>{contactTitle}: </b>
      {contactValue}
    </div>
  );
};

export default ProfileInfo;
