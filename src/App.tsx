import "./App.css";
import { LoginModal } from "./login/Modal";
import { RecoveryPage } from "./recovery/RecoveryPage";
import { RegisterPage } from "./register/RegisterPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginModal />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recovery" element={<RecoveryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
