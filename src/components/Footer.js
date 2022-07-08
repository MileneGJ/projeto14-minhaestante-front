import styled from "styled-components";

function Footer () {
    return (
        <FooterStyled> 
        <ion-icon name="home-outline"></ion-icon>
        <ion-icon name="heart-outline"></ion-icon>
        <ion-icon name="person-outline"></ion-icon>
        <ion-icon name="cart-outline"></ion-icon>
        <ion-icon name="library-outline"></ion-icon>
      </FooterStyled>
    )
}

const FooterStyled = styled.div`
width:100%;
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

ion-icon{
    color:#FDA279;
    font-size:26px;
}
`

export default Footer