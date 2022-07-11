import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../../contexts/userContext";

function UserMenu() {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);
  const token = localStorage.getItem("token");

  useEffect(()=>{
    if(!token){
      navigate("/login")
    }
  },[])

  function exit() {
    localStorage.clear();
    setUserData("")
    navigate("/");
  }

  return (
    <Container>
      <h1>Minha conta</h1>
      <div>
        <Section onClick={() => navigate("/update-user")}>
          Alterar meus dados
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </Section>
        <Section onClick={() => navigate("/delete-user")}>
          Deletar minha conta
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </Section>
        <Section onClick={exit}>
          Sair
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </Section>
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin: 60px 0;
  padding: 57px 30px;
  color: #878460;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  h1 {
    font-weight: 600;
    padding-bottom: 45px;
  }
  ion-icon {
    font-size: 26px;
  }
`;
const Section = styled.div`
  display: flex;
  height: 93px;
  align-items: center;
  justify-content: space-between;
  border-top: 2px solid #878460;
  &:last-child {
    border-bottom: 2px solid #878460;
  }
`;

export default UserMenu;
