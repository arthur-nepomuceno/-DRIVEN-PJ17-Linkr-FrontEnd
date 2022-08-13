import styled from "styled-components";
import { useState } from "react";
import Header from "../components/Header";
import Publish from "../components/publish";

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

           <Publish /> 
        </Container>
    );

}

const Container = styled.div `
    width: 100vw;
    height: 100vh;
    background-color: #333333;
`