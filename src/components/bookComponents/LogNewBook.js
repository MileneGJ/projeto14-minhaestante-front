import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogNewBook() {
  let userId = localStorage.getItem("userId");
  let token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [bookInfo, setBookInfo] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
    type: "",
    genre: "",
    image: "",
    publisher: "",
    pages: "",
  });

  function addBook(e) {
    e.preventDefault();
    const URL = "https://apimyshelf.herokuapp.com/books";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.post(URL, { ...bookInfo, userID: userId }, config);
    promise.then(() => navigate(`/detach`));
    promise.catch(handleError);
  }

  function handleError(error) {
    alert(`${error.response.status} - ${error.response.data}`);
  }

  function showField(field) {
    switch (field) {
      case "titulo":
        return bookInfo.title;
      case "autor":
        return bookInfo.author;
      case "preço":
        return bookInfo.price;
      case "descrição":
        return bookInfo.description;
      case "formato":
        return bookInfo.type;
      case "genero":
        return bookInfo.genre;
      case "imagem":
        return bookInfo.image;
      case "editora":
        return bookInfo.publisher;
      case "paginas":
        return bookInfo.pages;
      default:
        return "";
    }
  }

  function modifyField(e, field) {
    switch (field) {
      case "titulo":
        setBookInfo({ ...bookInfo, title: e.target.value });
        break;
      case "autor":
        setBookInfo({ ...bookInfo, author: e.target.value });
        break;
      case "preço":
        setBookInfo({ ...bookInfo, price: e.target.value });
        break;
      case "descrição":
        setBookInfo({ ...bookInfo, description: e.target.value });
        break;
      case "formato":
        setBookInfo({ ...bookInfo, type: e.target.value });
        break;
      case "genero":
        setBookInfo({ ...bookInfo, genre: e.target.value });
        break;
      case "imagem":
        setBookInfo({ ...bookInfo, image: e.target.value });
        break;
      case "editora":
        setBookInfo({ ...bookInfo, publisher: e.target.value });
        break;
      case "paginas":
        setBookInfo({ ...bookInfo, pages: e.target.value });
        break;
      default:
        break;
    }
  }

  return (
    <Container>
      <h1>Novo Desapego:</h1>
      <form onSubmit={addBook}>
        <input
          type="text"
          placeholder="Título"
          value={showField("titulo")}
          onChange={(e) => modifyField(e, "titulo")}
        />
        <input
          type="text"
          placeholder="Autor(a)"
          value={showField("autor")}
          onChange={(e) => modifyField(e, "autor")}
        />
        <input
          type="text"
          placeholder="Preço"
          value={showField("preço")}
          onChange={(e) => modifyField(e, "preço")}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={showField("descrição")}
          onChange={(e) => modifyField(e, "descrição")}
        />
        <select
          id="formato"
          name="formato"
          onChange={(e) => modifyField(e, "formato")}
        >
          <option value="">Formato...</option>
          <option value="Ebook">Ebook</option>
          <option value="Livro Físico">Livro Físico</option>
        </select>
        <input
          type="text"
          placeholder="Gênero"
          value={showField("genero")}
          onChange={(e) => modifyField(e, "genero")}
        />
        <input
          type="url"
          placeholder="Imagem da capa (URL)"
          value={showField("imagem")}
          onChange={(e) => modifyField(e, "imagem")}
        />
        <input
          type="text"
          placeholder="Editora"
          value={showField("editora")}
          onChange={(e) => modifyField(e, "editora")}
        />
        <input
          type="number"
          placeholder="Número de páginas"
          value={showField("paginas")}
          onChange={(e) => modifyField(e, "paginas")}
        />
        <button type="submit"> Cadastrar novo livro </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  margin: 60px 0;
  padding: 20px;

  h1 {
    color: #878460;
    font-size: 26px;
    font-weight: 700;
    line-height: 60px;
  }
  form {
    display: flex;
    flex-direction: column;
  }

  input,
  select {
    padding: 0 10px;
    box-sizing: border-box;
    background-color: transparent;
    border: 1px solid #878460;
    border-radius: 5px;
    width: 100%;
    height: 30px;
    color: #878460;
    font-size: 16px;
    margin: 5px 0;
  }

  button {
    margin: 20px 0;
    height: 40px;
    width: 200px;
    background-color: #878460;
    border: none;
    border-radius: 50px;
    color: #e7ddc8;
    font-size: 16px;
    font-weight: 700;
  }

  input {
    padding: 0 10px;
    box-sizing: border-box;
    background-color: transparent;
    border: 1px solid #878460;
    border-radius: 5px;
    width: 100%;
    height: 30px;
    color: #878460;
    font-size: 16px;
    margin: 5px 0;
  }

  button {
    margin: 20px 0;
    height: 40px;
    width: 200px;
    background-color: #878460;
    border: none;
    border-radius: 5px;
    color: #e7ddc8;
    font-size: 16px;
  }
`;

export default LogNewBook;
