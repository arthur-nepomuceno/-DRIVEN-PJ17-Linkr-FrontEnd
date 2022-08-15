import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { Oval } from "react-loader-spinner";
import ReactModal from 'react-modal';
import UserContext from "../contexts/UserContext";
import Header from "../components/Header";
import Post from "../components/Post";  
import axios from "axios";
import HashtagBox from "../components/HashtagBox";

export default function Timeline(){
    const [click, setClick] = useState(false);
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [modal, setModal] = useState(false);
    const [thisPost, setThisPost] = useState(null);
    const [awaitServer, setAwaitServer] = useState(false);
    const {token, posts, setPosts} = useContext(UserContext);
    const timelineAPI = 'http://localhost:5000/timeline';
    const deleteAPI = `http://localhost:5000/delete/${thisPost}`;

    function hide(){
        if(show === true) {
            setShow(false);
            setClick(false);
        }
    }


    async function getPosts(){
        try {
            const config = {headers: {Authorization: `Bearer ${token.token}`}}
            const response = await axios.get(timelineAPI, config);
            setPosts(response.data);
            return;
        } catch(error) {
            setError(true);
            return console.log(error);
            
        }
    }
    useEffect(() => {getPosts()}, [modal])

    async function confirmDeletePost(){
        try {
            setAwaitServer(true);
            const config = {headers: {Authorization: `Bearer ${token.token}`}}
            await axios.delete(deleteAPI, config);
            setAwaitServer(false)
            setModal(false);
            return;
        } catch(error) {
            setAwaitServer(false)
            setModal(false);
            return alert(`It wasn't possible to delete the post.`)
        }
    }

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
                <Modal isOpen={modal}>
                    {!awaitServer ? <p>Are you sure you want to delete this post?</p>
                                 : <>
                                    <p><Oval color="#FFFFFF" secondaryColor="#FFFFFF" /></p>
                                   </>}
                                 
                    <div id="no-button" onClick={() => setModal(false)}>
                        <p>No, go back</p>
                    </div>
                    <div id="yes-button" onClick={confirmDeletePost}>
                        <p>Yes, delete it</p>
                    </div>
                </Modal>
                {error ? <p>An error occured while trying to fetch the posts, please refresh the page.</p>
                       : !posts ? <>
                                     <Oval color="#FFFFFF" secondaryColor="#FFFFFF"/>
                                     <p>... loading ...</p>
                                  </>
                                : posts.length === 0 ? <p>There are no posts yet.</p>
                                                     : posts.map((post, index) => <Post key={index}
                                                                                        setModal={setModal}
                                                                                        postId = {post.id}
                                                                                        userId={post.userId}
                                                                                        userImage={post.userImage}
                                                                                        userName={post.userName}
                                                                                        postDescription={post.postDescription}
                                                                                        urlTitle={post.urlTitle}
                                                                                        urlDescription={post.urlDescription}
                                                                                        postUrl={post.postUrl}
                                                                                        urlImage={post.urlImage}
                                                                                        likesCount={post.likesCount}
                                                                                        likedBy={post.likedBy}
                                                                                        setThisPost={setThisPost}/>)}
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
const Modal = styled(ReactModal)`
    position: absolute;
    width: 41%;
    height: 26%;
    left: 29%;
    top: 34%;
    background: #333333;
    border-radius: 50px;

    > p {
        width: 57%;
        height: 31%;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 34px;
        line-height: 41px;
        text-align: center;
        color: #FFFFFF;
        position: absolute;
        top: 15%;
        left: 21%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    div#no-button {
        width: 22%;
        height: 14%;
        background: #FFFFFF;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 61%;
        left: 25%;
    }

    div#no-button:hover {
        cursor: pointer;
    }

    div#no-button p {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        color: #1877F2;
    }

    div#yes-button {
        width: 22%;
        height: 14%;
        background: #1877F2;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 61%;
        right: 25%;
    }

    div#yes-button:hover {
        cursor: pointer;
    }

    div#yes-button p {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        color: #FFFFFF;
    }

    @media (max-width: 1080px){
        max-width: 100%;
        height: 9%;        
        top: 34%;
        background: #333333;
        border-radius: 15px;

        > p {
            width: 80%;
            height: 15%;
            font-size: 13px;
            line-height: 13px;
            top: 20%;
            left: 11%;
        }

        div#no-button {
            width: 30%;
            height: 14%;
            background: #FFFFFF;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            left: 15%;
        }

        div#no-button p {
            font-size: 8px;
            line-height: 12px;
        }

        div#yes-button {
            width: 30%;
            height: 14%;
            background: #1877F2;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            right: 15%;
        }

        div#yes-button p {
            font-size: 8px;
            line-height: 12px;
        }
    }

`