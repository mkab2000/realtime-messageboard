import React, { useState } from 'react';
import { useEffect } from 'react';
import { useGetAllPostQuery, useUpdateAllPostQuery } from '../hooks/postsQuery';
import Post from './Post';
import Nav from './Nav';
import useWebsocketData from '../hooks/useWebsocketData';
import { iPost } from '../interfaces';
import { styled } from 'styled-components';

const PostList = () => {
  const { data: queryPostData, isLoading, error } = useGetAllPostQuery();
  const {data: websocketData} = useWebsocketData();

  const updatePostQueryData = useUpdateAllPostQuery();

  useEffect(() => { if (websocketData) {
    console.log(websocketData.action);
    const currentPost: iPost = websocketData.data;

    switch(websocketData.action) {
    case 'createPost': {
      if(!queryPostData.find((post: iPost) => post._id === currentPost._id)){
        updatePostQueryData([currentPost, ...queryPostData])
      }
      break;
    }
    case 'updatePost': {
      if(queryPostData.find((post: iPost) => post._id === currentPost._id)){
        updatePostQueryData(queryPostData.map((post: iPost) => post._id === currentPost._id ? currentPost : post))
      };
      break;
    }
    case 'deletePost': {
      updatePostQueryData(queryPostData.filter((post: iPost) => post._id !== currentPost._id));
      break;
    }
    default: {
      break;
    }
    }
  }}, [websocketData]);


  if(isLoading) return (
    <h1>Loading...</h1>
  );

  if(error) return (
    <h1>Error fetching data.</h1>
  );

  return (
    <div className='PostList' style={{padding: '40px'}}>
      <Nav />
      <StyledPostList>
        {queryPostData.map((post: iPost) =>
          <Post key={post._id} _id={post._id} title={post.title} content={post.content} comments={post.comments} onSeparatePage={false}/>
        )}
      </StyledPostList>
    </div>
  );
};

const StyledPostList = styled.div`
display: flex;
flex-direction: column;
padding: 0 50px;

@media only screen and (max-width: 600px) {
    padding: 0 30px
    width: auto;
}

`;
export default PostList;