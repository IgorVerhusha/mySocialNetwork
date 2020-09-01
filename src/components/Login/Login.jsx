import React from "react";
import classes from "./Login.module.css";
import { Field, reduxForm, reset } from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {minLengthCreator, required} from "../../utils/validators/validators";
import {loginThunkCreator} from "../../Redux/auth-reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";


const minLength2 = minLengthCreator(3)

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder={"Login"} name={"email"} component={Input}  validate={[required, minLength2]}/>
      </div>
      <div>
        <Field placeholder={"Password"} name={"password"} type={"password"} component={Input} validate={[required, minLength2]}/>
      </div>
      <div>
        <Field type={"checkbox"} name={"rememberMe"} component={Input} />
        remember me
      </div>
        {props.error && <div className={classes.formSummaryError}>
            {props.error}
        </div>}
      <div>
        <button>Log in</button>
      </div>
    </form>
  );
};

const afterSubmit = (result, dispatch) => {
  dispatch(reset("login"));
};

const Login = (props) => {
  const onSubmit = (formData) => {
      let {email, password, rememberMe} = formData;
      props.loginThunkCreator(email, password, rememberMe);
  };

    if (props.isAuth) {
        return <Redirect to={"profile"}/>
    }

  return (
    <div className={classes.loginForm}>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit}/>
    </div>
  );
};

const LoginReduxForm = reduxForm({
  form: "login"
//  ,onSubmitSuccess: afterSubmit
})(LoginForm);

const mapStateToProps = (state) => ({
        isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {loginThunkCreator})(Login);
