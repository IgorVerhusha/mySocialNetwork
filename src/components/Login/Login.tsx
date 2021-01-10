import React from "react";
import classes from "./Login.module.css";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Input } from "../common/FormsControls/FormsControls";
import { minLengthCreator, required } from "../../utils/validators/validators";
import { loginThunkCreator } from "../../Redux/auth-reducer";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../../Redux/redux-store";

const minLength2 = minLengthCreator(3);

type LoginFormOwnProps = {
  captchaUrl: string | null;
};
const LoginForm: React.FC<
  InjectedFormProps<LoginFormsValuesType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error, captchaUrl }) => {
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
      {captchaUrl && (
        <>
          <img src={captchaUrl} />
          <Field name={"captcha"} component={Input} />
        </>
      )}
      {error && <div className={classes.formSummaryError}>{error}</div>}
      <div>
        <button>Log in</button>
      </div>
    </form>
  );
};

type LoginFormsValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captchaUrl: string | null;
};

const Login: React.FC = () => {
  const captchaUrl = useSelector(
    (state: AppStateType) => state.auth.captchaUrl
  );
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const dispatch = useDispatch();
  const onSubmit = (formData: LoginFormsValuesType) => {
    let { email, password, rememberMe } = formData;
    dispatch(loginThunkCreator(email, password, rememberMe, captchaUrl));
  };

  if (isAuth) {
    return <Redirect to={"profile"} />;
  }

  return (
    <div className={classes.loginForm}>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
};

const LoginReduxForm = reduxForm<LoginFormsValuesType, LoginFormOwnProps>({
  form: "login",
})(LoginForm);

export default Login;
