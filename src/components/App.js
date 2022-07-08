import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import HomePage from './bookComponents/HomePage';
import BookPage from './bookComponents/BookPage';
import UserBooks from './userComponents/UserBooks';
import Cart from './userComponents/Cart';
import Login from './userComponents/Login';
import SignUp from './userComponents/SignUp';
import LikedBooks from './userComponents/LikedBooks';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Footer />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/book/:BookID" element={<BookPage/>} />
        <Route path="/detach/:userID" element={<UserBooks/>} />
        <Route path="/favorites/:userID" element={<LikedBooks/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
