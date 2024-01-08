import { useForm, SubmitHandler } from "react-hook-form";
import "./LoginForm.css";

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();
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
      setError("root", {
        type: "manual",
        message: "Wrong login credentials",
      });
      return;
    }
  };

  return (
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
          {...(register("email"), { required: true })}
        />
        <label className="login-label" htmlFor="password-field">
          Password
        </label>
        <input
          id="password-field"
          className="login-field"
          type="password"
          {...(register("password"), { required: true, minLength: 8 })}
        />
        {errors.root && <div className="error">Unable to login!</div>}
        <div id="account-toolbar" className="gray">
          <span id="remember-container">
            <input id="remember-toggle" type="checkbox" />
            <label htmlFor="remember-toggle">Remember Me</label>
          </span>
          Forgot Password
        </div>
        <input id="login-btn" type="submit" value="Log In" />
        <div id="signup-container">
          <span className="gray">Don&apos;t have an account?</span>
          <span className="bold">Sign Up</span>
        </div>
      </form>
    </div>
  );
};
