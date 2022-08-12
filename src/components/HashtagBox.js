import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function HashtagBox(){

    const [trendingHashtags, setTrendingHashtags] = useState("");

    useEffect(() => {

        const promise = axios.get('http://localhost:5000/hashtag');

        promise
            .then(response => {
                setTrendingHashtags(response.data);
                console.log(response.data);
            })
            .catch(() => {
                alert("Try again later");
            });

    });


    return (
        <Box>
            <Title>trending</Title>
            <Line></Line>
            {trendingHashtags.map((render, index) => 
                (<Hashtags hashtag={render.hashtag} key={index} />)
            )}
        </Box>
    );

}

function Hashtags({ hashtag }){

    return (
        <Hashtag>{ hashtag }</Hashtag>
    );

}

const Box = styled.div `
    width: 300px;
    display: flex;
    flex-direction: column;
    background-color: #171717;
    color: white;
    font-weight: 700;
    border-radius: 15px;
    margin: 70px 0px 0px 400px;
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
`
