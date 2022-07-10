import styled from "styled-components";
import SearchBookContext from '../../contexts/searchBookContext';
import BookContext from "../../contexts/bookContext";
import { useState, useContext } from 'react';
import logo from '../../assets/images/logo.png';
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Header() {
  let navigate = useNavigate();
  const { setSearchBookList } = useContext(SearchBookContext);
  const { bookList } = useContext(BookContext);
  const [showMenu, setShowMenu] = useState(false);
  const [searchInfo, setSearchInfo] = useState({
    keyword:"",
    field:""
  })
  
  const Allgenres = bookList?.map(b => b.genre);
  let genres = [...new Set(Allgenres)];   //array with unique values

  function searchByGenre(g) {
    let URL = `http://http://localhost:5000/books?field=genre&keyword=${g}`
    let promise = axios.get(URL)
    promise.then(response => {
      setShowMenu(false);
      setSearchBookList(response.data);
      navigate("/search")
    });
    promise.catch(handleError)
  }
  function handleError (error) {
    alert(`${error.response.status} - ${error.response.data}`)
  }

  function performSearch (e) {
    e.preventDefault()
    let URL = `http://http://localhost:5000/books?field=${searchInfo.field}&keyword=${searchInfo.keyword}`
    let promise = axios.get(URL)
    promise.then(response => {
      setSearchBookList(response.data);
      navigate("/search")
    });
    promise.catch(handleError)
  }

  return (
    <HeaderStyled>
      <img src={logo} alt="" />
      <form onSubmit={performSearch}>
        <input type="search" placeholder="" 
        value={searchInfo.keyword} onChange={e=>setSearchInfo({...searchInfo, keyword:e.target.value})} />
        <select id="field" name="field" onChange={e=>setSearchInfo({...searchInfo, field:e.target.value})} >
        <option value="">Buscar em</option>
          <option value="title">Título</option>
          <option value="author">Autor(a)</option>
          <option value="publisher">Editora</option>
          <option value="type">Formato</option>
          <option value="genre">Gênero</option>
        </select>
        <button type="submit"><ion-icon name="search-outline"></ion-icon></button>
      </form>
      <div> <ion-icon onClick={() => { setShowMenu(!showMenu) }} name="menu-outline"></ion-icon> </div>
      <GenreList style={{ display: showMenu ? 'flex' : 'none' }}>
        <div onClick={() => { setShowMenu(false) }} ></div>
        <ul>
          {genres.map((g, index) => <li key={index} onClick={() => searchByGenre(g)}>{g}</li>)}
        </ul>
      </GenreList>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.div`
width:100%;
z-index:1;
height:70px;
background-color:#96482B;
position:fixed;
padding-right:20px;
box-sizing:border-box;
top:0;
left:0;
display:flex;
justify-content:space-between;
align-items:center;

input {
    background-color:transparent;
    border:none;
    font-size:16px;
    color:#E7DDC8;
    width:50%;
}
select{
  background-color:transparent;
  border:none;
  font-size:14px;
  color:#E7DDC8;
  margin-right:1vh;
}
ion-icon{
    color:#FDA279;
    font-size:28px;
}
button{
  background-color: transparent;
  border:none;
}

  img {
    height: 60px;
    margin-left: 16px;
  }
`;

const GenreList = styled.div`
position:fixed;
display:flex;
top: 70px;
left:0;
width:100%;

div{
  background-color:rgba(0,0,0,0.2);
  width:100%;
  height:90vh;
}
ul{
  background-color:#96482B;
  width:30%;
  box-sizing:border-box;
  padding:20px;
  line-height:40px;
  font-size:22px;
  text-align:center;
  color:#FDA279;
}
`

export default Header
