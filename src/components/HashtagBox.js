import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAxios from "../hooks/useAxios";

export default function HashtagBox(){

    const API = "/hashtag";
    const navigate = useNavigate();

    const [{ data }] = useAxios({
                                    method: "get",
                                    url: API,
                                });

    function redirectHashtagPage(hashtag){

        const address = hashtag.slice(1,hashtag.length);
        navigate('/hashtag/' + address);
        
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
        <Hashtag onClick={() => callback(hashtag)}>{ hashtag }</Hashtag>
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
