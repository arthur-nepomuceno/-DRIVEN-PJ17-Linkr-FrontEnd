import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactTagify } from "react-tagify";
import { ImPencil2 } from "react-icons/im";
import { FaTrash } from "react-icons/fa";
import { HiOutlineHeart } from "react-icons/hi";
import { useState, useContext } from "react";
import { decodeToken } from "react-jwt";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { TbSend } from "react-icons/tb";

export default function Post({ setModal, postId, userId, userImage, userName, postDescription, urlTitle, urlDescription, postUrl, urlImage, likesCount, likedBy, setThisPost, commentsCount }) {

    const [edit, setEdit] = useState(false);
    const [newPost, setNewPost] = useState(postDescription);
    const [update, setUpdate] = useState(false);
    const [disable, setDisable] = useState(false);
    const { token } = useContext(UserContext);
    const decode = decodeToken(token.token);
    const isPostOwner = decode.id === userId;
    const API = `http://localhost:5000/update`;
    const likeAPI = `http://localhost:5000/like`;
    const unlikeAPI = `http://localhost:5000/unlike/${postId}`;
    const getCommentsAPI = `http://localhost:5000/comments/${postId}`;
    const postCommentsAPI = `http://localhost:5000/comments`;
    const [postComments, setpostComments] = useState([]);
    const [comments, setComments] = useState("");
    const [like, setLike] = useState(false);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
   
   
   
    function redirectHashtagPage(hashtag) {

        navigate('/hashtag/' + hashtag, { state: { hashtag } });

    }

    function editPost() {
        if (edit === false) {
            setEdit(true);
        } else {
            setEdit(false);
            setNewPost(postDescription);
        }
    }

    async function deletePost() {
        setModal(true);
        setThisPost(postId);
    }

    async function pressKey(event) {
        if (event.key === 'Escape') {
            setEdit(false);

            if (update === false) {
                setNewPost(postDescription);
            } else {
                setNewPost(newPost);
            }
        }

        if (event.key === 'Enter') {
            setDisable(true);
            const config = { headers: { Authorization: `Bearer ${token.token}` } };
            const body = { content: newPost, id: postId };
            try {
                await axios.put(API, body, config);
                setDisable(false);
                setEdit(false);
                setUpdate(true);
                return;
            } catch (error) {
                alert(`Sorry, it wasn't possible to save your editing.`)
                setEdit(true);
                return console.log(error.response.data);
            }
        }
    };
    async function likePost() {
       
        const body = { postId };
     if (like === false) {
            setLike(true);
            
            try {
                const config = { headers: { Authorization: `Bearer ${token.token}` } }
                await axios.post(likeAPI, body, config);
                return;
            } catch (error) {
                return alert(`It wasn't possible to like the post.`)
            }
        } if (like === true) {
            setLike(false);
           try {
                const config = { headers: { Authorization: `Bearer ${token.token}` } }
                await axios.delete(unlikeAPI, config);
                return;
            } catch (error) {
                return alert(`It wasn't possible to like the post.`)
            }
        }
    }

    async function commenttoggle() {
        if (show === false) {
            
            setShow(true);
            try {
                const config = {headers: {Authorization: `Bearer ${token.token}`}}
                const response = await axios.get(getCommentsAPI, config);
                setpostComments(response.data);
                return;
            } catch (error) {
                return alert(`It wasn't possible to like the post.`)
            }
        } else {
            setShow(false);
        }
    }
    async function postComment() {
        
        const body = { postId , comment:comments};   
    
            try {
                const config = { headers: { Authorization: `Bearer ${token.token}` } }
                await axios.post(postCommentsAPI, body, config);
                return;
              
            } catch (error) {
                return alert(`It wasn't possible to comment the post.`)
            }
        
    }
    return (
        <Container>
            <div id="post">
                <div id="user">
                    <img src={userImage} alt="foto do usuário" />
                    <div id="icons" >
                        <div id="like">
                            <div onClick={likePost}>
                                {like ? (< AiFillHeart size={20} cursor="pointer" color="red" />) : (< HiOutlineHeart size={20} cursor="pointer" />)}
                            </div>
                            {likesCount === '0' ? ''
                                : likesCount === '1' ? <h5>{likesCount} like</h5>
                                    : <h5>{likesCount} likes</h5>}
                        </div>
                        <div id="comment">
                            <div onClick={commenttoggle}>
                                < AiOutlineComment size={20} cursor="pointer" color="white" />
                            </div>
                            {commentsCount === '0' ? ''
                                : commentsCount === '1' ? <h5>{commentsCount} comment</h5>
                                    : <h5>{commentsCount} comments</h5>}
                        </div>
                        <div id="repost">
                            <div onClick={likePost}>
                                < BiRepost size={20} cursor="pointer" color="white" />
                            </div>
                            {likesCount === '0' ? ''
                                : likesCount === '1' ? <h5>{likesCount} like</h5>
                                    : <h5>{likesCount} likes</h5>}
                        </div>
                    </div>
                </div>
                <div id="head">
                    <h1>{userName}</h1>
                    <div id="edit" onClick={editPost} hidden={!isPostOwner}>
                        <ImPencil2 cursor="pointer" />
                    </div>
                    <div id="delete" onClick={deletePost} hidden={!isPostOwner}>
                        <FaTrash cursor="pointer" />
                    </div>

                </div>
                <a href={postUrl} target="_blank">
                    <div id="url">
                        <h3>{urlTitle}</h3>
                        <h4>{urlDescription}</h4>
                        <h5>{postUrl}</h5>
                        <img src={urlImage} alt="imagem da url" />
                    </div>
                </a>
                <div id="teste">
                    {show ? <div id="commentsArea">
                    <div>   
                        {postComments.length === 0 ?
                      <p></p> 
                    :
                    postComments.map((extract) => {
                        return(
                            <div id="oneComment">
                                <img src={extract.userImage} alt="imagem da url" />
                                <span>
                                    <h5>{extract.username}</h5>
                                    <h4>{extract.comment}</h4>
                                </span>
  
                          </div>
                        );
                    })
                }
                </div>
                <div id="sendComment">
                        <img src={userImage} alt="foto do usuário" />
                        <div id="inputArea" >
                        <input type="text" placeholder="write a comment" value={comments} onChange={e => {setComments(e.target.value)}} required/>
                        < TbSend size={20} cursor="pointer" color="white" onClick={postComment} />
                        </div>
                        </div>       
                </div> : null}
                </div>
            </div>

        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    min-height: 276px;
    background-color: #171717;
    border-radius: 16px;
    position: relative;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    margin-bottom: 16px;
    z-index:1;

    div#teste{
        position: sticky;
        margin-top:-10px;
  
    }

    div#user {
        width: 55px;
        height: 100%;
        position: absolute ;
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
        margin-bottom: 20px;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center; 
    }
    
    div#repost {
        color: #FFFFFF;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center; 
    }

    div#like h5, div#comment h5, div#repost h5 {
        font-size: 10px;
        line-height: 13px;
        text-align: center;
        margin-top: 3px;
    }

    div#head {
        width: 82%;
        height: 30%;
        position: absolute;
        top: 7%;
        left: 14%;
    }

    div#head h1 {
        font-size: 19px;
        line-height: 23px;
        color: #FFFFFF;
    }

    div#head h2 {
        width: 100%;
        max-height: 52px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
        position: absolute;
        top: 37%;
    }

    div#head textarea {
        width: 100%;
        height: 44px;
        outline: none;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #4C4C4C;
        border-radius: 7px;
        padding-left: 10px;
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
        overflow-y: hidden;
    }

    div#url h4 {
        width: 60%;
        height: 25%;
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
        position: absolute;
        top: 33%;
        left: 4%;
        overflow-y: hidden;
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
        right: -1%;
        bottom: -1%;
        border-radius: 0px 12px 12px 0px;
    }

    @media (max-width: 1080px){
        min-height: 232px;
        border-radius: 0px;

        div#user {
            width: 40px;
            height: 41%;
            top: 4%;
            left: 4%;  
        }

        div#user img {
            width: 40px;
            height: 40px;
        }

        div#like {
            top: 55%;
        }

        div#like h5 {
            font-size: 9px;
            line-height: 11px;
            margin-top: 12px;
        }

        div#head {
            width: 77%;
            height: 38%;
            top: 4%;
            left: 18%;
        }

        div#head h1 {
            font-size: 17px;
            line-height: 20px;
        }

        div#head h2 {
            font-size: 15px;
            line-height: 18px;
            bottom: 0%;
        }

        div#edit {
            right: 11%;
        }

        div#delete {
            right: 3%;
        }

        div#url {
            width: 77%;
            height: 50%;
            bottom: 6%;
            left: 18%
        }

        div#url h3 {
            width: 50%;
            height: 23%;
            font-size: 11px;
            line-height: 13px;
            top: 6%;
            left: 4%;
        }

        div#url h4 {
            width: 63%;
            height: 44px;
            font-size: 9px;
            line-height: 11px;
            top: 28%;
        }

        div#url h5 {
            width: 52%;
            height: 8%;
            font-size: 9px;
            line-height: 11px;
            top: 74%;
        }

        div#url img {
            width: 95px;
            height: 116px;
            right: -1%;
            bottom: -1%;
        }
    }
    div#comment{
        color: #FFFFFF;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center; 
        
    }
    div#commentsArea img, div#oneComment img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    
    div#commentsArea{
        background-color:red;
        height: 50px;
        position:absolute;
        width:100%;
        top:100%;
    }


    div#oneComment{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 5x 10px 30px 30px;
        border-radius: 5px;
        padding-left: 15px;
    }
    div#oneComment span{
        width:90%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
    }
    div#oneComment h5{
        ont-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #F3F3F3;
    }
    div#oneComment h4{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #ACACAC;
    }

    div#sendComment{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    div#inputArea{
        width: 90%;
        background: #252525;
        padding: 15px;
        
    }

    div#inputArea input{
        padding: 5px;
        width:90%;
        background: #252525;
        border: none;
    }
`
