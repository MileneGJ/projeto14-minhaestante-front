import styled from "styled-components";
import { Link } from "react-router-dom";

function Footer () {

    return (
        <FooterStyled> 
        <Link to="/">
            <ion-icon name="home-outline"></ion-icon>
        </Link>
        <Link to="/favorites">
            <ion-icon name="heart-outline"></ion-icon>
        </Link>
        <Link to="/profile">
            <ion-icon name="person-outline"></ion-icon>
        </Link>
        <Link to="/cart">
            <ion-icon name="cart-outline"></ion-icon>        
        </Link>
        <Link to="detach">
            <ion-icon name="library-outline"></ion-icon>
        </Link>
      </FooterStyled>
    )
}

const FooterStyled = styled.div`
width:100%;
z-index:1;
height:50px;
background-color:#96482B;
position:fixed;
padding:0 20px;
box-sizing:border-box;
bottom:0;
left:0;
display:flex;
justify-content:space-between;
align-items:center;

  ion-icon {
    color: #fda279;
    font-size: 26px;
  }
`;

export default Footer;
