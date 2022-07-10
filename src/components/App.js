import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../contexts/userContext";
import BookContext from "../contexts/bookContext";
import searchBookContext from "../contexts/searchBookContext";
//components - Layout
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
//components - Book-related
import HomePage from "./bookComponents/HomePage";
import BookPage from "./bookComponents/BookPage";
import LogNewBook from "./bookComponents/LogNewBook";
import SearchPage from "./bookComponents/SearchPage";
//components - User-related
import UserBooks from "./userComponents/UserBooks";
import Cart from "./userComponents/Cart";
import Login from "./userComponents/Login";
import SignUp from "./userComponents/SignUp";
import LikedBooks from "./userComponents/LikedBooks";
import UserMenu from "./userComponents/UserMenu";
import FooterSignUp from "./userComponents/FooterSignUp";
import FooterLogin from "./userComponents/FooterLogin";
import UpdateUser from "./userComponents/UpdateUser";
import DeleteUser from "./userComponents/DeleteUser";

function App() {
  let [userData, setUserData] = useState({});
  let [bookList, setBookList] = useState([]);
  let [searchBookList, setSearchBookList] = useState([]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <BookContext.Provider value={{ bookList, setBookList }}>
        <searchBookContext.Provider
          value={{ searchBookList, setSearchBookList }}
        >
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
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
              <Route path="/update-user" element={<UpdateUser/>}/>
              <Route path="/delete-user" element={<DeleteUser/>}/>
            </Routes>
            <Footer />
          </BrowserRouter>
        </searchBookContext.Provider>
      </BookContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
