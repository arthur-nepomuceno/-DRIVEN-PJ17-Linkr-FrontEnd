import styled from "styled-components";
import { ImPencil2 } from "react-icons/im";
import { FaTrash } from "react-icons/fa";
import { HiOutlineHeart } from "react-icons/hi"

export default function Post({userImage, userName, postDescription, urlTitle, urlDescription, postUrl, urlImage, likesCount, likedBy}){
    return (
        <Container>
            <div id="user">
                <img src="https://madreclelia.org/wp-content/uploads/2018/05/maria.jpg" alt="foto do usuário"/>
                <div id="like">
                    <HiOutlineHeart size={20}/>
                    <h5>13 likes</h5>
                </div>
            </div>
            <div id="head">
                <h1>Maria Joaquina</h1>
                <div id="edit">
                    <ImPencil2/>
                </div>
                <div id="delete">
                    <FaTrash/>
                </div>
                <h2>Olha que legal essa lib para trabalhar com datas! #lib #react</h2>
            </div>
            <div id="url">
                <h3>HTTP Cats</h3>
                <h4>An API for the awesome HTTP Cats! Use it in your website to show funny error messages.</h4>
                <h5>https://http.cat/</h5>
                <img src="https://http.cat/100.jpg" alt="imagem da url"/>
            </div>
        </Container>
    );
}

const Container = styled.div`
    width: 42%;
    height: 27%;
    background-color: #171717;
    border-radius: 16px;
    position: absolute;
    top: 46%;
    left: 17%;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;

    div#user {
        width: 50px;
        height: 39%;
        position: absolute;
        top: 7%;
        left: 3%;
        display: flex;
        flex-direction: column;
        align-items: center;     
    }

    div#user img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    div#like {
        color: #FFFFFF;
        position: absolute;
        top: 65%;
        display: flex;
        flex-direction: column;
        align-items: center;      
    }

    

    div#like h5 {
        font-size: 11px;
        line-height: 13px;
        text-align: center;
    }

    div#head {
        width: 82%;
        height: 30%;
        position: absolute;
        top: 7%;
        left: 14%;
        border: 1px dashed white;
    }

    div#head h1 {
        font-size: 19px;
        line-height: 23px;
        color: #FFFFFF;
    }

    div#head h2 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
        position: absolute;
        top: 37%;
    }

    div#edit {
        color: #FFFFFF;
        position: absolute;
        top: 0%;
        right: 5%;
    }

    div#delete {
        color: #FFFFFF;
        position: absolute;
        top: 0%;
        right: 0%;
    }

    div#url {
        width: 82%;
        height: 56%;
        position: absolute;
        bottom: 7%;
        left: 14%;
        border: 1px solid #4D4D4D;
        border-radius: 11px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
    }

    div#url h3 {
        width: 50%;
        height: 25%;
        font-size: 16px;
        line-height: 19px;
        color: #CECECE;
        position: absolute;
        top: 15%;
        left: 4%;
    }

    div#url h4 {
        width: 60%;
        height: 25%;
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
        position: absolute;
        top: 43%;
        left: 4%;
    }

    div#url h5 {
        width: 52%;
        height: 8%;
        font-size: 11px;
        line-height: 13px;
        color: #CECECE;
        position: absolute;
        bottom: 15%;
        left: 4%;
    }

    div#url img {
        width: 155px;
        height: 155px;
        position: absolute;
        right: 0%;
        bottom: 0%;
        border-radius: 0px 12px 12px 0px;
    }
`