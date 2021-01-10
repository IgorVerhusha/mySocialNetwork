import React, { ChangeEvent, useState,  } from "react";
import classes from "./ProfileInfo.module.scss";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import { ProfileReduxForm } from "./ProfileDataForm";
import { contactsType, profileType } from "../../../Redux/types/types";

type PropsType = {
  profile: profileType | null;
  status: string;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (profile: profileType) =>  Promise<any>;
  updateStatus: (status: string) => void;
};

const ProfileInfo: React.FC<PropsType> = ({
  profile,
  isOwner,
  status,
  updateStatus,
  savePhoto,
  saveProfile,
}) => {
  const [editMode, setEditMode] = useState(false);

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData: profileType) => {
    saveProfile(formData).then(
      () => setEditMode(false),
      (data) => {
        alert(data);
      }
    );
  };

  if (!profile) {
    return <Preloader />;
  } else {
    return (
      <div>
        <div className={classes.item}>
          <div>
            <img
              src={
                !profile.photos.large
                  ? "https://cs16planet.ru/steam-avatars/images/avatar449.jpg"
                  : profile.photos.large
              }
            />
          </div>
          <div>
            {isOwner && <input type="file" onChange={onMainPhotoSelected} />}
          </div>
          <ProfileStatus status={status} updateStatus={updateStatus} />
          {editMode ? (
            <ProfileReduxForm
              initialValues={profile}
              profile={profile}
              onSubmit={onSubmit}
            />
          ) : (
            <ProfileData
              profile={profile}
              setEditMode={setEditMode}
              isOwner={isOwner}
            />
          )}
        </div>
      </div>
    );
  }
};

export type ProfileDataPropsType = {
  profile: profileType;
  setEditMode: (editMode: boolean) => void;
  isOwner: boolean;
};

const ProfileData: React.FC<ProfileDataPropsType> = ({
  profile,
  setEditMode,
  isOwner,
}) => {
  return (
    <div className={classes.profileData}>
      <div>
        <b>{profile.fullName}</b>
      </div>
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
            contactValue={profile.contacts[key as keyof contactsType]}
          />
        ))}
      </div>
      {isOwner && (
        <button
          onClick={() => {
            setEditMode(true);
          }}
        >
          Edit
        </button>
      )}
    </div>
  );
};

type ContactsPropsType = {
  contactTitle: string;
  contactValue: string | null;
};

const Contact: React.FC<ContactsPropsType> = ({
  contactTitle,
  contactValue,
}) => {
  return (
    <div className={classes.contact}>
      <b>{contactTitle}: </b>
      {contactValue}
    </div>
  );
};

export default ProfileInfo;
