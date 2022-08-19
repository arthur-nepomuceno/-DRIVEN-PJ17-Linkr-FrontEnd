import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { decodeToken } from "react-jwt";
import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";


export default function Publish({loading, setLoading}){
    const [url, setUrl] = useState('');
    const [content, setContent] = useState('');
    const API = "http://localhost:5000/publish";
    const timelineAPI = 'http://localhost:5000/timeline';
    const { token, setPosts } = useContext(UserContext);
    const decode = decodeToken(token.token);
    const imgUrl = decode.pictureUrl;
   
    async function Publish(event){
        event.preventDefault();
        setLoading(true);

        const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'); 
        const isURL = regex.test(url)

        if (!isURL){
            setLoading(false);
            return alert ('Url invalid.')
        }
        
        try {
            const body = {url, content};
            const config = {headers: {Authorization: `Bearer ${token.token}`}};
            await axios.post(API, body, config);
            setLoading(false);
            setContent('')
            setUrl('')
        } catch(error) {
            alert("Houve um erro ao enviar este post");
            setLoading(false);         
        }
    }

    return (
        <Container >
            <div id="img">
                <img src={imgUrl} alt="user" />
            </div>
            <div id="content">
                <h1> What are you going to share today?</h1>

                <form onSubmit={Publish}>
                    <input id="link" type="text" placeholder="http://..." disabled={loading} value={url} onChange={e => {setUrl(e.target.value)}} required/>
                    <textarea id="content" type="text" placeholder="Awesome article about #javascript" maxLength="120" disabled={loading} value={content} onChange={e => {setContent(e.target.value)}}/>
                    <button type="submit">{loading ? 'Publishing...' : 'Publish'}</button>
                </form>
            </div>
        </Container>
    );
}

const Container = styled.div`
    width: 42%;
    height: 20%;
    position: absolute;
    top: 25%;
    left: 17%;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;

    div#img {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 8%;
        left: 3%;
    }

    div#img img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    div#content {
        width: 82%;
        height: 84%;
        position: absolute;
        top: 10%;
        left: 14%;
    }

    div#content h1 {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        color: #707070;
    }

    input#link {
        width: 100%;
        height: 14%;
        position: absolute;
        top: 23%;
        background: #EFEFEF;
        border-radius: 5px;
        outline: none;
        border: none;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
        color: #949494;
        padding-left: 12px;
    }


    input#link::placeholder {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
        color: #949494;
    }

    textarea#content {
        width: 100%;
        height: 38%;
        position: absolute;
        top: 43%;
        background: #EFEFEF;
        border-radius: 5px;
        outline: none;
        border: none;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
        color: #949494;
        padding-left: 12px;
    }

    button {
        width: 22%;
        height: 18%;

        background: #1877F2;
        border-radius: 5px;

        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #FFFFFF;

        position: absolute;
        right: 0%;
        bottom: 0%;
    }

    button:hover {
        cursor: pointer;
    }

    @media (max-width: 1080px){
        width: 100%;
        height: 164px;
        top: 160px;
        left: 0%;
        border-radius: 0px;

        div#img {
            display: none;
        }

        div#content {
            width: 100%;
            height: 100%;
            top: 0%;
            left: 0%;
        }

        div#content h1 {
            width: 82%;
            font-size: 17px;
            line-height: 20px;
            text-align: center;
            position: absolute;
            top: 10px;
            left: 10%;
        }

        input#link {
            width: 92%;
            height: 30px;
            position: absolute;
            top: 42px;
            right: 4%;
        }

        textarea#content {
            width: 92%;
            height: 47px;
            top: 77px;
            right: 4%;
        }

        button {
            width: 30%;
            height: 22px;
            right: 4%;
            bottom: 12px;
        }
    }

`