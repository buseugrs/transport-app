import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/auth-context/AuthContext";
import Home from "./pages/home-page/Home";
import Login from "./pages/login-page/Login";
import SignUp from "./pages/sign-up/SignUp";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/giris" element={<Login />} />
          <Route path="/kayit" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
