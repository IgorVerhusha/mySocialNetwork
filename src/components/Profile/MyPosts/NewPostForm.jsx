import React from 'react';
import {Field, reduxForm, reset} from "redux-form";
import {maxLengthCreator, minLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength30 = maxLengthCreator(30);
const minLength2 = minLengthCreator(3)

const NewPostForm = (props) => {
    return ( <form onSubmit={props.handleSubmit}>

            <Field
               className="form-control"
                aria-label="With textarea"
                placeholder={"Enter your post"}
                name={"newPostBody"}
                component={Textarea}
                validate={[required, maxLength30, minLength2]}
            />

    <div>
        <button className="btn btn-info">add post</button>
    </div>
        </form>
)
}


const afterSend = (result, dispatch) => {
    dispatch(reset("profileNewPostForm"));
};



const NewPostReduxForm = reduxForm({ form: "profileNewPostForm", onSubmitSuccess: afterSend })(
    NewPostForm
);



export default NewPostReduxForm;