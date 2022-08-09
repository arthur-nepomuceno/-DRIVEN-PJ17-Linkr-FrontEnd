import styled from "styled-components";
import Header from "../components/Header";

export default function DefaultPage(){

    return (
        <Container>
            <Header />
        </Container>
    );

}

const Container = styled.div `
    width: 100vw;
    height: 100vh;
    background-color: #333333;
`