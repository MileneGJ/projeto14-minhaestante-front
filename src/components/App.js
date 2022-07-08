import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './HomePage';
import BookPage from './BookPage';
import UserBooks from './UserBooks';
import Cart from './Cart';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Footer />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/book:BookID" element={<BookPage/>} />
        <Route path="/userBooks" element={<UserBooks/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
