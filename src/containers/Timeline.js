import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import Header from "../components/Header";
import Post from "../components/Post";
import axios from "axios";

export default function Timeline(){
    const [click, setClick] = useState(false);
    const [show, setShow] = useState(false);

    function hide(){
        if(show === true) {
            setShow(false);
            setClick(false);
        }
    }

    const {token, posts, setPosts} = useContext(UserContext);
    const API = 'http://localhost:5000/timeline';
    async function getPosts(){
        try {
            const config = {headers: {Authorization: `Bearer ${token.token}`}}
            const response = await axios.get(API, config);
            setPosts(response.data);
            return;
        } catch(error) {
            return console.log(error);
        }
    }
    useEffect(() => {getPosts()}, [])

    return (
        <Container onClick={hide}>
            <Header click={click} setClick={setClick} show={show} setShow={setShow} hide={hide}/>
            <div id="posts">
                <Post/>
                <Post/>
            </div>
        </Container>
    );

}

const Container = styled.div `
    width: 100vw;
    height: 100vh;
    background-color: #333333;
`