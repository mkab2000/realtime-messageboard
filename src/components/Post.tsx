import React from 'react';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { styled } from 'styled-components';
// import '../Styles/Posts.css'


const Post = ({_id, title, content, comments, onSeparatePage}: any) => {
    
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const postAddress = '/posts/' + _id;
    
  const deletePost = async () => {
    setIsDeleteLoading(true);
    await fetch(
      'https://realtime-rebbit-backend.vercel.app/api/posts/' + _id,
      {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        }, 
      });
  };

  return (
    <StyledPost className='post'>
      {onSeparatePage ? 
        <p>id: {_id}</p> : 
        <p className='postLink'>id: <Link to={postAddress}>{_id}</Link></p>
      }

      <h2><b>{title}</b></h2>
      <p className='content'>{content}</p>
      <p>Comments count: {comments.length}</p>

      {onSeparatePage ? 
        <div /> : 
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <Link to={postAddress + '/edit'}><button>Edit</button></Link>
          <button onClick={deletePost}>
            {isDeleteLoading ? 'Loading...' : 'Delete'}
          </button>
        </div>
      }
    </StyledPost>
  );
};

const StyledPost = styled.div`
  background-color: #222222;
  padding: 20px;
  margin-bottom: 30px;
  border: 2px solid;
  border-bottom-color: #101010;
  border-right-color: #101010;
  border-top-color: #292929;
  border-left-color: #292929;
  border-radius: 10px;
  transition: 0.5s;
  display: flex;
  flex-direction: column;

  p {
    margin: 0 0 10px 0;
  }

  a {
    color: #f24078;
    margin-bottom: 10px;
    transition: 1s;
  }

  .postLink {
    margin-bottom: 20px;
  }

  h2 {
    margin: 0 0 20px 0;
    line-height: 35px;
  }

  .content {
    font-size: 16px;
    margin-bottom: 20px;
    line-height: 25px;
  }

  button {
    width: 75px;
    height: 35px;
    background-color: #a72951;
    margin: 20px 20px 0 0;
    color: white;
    border-radius: 5px;
    transition: 1s;
  }

  &:hover {
    background-color: #262626;
  }

  &:hover a {
    color: white;
  }

  &:hover button {
    background-color: #222222;
    cursor: pointer;
  }
  
  &.postCreate {
    color: white;
  }

  button:hover {
    background-color: #a72951;
  }

  @media only screen and (max-width: 600px) {
    width: auto;

    .content {
      line-height: 25px;
    }
  }
`;

export default Post;