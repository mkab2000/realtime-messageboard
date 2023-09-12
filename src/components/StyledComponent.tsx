import styled from 'styled-components';

export const StyledNewOrUpdatePost = styled.div`
padding: 40px 80px 0px 80px;

display: flex;
flex-direction: column;

  h1 {
    margin-top: 0px;
    margin-bottom: 10px;
  }

  h2 {
    margin-top: 10px;
    padding-top: 20px;
    border-top: 2px solid #a52b52;
  }

  textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 25px;
  }

  button {
    display: block;
    font-size: 16px;
    padding: 13px 40px;
    background-color: #a72951;
    color: white;
    border-radius: 25px;
    margin: 0 auto;
  }

  a {
    text-decoration: none;
  }
  .error-text {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
  @media only screen and (max-width: 600px) {
    padding: 0 30px;
}
`;