import { useForm, SubmitHandler } from "react-hook-form";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const [authenticated, setAuthenticated] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!localStorage.getItem("email") || !localStorage.getItem("password")) {
      setError("root", {
        type: "manual",
        message: "Wrong login credentials",
      });
      return;
    }

    if (
      data.email !== localStorage.getItem("email") ||
      data.password !== localStorage.getItem("password")
    ) {
      console.log("help");
      console.log(data);

      setError("root", {
        type: "manual",
        message: "Wrong login credentials",
      });
      return;
    }

    setAuthenticated(true);
  };

  const onSignOut = () => {
    setAuthenticated(false);
  };

  useEffect(() => {
    setValue("email", localStorage.getItem("email") || "");
    setValue("password", localStorage.getItem("password") || "");
  }, [setValue]);

  return (
    <>
      <div id="login-form-container">
        <h2>Log In to Your Account</h2>
        <form
          id="login-form"
          // Workaround for react-hook-form type mismatch:
          // https://github.com/orgs/react-hook-form/discussions/8020#discussioncomment-3362300
          onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
        >
          <label className="login-label" htmlFor="email-field">
            Email Address
          </label>
          <input
            id="email-field"
            className="login-field"
            type="email"
            defaultValue={localStorage.getItem("email") || ""}
            {...register("email", { required: true })}
          />
          <label className="login-label" htmlFor="password-field">
            Password
          </label>
          <input
            id="password-field"
            className="login-field"
            type="password"
            defaultValue={localStorage.getItem("password") || ""}
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.root && <div className="error">Unable to login!</div>}
          <div id="account-toolbar" className="gray">
            <span id="remember-container">
              <input id="remember-toggle" type="checkbox" defaultChecked />
              <label htmlFor="remember-toggle">Remember Me</label>
            </span>
            <Link to="/recovery">Forgot Password</Link>
          </div>
          <input className="login-btn" type="submit" value="Log In" />
          <div id="signup-container">
            <span className="gray">Don&apos;t have an account?</span>
            <Link className="bold" to="/register">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
      <div className={`modal ${!authenticated && "hidden"}`}>
        <div className="modal-content">
          <p>{"You are now logged in :)"}</p>
          <input
            className="login-btn"
            type="button"
            value="Sign Out"
            onClick={onSignOut}
          />
        </div>
      </div>
    </>
  );
};
