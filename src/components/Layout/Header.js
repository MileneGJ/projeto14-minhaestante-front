import styled from "styled-components";
import logo from '../../assets/images/logo.png'

function Header() {

  function showGenres() {

  }

  return (
    <HeaderStyled>
      <img src={logo} alt="" />
      <form onSubmit={performSearch}>
        <input type="search" placeholder="" />
        <label for="field">Por campo:</label>
        <select id="field" name="field">
          <option value="title">Título</option>
          <option value="author">Autor(a)</option>
          <option value="publisher">Editora</option>
          <option value="type">Formato</option>
          <option value="genre">Gênero</option>
        </select>
      <ion-icon type="submit" name="search-outline"></ion-icon>
      </form>
      <ion-icon onClick={showGenres} name="menu-outline"></ion-icon>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.div`
width:100%;
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

ion-icon{
    color:#FDA279;
    font-size:28px;
}

img{
  height:60px;
}
`

export default Header