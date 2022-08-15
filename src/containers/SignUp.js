import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp(){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [loading, setLoading] = useState(false);

    //const API = 'http://localhost:5000/signup';
    const API = 'https://driven-pj17-linkr.herokuapp.com/signup'
    const navigate = useNavigate();

    async function Send(event){
        event.preventDefault();
        console.log(API+' '+process.env.REACT_APP_TEST_SOME_KEY)
        const body = {email, password, userName, pictureUrl};
        setLoading(true);
        try{
            const response = await axios.post(API, body);
            setLoading(false);
            navigate('/');
            return console.log(response);
        } catch(error){
            setLoading(false);
            if(error.response.status === 401){
                return alert ('Email or username unavailable.');
            }
            if(error.response.status === 422){
                return alert ('Your password must be at least 11 digits');
            }
            else {
                return console.log(error.response.data);
            }
        }
    }

    return (
        <Container buttonColor={loading ? '#9F9F9F' : '#1877F2'}>
            <div id="title">
                <h1>
                    linkr
                </h1>
                <h2>
                    save, share and discover the best links on the web
                </h2>
            </div>
            <div id="content">
                <form onSubmit={Send}>
                    <input type="email" placeholder="e-mail" autoFocus="true" value={email} onChange={e => {setEmail(e.target.value)}} required/>
                    <input type="password" placeholder="password" value={password} onChange={e => {setPassword(e.target.value)}} required/>
                    <input type="text" placeholder="username" value={userName} onChange={e => {setUserName(e.target.value)}} required/>
                    <input type="url" placeholder="picture url" value={pictureUrl} onChange={e => {setPictureUrl(e.target.value)}} required/>
                    <button type="submit" disabled={loading}>Sign Up</button>
                </form>
                <Link to={'/'}>
                    <p>Switch back to log in</p>
                </Link>
            </div>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;

    div#title {
        width: 63%;
        height: 100vh;
        background-color: #151515;
        color: #FFFFFF;
        box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
    }

    h1 {
        width: 26%;
        height: 11%;
        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 106px;
        position: absolute;
        top: 30%;
        left: 16%;
    }

    h2 {
        width: 33%;
        height: 14%;
        font-family: 'Oswald', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 44px;
        position: absolute;
        top: 41%;
        left: 16%;
        z-index: 1;
    }

    div#content {
        width: 37%;
        height: 100vh;
        background-color: #333333;
        position: relative;
        display: flex;
        justify-content: center;
    }

    div#content form {
        width: 100%;
        height: 37%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 27%;
    }

    input {
        width: 80%;
        height: 17%;
        background: #FFFFFF;
        border-radius: 6px;
        margin-bottom: 3%;
        padding-left: 17px;
        outline: none;
        border: none;
        font-family: 'Oswald', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
    }

    input::placeholder {
        font-family: 'Oswald', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        color: #9F9F9F;
    }
    
    button {
        width: 80%;
        height: 17%;
        background-color: ${props => props.buttonColor};
        border-radius: 6px;
        border-style: none;
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        color: #FFFFFF;        
    }

    button:hover {
        cursor: pointer;
    }

    p {
        width: fit-content;
        font-family: 'Lato', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        text-align: center;
        text-decoration-line: underline;
        color: #FFFFFF;
        position: absolute;
        top: 65%;
        left: 33%;
        margin-top: 10px;
    }

    p:hover{
        cursor: pointer;
    }

    @media (max-height: 810px){
        h1 {
            font-size: 83px;
        }

        h2 {
            font-size: 34px;
        }
    }

    @media (max-height: 750px){
        p {
            top: 70%;
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
            top: 440px;
            left: 37%;
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
            width: 41%;
            top: 380px;
            left: 29%;
            font-size: 17px;
        }
    }
`

