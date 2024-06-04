import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth-context/AuthContext";
import { AdvertsProvider } from "./context/adverts-context/AdvertsContext";
import Home from "./pages/home-page/Home";
import Login from "./pages/login-page/Login";
import SignUp from "./pages/sign-up-page/SignUp";
import UserProfile from "./pages/user-profile/UserProfile";
import ProductAdvertPage from "./pages/product-advert-page/ProductAdvertPage";
import VehicleAdvertPage from "./pages/vehicle-advert-page/VehicleAdvertPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AdvertsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/giris" element={<Login />} />
            <Route path="/kayit" element={<SignUp />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/add-product-advert" element={<ProductAdvertPage />} />
            <Route path="/add-vehicle-advert" element={<VehicleAdvertPage />} />
          </Routes>
        </AdvertsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
