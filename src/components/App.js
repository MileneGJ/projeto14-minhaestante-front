import {BrowserRouter, Routes, Route} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/images/logo.png'
import HomePage from './HomePage';
import BookPage from './BookPage';
import UserBooks from './UserBooks';
import Cart from './Cart';

function App() {
  return (
    <BrowserRouter>
      <Header> 
        <img src={logo} alt="" />
      </Header>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/book:BookID" element={<BookPage/>} />
        <Route path="/userBooks" element={<UserBooks/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </BrowserRouter>
  );
}

const Header = styled.div`
width:100%;
height:70px;
background-color:#96482B;
position:fixed;
padding:5px;
box-sizing:border-box;
top:0;
left:0;

img{
  height:60px;
}
`

export default App;
