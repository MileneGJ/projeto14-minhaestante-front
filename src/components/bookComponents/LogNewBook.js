import styled from "styled-components";

function LogNewBook () {
    return (
        <Container>
            <h1>Novo Desapego:</h1>
            <form>
                <input type="text" placeholder="Título" />
                <input type="text" placeholder="Autor(a)" />
                <input type="text" placeholder="Descrição" />
                <input type="text" placeholder="Editora" />
                <input type="checkbox" placeholder="Ebook" />
                <input type="checkbox" placeholder="Livro Físico" />
                <input type="text" placeholder="Gênero" />
                <input type="url" placeholder="URL da capa" />
                <input type="number" placeholder="ISBN" />
                <input type="number" placeholder="Número de páginas" />
                <button type="submit"> Cadastrar novo livro </button>
            </form>
        </Container>
    )
}

const Container = styled.div`
margin-top:110px;
padding:20px;

h1{
    color:#878460;
    font-size:26px;
    font-weight:700;
}
form{
    width:90vh;
    display:flex;
    flex-direction:column;
}

input{
    background-color:transparent;
    border:1px solid #878460;
    width:100%;
    height:26px;
    color:#878460;
    font-size:16px;
    margin:10px 0;
}

button{
    height:40px;
    width:200px;
    background-color:#878460;
    border:none;
    border-radius:5px;
    color:#E7DDC8;
    font-size:16px;
}

`


export default LogNewBook
