import styled from "styled-components";
import { decodeToken } from "react-jwt";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function Header({ click, setClick, show, setShow, hide }){

    const { token } = useContext(UserContext);
    const decode = decodeToken(token.token);
    const imgUrl = decode.pictureUrl;
    const navigate = useNavigate();

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
        localStorage.removeItem("user"); 
        navigate("/");

    }

    return (
        <>
            <Container onClick={hide}>
                <span>linkr</span>
                <User>
                    <Arrow onClick={toggleShow} isClicked={click}/>
                    <img src={imgUrl} alt="user" onClick={toggleShow} />
                </User>
            </Container>
            <Menu show={show}>
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
    z-index: 1;

    span {
        color: white;
        font-family: 'Passion One';
        font-weight: 700;
        font-size: 50px;
        margin-left: 20px;
    }

    @media (max-width: 1080px){
        width: 375px;
        position: absolute;
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
    transform: scale(2) ${props => props.isClicked ? "rotate(180deg)" : "rotate(0deg)"};
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

    span {
        color: white;
        font-weight: 700;
        font-size: 15px;
        cursor: pointer;
    }

    @media (max-width: 1080px){
        position: absolute;
    }
`