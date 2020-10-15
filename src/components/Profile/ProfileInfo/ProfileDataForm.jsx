import React from "react";
import classes from "./ProfileInfo.module.scss";
import { Input, Textarea } from "../../common/FormsControls/FormsControls";
import {
  minLengthCreator,
  required,
} from "../../../utils/validators/validators";
import { Field, reduxForm } from "redux-form";

const minLength3 = minLengthCreator(3);

const ProfileDataForm = ({ profile, handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.profileData}>
        <div>
          <b>Full name:</b>{" "}
          <Field
            placeholder={"FullName"}
            name={"fullName"}
            component={Input}
            validate={[required, minLength3]}
          />
        </div>
        <div>
          Looking for a job:<Field name={"lookingForAJob"} component={Input} type={"checkbox"} />
        </div>
        <b>My professional skills:</b>{" "}
        <Field
          placeholder={"My professional skills"}
          name={"lookingForAJobDescription"}
          component={Textarea}
          validate={[required, minLength3]}
        />
        <div>
          <b>About me:</b>{" "}
          <Field
            placeholder={"AboutMe"}
            name={"aboutMe"}
            component={Textarea}
            validate={[required, minLength3]}
          />
        </div>
        <div>
          <b>Contacts:</b>
          {Object.keys(profile.contacts).map((key) => (
              <ContactField
                  key={key}
                  contactTitle={key}
              />
          ))}
        </div>
        {error && <div className={classes.formSummaryError}>
          {error}
        </div>}
        <button>Save</button>
      </div>
    </form>
  );
};


export const ProfileReduxForm = reduxForm({
  form: "profileData",
})(ProfileDataForm);


const ContactField = ({ contactTitle}) => {
  return (
      <div className={classes.contact}>
        <b>{contactTitle}:</b>
        <Field
            name={"contacts."+contactTitle}
            component={Input}
        />
      </div>
  );
};