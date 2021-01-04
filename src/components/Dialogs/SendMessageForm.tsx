import classes from "./Dialogs.module.css";
import React from "react";
import {Field, InjectedFormProps, reduxForm, reset} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {NewMessageFormType} from "./Dialogs";

const maxLength30 = maxLengthCreator(30);

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormType, string>
type PropsType = {}

const SendMessageForm: React.FC<
    InjectedFormProps<NewMessageFormType, PropsType> & PropsType
    > = (props) => {

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


const afterSend = (result:any, dispatch:any) => {
    dispatch(reset("dialogAddMessageForm"));
};



const AddMessageReduxForm = reduxForm<NewMessageFormType>({ form: "dialogAddMessageForm",
    onSubmitSuccess: afterSend
})(
  SendMessageForm
);

export default AddMessageReduxForm;
