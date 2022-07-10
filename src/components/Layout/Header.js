import styled from "styled-components";
import logo from "../../assets/images/logo.png";

function Header() {
  return (
    <HeaderStyled>
      <img src={logo} alt="" />
      <input type="search" placeholder="" />
      <ion-icon name="search-outline"></ion-icon>
      <ion-icon name="menu-outline"></ion-icon>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.div`
  width: 100%;
  height: 60px;
  background-color: #96482b;
  position: fixed;
  padding-right: 20px;
  box-sizing: border-box;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  input {
    background-color: transparent;
    border: none;
    font-size: 16px;
    color: #e7ddc8;
    width: 50%;
  }

  ion-icon {
    color: #fda279;
    font-size: 28px;
  }

  img {
    height: 60px;
    margin-left: 16px;
  }
`;

export default Header;
