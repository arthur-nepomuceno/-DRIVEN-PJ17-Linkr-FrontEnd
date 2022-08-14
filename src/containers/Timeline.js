import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { Oval } from "react-loader-spinner";
import UserContext from "../contexts/UserContext";
import Header from "../components/Header";
import Post from "../components/Post";  
import axios from "axios";
import HashtagBox from "../components/HashtagBox";

export default function Timeline(){
    const [click, setClick] = useState(false);
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);

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
            setError(true);
            return console.log(error);
            
        }
    }
    useEffect(() => {getPosts()}, [])

    return (
        <Container onClick={hide}>
            <Header 
                click={click} 
                setClick={setClick} 
                show={show} 
                setShow={setShow} 
                hide={hide}
            />
            <Title>timeline</Title>
            <Publish></Publish>
            <TimelinePage>
                {error ? <p>An error occured while trying to fetch the posts, please refresh the page.</p>
                       : !posts ? <>
                                     <Oval color="#FFFFFF" secondaryColor="#FFFFFF"/>
                                     <p>... loading ...</p>
                                  </>
                                : posts.length === 0 ? <p>There are no posts yet.</p>
                                                     : posts.map((post, index) => <Post key={index}
                                                                                        userImage={post.userImage}
                                                                                        userName={post.userName}
                                                                                        postDescription={post.postDescription}
                                                                                        urlTitle={post.urlTitle}
                                                                                        urlDescription={post.urlDescription}
                                                                                        postUrl={post.postUrl}
                                                                                        urlImage={post.urlImage}
                                                                                        likesCount={post.likesCount}
                                                                                        likedBy={post.likedBy}/>)}
            </TimelinePage>
            <HashtagBox />
        </Container>
    );

}

const Container = styled.div `
    width: 100vw;
    height: 100vh;
    background-color: #333333;

    @media (max-width: 1080px){
        width: 375px;
        position: relative;
    }
`
const Title = styled.div `
    width: 10%;
    height: 6%;
    display: flex;
    align-items: center;
    color: white;
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    position: absolute;
    left: 17%;
    top: 12%;

    @media (max-width: 1080px){
        width: 30%;
        height: 49px;
        left: 5%;
        top: 90px;
    }

`

const Publish = styled.div`
    width: 42%;
    height: 20%;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    position: absolute;
    top: 23%;
    left: 17%;

    @media (max-width: 1080px){
        width: 100%;
        height: 164px;
        left: 0%;
        top: 160px;
        border-radius: 0px;
    }
`

const TimelinePage = styled.div `
    width: 42%;
    height: 53%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    position: absolute;
    top: 46%;
    left: 17%;

    ::-webkit-scrollbar {
        display: none;
    }

    > p {
        width: 70%;
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 23px;
        text-align: center;
        color: #FFFFFF;
        margin-top: 10px;
    }

    @media (max-width: 1080px){
        width: 100%;
        height: calc(100vh - 339px);
        left: 0%;
        top: 340px;

        > p {
            font-size: 18px;
        }
    }

`
