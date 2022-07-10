import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import HomePage from "./bookComponents/HomePage";
import BookPage from "./bookComponents/BookPage";
import UserBooks from "./userComponents/UserBooks";
import Cart from "./userComponents/Cart";
import Login from "./userComponents/Login";
import SignUp from "./userComponents/SignUp";
import LikedBooks from "./userComponents/LikedBooks";
import UserMenu from "./userComponents/UserMenu";
import LogNewBook from "./bookComponents/LogNewBook";
import FooterSignUp from "./userComponents/FooterSignUp";
import FooterLogin from "./userComponents/FooterLogin";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/book/:BookID" element={<BookPage />} />
        <Route path="/detach/:userID" element={<UserBooks />} />
        <Route path="/new-detach" element={<LogNewBook />} />
        <Route path="/favorites/:userID" element={<LikedBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<UserMenu />} />
        <Route path="/footer-sign-up" element={<FooterSignUp />} />
        <Route path="/footer-login" element={<FooterLogin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
