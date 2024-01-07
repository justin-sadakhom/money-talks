import { LoginForm } from "./LoginForm";
import "./Modal.css";
import creditCardURL from "../assets/credit-card.png";

export const Modal = () => {
  return (
    <div className="login-modal">
      <div className="modal-left-half">
        <div id="modal-header">
          <p>MoneyTalks</p>
        </div>
        <LoginForm />
      </div>
      <div className="modal-right-half">
        <img id="credit-card" src={creditCardURL} />
      </div>
    </div>
  );
};
