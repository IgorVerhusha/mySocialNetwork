import React from "react";
import classes from "./Login.module.css";
import { Field, reduxForm, reset } from "redux-form";

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder={"Login"} name={"login"} component={"input"} />
      </div>
      <div>
        <Field placeholder={"Password"} name={"password"} component={"input"} />
      </div>
      <div>
        <Field type={"checkbox"} name={"rememberMe"} component={"input"} />
        remember me
      </div>
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
    console.log(formData);
  };

  return (
    <div className={classes.loginForm}>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const LoginReduxForm = reduxForm({
  form: "login",
  onSubmitSuccess: afterSubmit,
})(LoginForm);

export default Login;
