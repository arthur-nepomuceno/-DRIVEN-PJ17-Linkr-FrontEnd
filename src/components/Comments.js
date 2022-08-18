import styled from "styled-components";

export default function Comment(userName, userImage, userId, postId, comment){
    return (
       <Container>
             <div id="url">
                        <h3>{userName}</h3>
                        <h4>{comment}</h4>
                        <h5>{userId}</h5>
                        <img src={userImage} alt="imagem da url" />
                    </div>

       </Container>
    );


}
const Container = styled.div`
    width: 100%;
    min-height: 276px;
    background-color: #171717;
    border-radius: 16px;
    position: relative;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    margin-bottom: 16px;`