import classes from "./Dialogs.module.css";
import React from "react";
import {Field, reduxForm, reset} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

const maxLength30 = maxLengthCreator(30);



const SendMessageForm = (props) => {

  return (
    <form onSubmit={props.handleSubmit}>
      <div className={classes.inputMessage}>
        <div>
          <Field
              className="form-control"  aria-label="With textarea"
            placeholder={"Enter your message"}
            name={"newMessageBody"}
            component={Textarea}
              validate={[required, maxLength30]}
          />
        </div>
        <button className="btn btn-info">Send</button>
      </div>
    </form>
  );
};


const afterSend = (result, dispatch) => {
    dispatch(reset("dialogAddMessageForm"));
};



const AddMessageReduxForm = reduxForm({ form: "dialogAddMessageForm", onSubmitSuccess: afterSend })(
  SendMessageForm
);

export default AddMessageReduxForm;
