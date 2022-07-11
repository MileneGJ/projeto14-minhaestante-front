import styled from "styled-components";
import FooterLogin from "./FooterLogin";
import Book from "../bookComponents/Book";
import { useState, useEffect } from "react";
import axios from "axios";

function LikedBooks() {
  const [appearFooterLogin, setAppearFooterLogin] = useState(false);
  const [favorites, setFavorites] = useState([]);
  let userId = localStorage.getItem("userId");
  let token = localStorage.getItem("token");

  useEffect(() => {
    const URL = `https://apimyshelf.herokuapp.com/users/favorites/${userId}`;
    const config = {
      headers:{
          Authorization:`Bearer ${token}`
      }
  }
  const promise = axios.get(URL,config);
  promise.then(response=>setFavorites(response.data))
  promise.catch(handleError)
  }, []);

  function handleError(error) {
    if(error.response.status===401){
        setAppearFooterLogin(true)
    } else {
        alert(`${error.response.status} - ${error.response.data}`)
    }
}
  return (
    <Container>
      <h1>Lista de desejos</h1>
      <div style={{ display: appearFooterLogin ? "flex" : "none" }}>
        <FooterLogin show={setAppearFooterLogin} />
      </div>

      <div>
        {favorites?.length > 0
          ? favorites.map((f, index) => (
              <Book
                key={index}
                bookID={f._id}
                price={f.price}
                title={f.title}
                image={f.image}
                author={f.author}
                status={f.status}
              />
            ))
          : ""}
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin: 60px 0;
  padding: 20px;
  box-sizing: border-box;
  h1 {
    margin: 0px 0 30px 15px;
    font-size: 20px;
    font-weight: 700;
    color: #878460;
    line-height: 60px;
  }
  >div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-bottom: 40px;
  }
`;

export default LikedBooks;
