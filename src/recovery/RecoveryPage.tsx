import creditCardURL from "../assets/credit-card.png";
import { RecoveryForm } from "./RecoveryForm";

export const RecoveryPage = () => {
  return (
    <div className="login-modal">
      <div className="modal-left-half">
        <div id="modal-header">
          <p>MoneyTalks</p>
        </div>
        <RecoveryForm />
      </div>
      <div className="modal-right-half">
        <img id="credit-card" src={creditCardURL} />
      </div>
    </div>
  );
};
