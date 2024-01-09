import { BeatLoader } from "react-spinners";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const RegisterPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate("/recovery");
    }, 3000);

    return () => clearTimeout(redirectTimeout);
  }, [navigate]);

  return (
    <>
      <BeatLoader />
      <div id="redirect-text">
        <p>{"Registration is not available right now :("}</p>
        <p>Redirecting to account recovery...</p>
      </div>
    </>
  );
};
