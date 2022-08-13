import styled from "styled-components";
import { useState } from "react";
import Header from "../components/Header";
import HashtagBox from "../components/HashtagBox";

export default function Timeline(){

    const [click, setClick] = useState(false);
    const [show, setShow] = useState(false);

    function hide(){
        if(show === true) {
            setShow(false);
            setClick(false);
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
            <TimelinePage>
                <Title>timeline</Title>
                <Content>
                    <Posts></Posts>
                    <HashtagBox />
                </Content>
            </TimelinePage>
        </Container>
    );

}

const Container = styled.div `
    width: 100vw;
    height: 100vh;
    background-color: #333333;
`

const TimelinePage = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Title = styled.div `
    width: 70%;
    height: 160px;
    display: flex;
    align-items: center;
    color: white;
    font-size: 45px;
    font-weight: 700;
    margin-top: 70px;
`

const Content = styled.div `
    width: 70%;
    display: flex;
`

const Posts = styled.div `
    width: 70%;
    background-color: gray;
    margin-right: 30px;
`
