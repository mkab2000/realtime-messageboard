import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostPage from './components/PostPage';
import NewPost from './components/NewPost';
import UpdatePost from './components/UpdatePost';
import { styled } from 'styled-components';

const Root = () => {
  return (
    <StyledRoot>
      <Routes>
        <Route path="/" element={<PostList/>} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/new" element={<NewPost />} /> 
        <Route path={'/posts/:id'} element={<PostPage />}/>
        <Route path={'/posts/:id' + '/edit'} element={<UpdatePost  />} />
      </Routes>
    </StyledRoot>
      
  );
};

export const StyledRoot = styled.div`
    background-color: #101010;
    color: white;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    min-width: 600px;

    @media only screen and (max-width: 600px){
        min-width: 0;
        margin: 20px 0px;
    }
`;

export default Root;