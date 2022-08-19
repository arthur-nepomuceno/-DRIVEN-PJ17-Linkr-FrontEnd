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

export default function CommentComponent({ postId, userImage , show, setpostComments, postComments }) {

   
    const { token } = useContext(UserContext);
    const postCommentsAPI = `http://localhost:5000/comments`;
    const [comments, setComments] = useState("");
   
   
    async function postComment() {
        
        const body = { postId , comment:comments};   
    
            try {
                const config = { headers: { Authorization: `Bearer ${token.token}` } }
                await axios.post(postCommentsAPI, body, config);
                setComments("")
                return;
              
            } catch (error) {
                return alert(`It wasn't possible to comment the post.`)
            }
        
    }
    return (
        <Comment post={postId}>
        <div id="teste">
                    {show ? <div id="commentsArea">
                    <div>   
                        {postComments.length === 0 ?
                      <p></p> 
                    :
                    postComments.map((extract) => {
                        return(
                            <div id="oneComment">
                                <img src={extract.userimage} alt="imagem da url" />
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
                </Comment>
    
    )
}

const Comment = styled.div`
    width: 100%;
    background: #1E1E1E;
    border-radius: 16px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    z-index:0;
    margin-bottom: 16px;
    margin-top:-45px; 

    div#teste{
        top:100%;
        margin-top:0;
        padding-top:4%;
        background: #1E1E1E;
        z-index:1;
        border-radius: 16px;
    }
    

div#commentsArea img, div#oneComment img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    
}

div#oneComment{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 28px 0px 28px;
    padding-bottom: 10px;
    border-bottom: 1px solid #353535;
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
    padding:25px;
}

div#inputArea{
    width: 90%;
    background: #252525;
    padding: 10px 0px 10px 0px;
    border-radius: 8px;

    
}

div#inputArea input{
    padding: 5px;
    width:90%;
    background: #252525;
    border: none;
}

`