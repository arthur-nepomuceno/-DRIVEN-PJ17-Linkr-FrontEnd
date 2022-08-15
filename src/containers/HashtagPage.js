import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import UserContext from "../contexts/UserContext";
import Header from "../components/Header";
import Post from "../components/Post";  
import axios from "axios";
import HashtagBox from "../components/HashtagBox";

export default function HashtagPage(){
    const [click, setClick] = useState(false);
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const location = useLocation();
    const { hashtag } = location.state;
    const {token, posts, setPosts} = useContext(UserContext);
    const API = 'http://localhost:5000/hashtag/' + hashtag;

    function hide(){
        if(show === true) {
            setShow(false);
            setClick(false);
        }
    }

    async function getHashtagPosts(){
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

    useEffect(() => {getHashtagPosts()}, [hashtag])

    return (
        <Container onClick={hide}>
            <Header 
                click={click} 
                setClick={setClick} 
                show={show} 
                setShow={setShow} 
                hide={hide}
            />
            <Title># {hashtag}</Title>
            <PostsHashtag>
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
            </PostsHashtag>
            <HashtagBox />
        </Container>
    );

}

const Container = styled.div `
    width: 100vw;
    height: 100vh;
    display: flex;
    background-color: #333333;

    @media (max-width: 1080px){
        width: 375px;
        position: relative;
    }
`
const Title = styled.div `
    width: 100%;
    height: 6%;
    display: flex;
    align-items: center;
    color: white;
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    word-break: break-all;
    position: absolute;
    left: 17%;
    top: 12%;

    @media (max-width: 1080px){
        width: 100%;
        height: 49px;
        left: 5%;
        top: 90px;
    }

`

const PostsHashtag = styled.div `
    width: 42%;
    height: 53%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    position: absolute;
    top: 22%;
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