import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

export default function Header(){

    const imgUrl = "https://bk.ibxk.com.br/2020/09/28/28161054293196.jpg"; //substituir pela imagem que vem do back

    const [click, setClick] = useState(false);
    const [show, setShow] = useState(false);

    function toggleShow(){

        if(show === false){
            setShow(true);
            setClick(true);
        } else {
            setShow(false);
            setClick(false);
        }
    }

    function userLogout(){
        
    }

    return (
        <>
            <Container>
                <span>linkr</span>
                <User>
                    <Arrow onClick={toggleShow}/>
                    <img src={imgUrl} alt="user" onClick={toggleShow} />
                </User>
            </Container>
            <Menu isClicked={click} show={show}>
                <span onClick={userLogout}>Logout</span>
            </Menu>
        </>
    );

}

const Container = styled.div `
    width: 100vw;
    height: 70px;
    background-color: #151515;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0px;
    left: 0px;

    span {
        color: white;
        font-weight: 700;
        font-size: 50px;
        margin-left: 20px;
    }

`

const User = styled.div `
    width: 110px;
    display: flex;
    align-items: center;
    justify-content: space-between;

     img {
        width: 53px;
        height: 53px;
        background-color: red;
        border-radius: 50%;
        margin-right: 20px;
        cursor: pointer;
    }

`

const Arrow = styled(IoIosArrowDown)`
    color: white;
    transform: scale(2);
    cursor: pointer;
`

const Menu = styled.div `
    width: 150px;
    height: 45px;
    background-color: #171717;
    display: ${props => props.show ? "flex" : "none"};
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 70px;
    right: 0px;
    border-radius: 0px 0px 0px 20px;
    color: white;
    font-weight: 700;
    font-size: 15px;
`