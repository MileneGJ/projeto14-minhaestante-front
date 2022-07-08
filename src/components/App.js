import {BrowserRouter, Routes, Route} from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './HomePage';
import BookPage from './BookPage';
import UserBooks from './UserBooks';
import Cart from './Cart';

function App() {
  return (
    <BrowserRouter>
      <Header> OIIII </Header>
      <Routes>
        <Route path="/" element={HomePage} />
        <Route path="/book:BookID" element={BookPage} />
        <Route path="/userBooks" element={UserBooks} />
        <Route path="/cart" element={Cart} />
      </Routes>
    </BrowserRouter>
  );
}

const Header = styled.div``

export default App;
