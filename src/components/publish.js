
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import axios from "axios";
import { decodeToken } from "react-jwt";

import { useContext } from "react";
import UserContext from "../contexts/UserContext";


export default function Publish(){
    const [url, setUrl] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const API = "http://localhost:5000/publish"
    const { token } = useContext(UserContext);
    const decode = decodeToken(token.token);
    const [Loading, setLoading] = useState(false);
    const imgUrl = decode.pictureUrl;

   
    function Publish(event){
        event.preventDefault();
        setLoading(true);
        const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'); 
        const isURL = regex.test(url)
        if (!isURL){
           return alert ('Url invalid.')
        }
       
        const body = {url, content};
        const config = {headers: {Authorization: `Bearer ${token.token}`}};

        const promise = axios.post(API, body, config);
        ;
        promise.then((e)=>{
            setLoading(false);
            setContent('')
            setUrl('')
        })
        promise.catch((e) => {
            alert("Houve um erro ao enviar este post");
            setLoading(false);
           
          })
    }

    return (
        <Container >
                <div id="img"><img src={imgUrl} alt="user" /></div>
                <div id="content">
                    <div id="text">
                         <h1> What are you going to share today?</h1>
                    </div>
                    <form onSubmit={Publish}>
                        <input type="text" placeholder="http://..." value={url} onChange={e => {setUrl(e.target.value)}} disabled={Loading}  required/>
                        <input id="content" type="text" placeholder="Awesome article about #javascript" value={content} onChange={e => {setContent(e.target.value)}}disabled={Loading} />
                       <div id="teste">
                       <button type="submit"> 
                       {Loading ? (<p>Publishing....</p>) : (<p>Publish</p>)}
                       </button>
                       </div>    
                   </form>
              </div>
        </Container>
    );
}

const Container = styled.div`
    width: 42%;
    height: 20%;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    position: absolute;
    top: 23%;
    left: 17%;
    display:flex;
    

    @media (max-width: 1080px){
        width: 100%;
        height: 164px;
        left: 0%;
        top: 160px;
        border-radius: 0px;

    }
    @media (max-width: 800px){
       img{
           display:none
       }

    }
    div#img{
        width: 10%;
    }
    img{
        width: 50px;
        height: 50px;
        margin: 5px 0px 0px 5px;
        border-radius: 26.5px;
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
   
`