import React from "react";
import classes from "./Login.module.css";
import { Field, reduxForm } from "redux-form";
import { Input } from "../common/FormsControls/FormsControls";
import { minLengthCreator, required } from "../../utils/validators/validators";
import { loginThunkCreator } from "../../Redux/auth-reducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const minLength2 = minLengthCreator(3);

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          placeholder={"Login"}
          name={"email"}
          component={Input}
          validate={[required, minLength2]}
        />
      </div>
      <div>
        <Field
          placeholder={"Password"}
          name={"password"}
          type={"password"}
          component={Input}
          validate={[required, minLength2]}
        />
      </div>
      <div>
        <Field type={"checkbox"} name={"rememberMe"} component={Input} />
        remember me
      </div>
        {captchaUrl && <><img src={captchaUrl}/>
            <Field
            name={"captcha"}

            component={Input}

            />
            </>
        }
      {error && <div className={classes.formSummaryError}>{error}</div>}
      <div>

        <button>Log in</button>
      </div>
    </form>
  );
};

const Login = (props) => {
  const onSubmit = (formData) => {
    let { email, password, rememberMe, captcha } = formData;
    props.loginThunkCreator(email, password, rememberMe, captcha);
  };

  if (props.isAuth) {
    return <Redirect to={"profile"} />;
  }

  return (
    <div className={classes.loginForm}>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
  );
};

const LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { loginThunkCreator })(Login);
