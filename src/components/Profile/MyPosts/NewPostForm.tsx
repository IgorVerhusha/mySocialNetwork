import React from 'react';
import {Field, InjectedFormProps, reduxForm, reset} from "redux-form";
import {maxLengthCreator, minLengthCreator, required} from "../../../utils/validators/validators";
import {GetStringKeys, Textarea} from "../../common/FormsControls/FormsControls";

const maxLength30 = maxLengthCreator(30);
const minLength2 = minLengthCreator(3)

type PropsType = {

}

export type AddPostFormValuesType = {
    newPostBody: string
}



const NewPostForm: React.FC<
    InjectedFormProps<AddPostFormValuesType,PropsType> & PropsType
    > = (props) => {
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


const afterSend = (result:any, dispatch:any) => {
    dispatch(reset("profileNewPostForm"));
};



const NewPostReduxForm = reduxForm<AddPostFormValuesType, PropsType>({ form: "profileNewPostForm",     onSubmitSuccess: afterSend})(
    NewPostForm
);



export default NewPostReduxForm;