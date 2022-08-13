import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";

import { decodeToken } from "react-jwt";

import { useContext } from "react";
import UserContext from "../contexts/UserContext";


export default function Publish(){
    const [url, setUrl] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const API = "/publish"
    const { token } = useContext(UserContext);
    const decode = decodeToken(token.token);
    const config = {
        headers: { 'Authorization': `Bearer ${token.token}` }
    };
   
    const [{ data, isLoading, error }, executePost] = useAxios({ method: 'POST', route: API, config }, true)
    const imgUrl = decode.pictureUrl;

    const Publish = (event)=>{
        event.preventDefault();
        const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'); 
        const isURL = regex.test(url)
        if (!isURL){
           return alert ('Url invalid.')
        }
        const body = {url, content};
        executePost(body, config) 
    }

    return (
        <Container buttonColor={isLoading ? '#9F9F9F' : '#1877F2'}>
                <div id="img"><img src={imgUrl} alt="user" /></div>
                <div id="content">
                    <div id="text">
                         <h1> What are you going to share today?</h1>
                    </div>
                    <form onSubmit={Publish}>
                        <input type="text" placeholder="http://..." value={url} onChange={e => {setUrl(e.target.value)}}  disabled={isLoading} required/>
                        <input id="content" type="text" placeholder="Awesome article about #javascript" value={content} onChange={e => {setContent(e.target.value)}} disabled={isLoading}/>
                       <div id="teste">
                       <button type="submit"> 
                        {isLoading ? (<p>Publishing ...</p>) : (<p>Publish</p>)}
                       </button>
                       </div>    
                   </form>
              </div>
        </Container>
    );
}

const Container = styled.div`
    width: 42%;
    height: 170px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    margin: 70px 0px 0px 250px;
   
   
    img{
        width: 50px;
        height: 50px;
        margin: 5px 0px 0px 5px;
        border-radius: 26.5px;
    }
    div#img{
        width: 10%;
    }
    div#content {
        width: 90%;
        display: flex;
        flex-direction: column;
        margin: 0px 0px 0px 0px;
    }

    div#content form {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
     }
       
     div#content h1 {
        font-family: 'Lato', sans-serif;
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        color: #707070;
        margin: 5px 0px 5px 18px;
        display: flex;
        justify-content: flex-start;
    }
    input {
        width: 100%;
        height: 37%;
        background: #EFEFEF;
        border-radius: 5px;
        margin-bottom: 1%;
        outline: none;
        border: none;
        font-family: 'Oswald', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
    }

    input::placeholder {
        font-family: 'Lato', sans-serif;
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
        color: #949494;
    }

    input#content{
        height: 97%
    }
    div#teste{
        width: 140%;
        display: flex;
        justify-content: flex-end;
    }
    button {
        width: 30%;
        background: #1877F2;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;  
        border-style: none;
        color: #FFFFFF;
        font-family: 'Lato', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px; 
    }

    button:hover {
        cursor: pointer;
    }

  
    @media (max-height: 810px){
        img{
            display:none;
        }
        h1 {
            font-size: 83px;
        }

        h2 {
            font-size: 34px;
        }
    }

    @media (max-height: 750px){
        p {
            top: 60%;
            left: 25%;
        }

        input {
            font-size: 20px;
        }

        input::placeholder {
            font-size: 20px;
        }

        button {
            font-size: 20px;
           
        }
    }

    @media (max-width: 1080px){
        flex-direction: column;
        width:  720px;

        div#title {
            width: 100%;
            height: 175px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        h1 {
            width: 45%;
            height: fit-content;
            top: 10px;
            left: 28%;
            font-size: 84px;
            text-align: center;
        }

        h2 {
            width: 40%;
            height: fit-content;
            top: 80px;
            left: 30%;
            font-size: 27px;
            line-height: 38px;
            text-align: center;
        }

        div#content {
            width: 100%;
        }

        div#content form {
            top: 40px;
        }

        p {
            top: 295px;
            left: 32%;
        }
    }

    @media (max-width: 720px){
        flex-direction: column;
        width:  375px;

        div#title {
            width: 100%;
            height: 175px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        h1 {
            width: 45%;
            height: fit-content;
            top: 10px;
            left: 28%;
            font-size: 76px;
            text-align: center;
        }

        h2 {
            width: 64%;
            height: fit-content;
            top: 80px;
            left: 18%;
            font-size: 23px;
            line-height: 34px;
            text-align: center;
        }

        div#content {
            width: 100%;
        }

        div#content form {
            top: 40px;
        }

        input, button {
            width: 88%;
            height: 55px;
            font-size: 22px;
        }

        input::placeholder {
            font-size: 22px;
        }

        p {
            width: fit-content;
            top: 245px;
            left: 20%;
            font-size: 17px;
        }
    }
`
