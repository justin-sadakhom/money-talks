import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import "./RecoveryForm.css";

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
  const { register } = useForm<Inputs>();
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div id="login-form-container">
      <h2>Recover Account {confirmed && "($4.99)"}</h2>
      <form id="login-form">
        <label className="login-label" htmlFor="email-field">
          Email Address
        </label>
        <select
          id="email-field"
          className="login-field"
          {...(register("email"), { required: true })}
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
            id="login-btn"
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
              {...(register("cardNum"),
              { required: true, minLength: 10, maxLength: 19 })}
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
                  {...(register("cvv"),
                  { required: true, minLength: 3, maxLength: 4 })}
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
                  {...(register("expiry"), { required: true })}
                />
              </span>
            </div>
            <input id="login-btn" type="submit" value="Recover" />
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
  );
};
