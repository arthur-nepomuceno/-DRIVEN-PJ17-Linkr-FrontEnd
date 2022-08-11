import styled from "styled-components";

export default function HashtagBox(){

    return (
        <Box>
            <Title>trending</Title>
            <Line></Line>
            <Hashtags># Teste</Hashtags>
            <Hashtags># TESTE 2</Hashtags>
            <Hashtags># difdebiuhvcbfruvhbfcriuvbcribvirvbrvbikkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</Hashtags>
        </Box>
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

const Hashtags = styled.div `
    width: 100%;
    min-height: 40px;
    display: flex;
    font-size: 18px;
    padding: 15px;
    word-break: break-all;
`
