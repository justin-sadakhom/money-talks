import { useForm } from "react-hook-form";
import "./LoginForm.css";

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <div id="login-form-container">
      <h2>Log In to Your Account</h2>
      <form id="login-form">
        <label className="login-label" htmlFor="email-field">
          Email Address
        </label>
        <input
          id="email-field"
          className="login-field"
          type="email"
          {...register("email")}
        />
        <label className="login-label" htmlFor="password-field">
          Password
        </label>
        <input
          id="password-field"
          className="login-field"
          type="password"
          {...register("password")}
        />
        <div id="account-toolbar" className="gray">
          <span id="remember-container">
            <input id="remember-toggle" type="checkbox" />
            <label htmlFor="remember-toggle">Remember Me</label>
          </span>
          Forgot Password
        </div>
        <input id="login-btn" type="button" value="Log In" />
        <div id="signup-container">
          <span className="gray">Don&apos;t have an account?</span>
          <span className="bold">Signup</span>
        </div>
      </form>
    </div>
  );
};
