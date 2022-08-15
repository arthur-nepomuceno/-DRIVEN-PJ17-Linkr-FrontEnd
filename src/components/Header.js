import styled from "styled-components";
import { decodeToken } from "react-jwt";
import { IoIosArrowDown, IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useState } from "react";
import { DebounceInput } from 'react-debounce-input';

export default function Header({ click, setClick, show, setShow, hide }){

    const { token } = useContext(UserContext);
    const decode = decodeToken(token.token);
    const imgUrl = decode.pictureUrl;
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState('');
    
    const onChange = (event) => {
        setSearchValue(event.target.value);
    }
    const onSearch = (searchTerm) => {
        setSearchValue(searchTerm);
        console.log('buscando por: ', searchTerm);
    }
    const dataTest = [
        {
            id:1,
            name: 'lucas'
        },
        {
            id:2,
            name: 'luciano'
        },
        {
            id:3,
            name: 'luberson'
        },
        {
            id:4,
            name: 'lunet'
        },
        {
            id:5,
            name: 'aluna'
        },
        {
            id:6,
            name: 'amanda'
        },
        {
            id:7,
            name: 'manda'
        },
        {
            id:8,
            name: 'Meg Palharini'
        },
        {
            id:9,
            name: 'morena'
        },
        {
            id:10,
            name: 'Medeiros'
        },
        {
            id:11,
            name: 'Palharini'
        },
        {
            id:12,
            name: 'Pedro Palharini'
        },
        {
            id:13,
            name: 'Lucas Palharini'
        },
        {
            id:14,
            name: 'Nelson'
        },
        {
            id:15,
            name: 'Gazum'
        },
        {
            id:16,
            name: 'Pet Cau'
        },
        {
            id:17,
            name: 'Pet Dim'
        }
    ];

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
                <SearchContainer>
                    <SearchInner>
                        <DebounceInput 
                            minLength={3}
                            debounceTimeout={500}
                            onChange={onChange}
                            placeholder={'Search...'}
                            type='text'
                            value={searchValue}
                        />
                        <IoMdSearch onClick={() => onSearch(searchValue)} />                        
                    </SearchInner>
                    
                    <Dropdown>{dataTest
                        .filter((item) => {
                            const searchTerm = searchValue.toLowerCase();
                            const name = item.name.toLowerCase();
                            
                            return (searchTerm && 
                                name.includes(searchTerm) &&
                                name !== searchTerm
                                );
                        })
                        .slice(0,5)
                        .map(item => (
                            <DropdowRow onClick={()=>setSearchValue(item.name)} key={item.id}>
                                {item.name}
                            </DropdowRow>
                        ))}
                    </Dropdown>
                </SearchContainer>
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
`
const SearchContainer = styled.div`
    width: 563px;
    display: flex;
    flex-direction: column;
    
    border-radius: 8px;
    background-color: white;
    z-index: 2;
    * {
        border-radius: 8px;}
`;

const SearchInner = styled.div`
    display: flex;
    width: 563px;
    height: 45px;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    position: relative;
    z-index: 2;

    svg {
        font-size: 32px;
        cursor: pointer;
        color: #c6c6c6;
        margin-right: 15px;
    }
    input{
        height: 45px;
        width: 500px;
        border: none;
        padding-left: 10px;
        &:focus {
            outline: none;
        }
    }
`;

const Dropdown = styled.div`
    width: 500px;
    background-color: #E7E7E7;
    padding-top: 45px;
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    position: absolute;
    z-index: 1;

    &:empty {
        width: 0px;
        height: 0px;
        border: none;
    }
`;

const DropdowRow = styled.div`
    height: 45px;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding-left: 10px ;
    margin: 2px 0;
`;

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
`