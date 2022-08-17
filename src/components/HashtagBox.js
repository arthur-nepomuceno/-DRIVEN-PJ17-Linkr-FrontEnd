import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

export default function HashtagBox(){

    const API = "http://localhost:5000/hashtag";
    const navigate = useNavigate();
    const { token } = useContext(UserContext);
    const [data, setData] = useState([]);

    async function getTrending(){

        try {
            const config = {headers: {Authorization: `Bearer ${token.token}`}}
            const response = await axios.get(API, config);
            setData(response.data);
            return;
        } catch(error) {
            return console.log(error);
            
        }
    }

    useEffect(() => {getTrending()}, [])

    function redirectHashtagPage(hashtag){

        navigate('/hashtag/' + hashtag, {state: { hashtag }});
        
    }

    if(data === ""){
        return (
            <Box>
                <Title>trending</Title>
                <Line></Line>
                <Hashtags hashtag="Nothing trending" />
            </Box>
        );
    }

    return (
        <Box>
            <Title>trending</Title>
            <Line></Line>
            {data.map((render, index) => 
                (<Hashtags hashtag={render.hashtag} callback={redirectHashtagPage} key={index} />)
            )}
        </Box>
    );

}

function Hashtags({ hashtag, callback }){

    return (
        <Hashtag onClick={() => callback(hashtag)}># { hashtag }</Hashtag>
    );

}

const Box = styled.div `
    width: 21%;
    display: flex;
    flex-direction: column;
    background-color: #171717;
    color: white;
    font-weight: 700;
    border-radius: 15px;
    position: absolute;
    top: 23%;
    right: 18%;

    @media (max-width: 1080px) {
        display: none;
    }
`

const Title = styled.span `
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    font-size: 27px;
    padding: 20px;
`

const Line = styled.div `
    width: 100%;
    height: 1px;
    background-color: #484848;
    margin-bottom: 10px;
`

const Hashtag = styled.div `
    width: 100%;
    min-height: 40px;
    display: flex;
    font-size: 18px;
    padding: 15px;
    word-break: break-all;
    cursor: pointer;
`
