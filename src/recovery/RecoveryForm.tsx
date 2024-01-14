import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import "./RecoveryForm.css";
import { ClipLoader } from "react-spinners";
import checkIconURL from "../assets/check.png";

type Inputs = {
  email: string;
  cardNum: string;
  cvv: string;
  expiry: string;
};

const emails = faker.helpers.multiple(faker.internet.email.bind(faker), {
  count: 5,
});

export const RecoveryForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [confirmed, setConfirmed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    localStorage.setItem("email", data.email);
    localStorage.setItem("password", faker.internet.password());
    setProcessing(true);
  };

  useEffect(() => {
    if (processing) {
      const timeoutId = setTimeout(() => {
        setSuccess(true);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [processing]);

  useEffect(() => {
    if (success) {
      const redirectTimeout = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => clearTimeout(redirectTimeout);
    }
  }, [navigate, success]);

  return (
    <>
      <div id="login-form-container">
        <h2>Recover Account {confirmed && "($4.99)"}</h2>
        <form
          id="login-form"
          // Workaround for react-hook-form type mismatch:
          // https://github.com/orgs/react-hook-form/discussions/8020#discussioncomment-3362300
          onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
        >
          <label className="login-label" htmlFor="email-field">
            Email Address
          </label>
          <select
            id="email-field"
            className="login-field"
            {...register("email", { required: true })}
          >
            {emails.map((email) => {
              return (
                <option value={email} key={email}>
                  {email}
                </option>
              );
            })}
          </select>
          {!confirmed && (
            <input
              className="login-btn"
              type="button"
              value="Confirm"
              onClick={() => setConfirmed(true)}
            />
          )}
          {confirmed && (
            <>
              <label className="login-label" htmlFor="card-num-field">
                Credit Card Number
              </label>
              <input
                id="card-num-field"
                className="login-field"
                type="text"
                {...register("cardNum", {
                  required: true,
                  minLength: 10,
                  maxLength: 19,
                })}
              />
              <div className="half-field-container">
                <span className="half-field">
                  <label className="login-label" htmlFor="cvv-field">
                    CVV
                  </label>
                  <input
                    id="cvv-field"
                    className="login-field"
                    type="text"
                    {...register("cvv", {
                      required: true,
                      minLength: 3,
                      maxLength: 4,
                    })}
                  />
                </span>
                <span className="half-field">
                  <label className="login-label" htmlFor="expiry-field">
                    Expiry Date
                  </label>
                  <input
                    id="expiry-field"
                    className="login-field"
                    type="text"
                    {...register("expiry", { required: true })}
                  />
                </span>
              </div>
              <input className="login-btn" type="submit" value="Recover" />
            </>
          )}
          <div id="signup-container">
            <span className="gray">Changed your mind?</span>
            <Link className="bold" to="/">
              Return to Login
            </Link>
          </div>
        </form>
      </div>
      <div id="payment-modal" className={`modal ${!processing && "hidden"}`}>
        <div className="modal-content">
          {success ? <SuccessModal /> : <ProcessingModal />}
        </div>
      </div>
    </>
  );
};

const ProcessingModal = () => {
  return (
    <>
      <ClipLoader />
      <div id="redirect-text">
        <p>Processing payment...</p>
      </div>
    </>
  );
};

const SuccessModal = () => {
  // Icon source: https://www.flaticon.com/free-icons/foursquare-check-in
  return (
    <>
      <img id="check-icon" src={checkIconURL} />
      <div id="redirect-text">
        <p>Payment successful!</p>
        <p>Redirecting to login page...</p>
      </div>
    </>
  );
};
