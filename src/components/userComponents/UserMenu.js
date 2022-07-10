import styled from "styled-components";
import UpdateUser from "./UpdateUser";
import { useNavigate } from "react-router-dom";
function UserMenu() {
    const navigate = useNavigate();
  return (
    <Container>
      <h1>Minha conta</h1>
      <div>
        <Section onClick={()=> navigate("/update-user")}>
          Alterar meus dados
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </Section>
        <Section onClick={()=>navigate("/delete-user")}>
          Deletar minha conta
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </Section>
        <Section>
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
