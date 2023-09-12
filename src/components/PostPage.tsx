import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Post from './Post';
import { useGetSinglePostQuery, useUpdateSinglePostQuery } from '../hooks/postsQuery';
import useWebsocketData from '../hooks/useWebsocketData';
import { styled } from 'styled-components';
import { iComment } from '../interfaces';

const PostPage = () => {

  const currentUrl = window.location.href;
  const _id = currentUrl.split('/').slice(-1)[0];
  const [commentText, setCommentText] = useState('');
  const [displayCommentError, setDisplayCommentError] = useState(false);
    
  const { data: queryData, isLoading, error } = useGetSinglePostQuery(_id);
  const updatePostQueryData = useUpdateSinglePostQuery(_id);
  const {data: websocketData} = useWebsocketData();

  useEffect(() => { if (websocketData) {
    console.count('websocket runs');
    if(websocketData.data._id === _id && websocketData.action === 'updatePost')
      updatePostQueryData(websocketData.data)
    
  }}, [websocketData]);

  async function submitComment(_id: string, commentText: string) {
    if(!(commentText.length === 0)) {
      await fetch(
        'https://realtime-rebbit-backend.vercel.app/api/posts/' + _id + '/comments',
        {
          method: 'POST', 
          body: JSON.stringify({text: commentText}),
          headers: {
            'Content-Type': 'application/json',
          }, 
        });
    }
  }

  if(isLoading) return (
    <h1>Loading...</h1>
  );

  if(error) return (
    <h1>Error fetching data.</h1>
  );

  return (
    <StyledPostPage className='PostPage'>
      {queryData && 
        <Post 
          key={_id} 
          _id={queryData._id} 
          title={queryData.title} 
          content={queryData.content} 
          comments={queryData.comments} 
          onSeparatePage={true}
        />}

      <div className="createComments">
        <textarea 
          value={commentText} 
          onChange={(e) => setCommentText(e.target.value)} 
        />
        
        {displayCommentError && (
          <p className="error-text">Field is necessary</p>
        )}

        <button 
          type='button' 
          onClick={() => {
            (commentText.length === 0) ? setDisplayCommentError(true) : setDisplayCommentError(false);
            submitComment(_id, commentText);
        }}>
          Submit
        </button>
      </div>

      <div>
        <h1>Comments</h1>
        <ul>
          {queryData ? queryData.comments.map((comment: iComment) => <li key={comment._id}>{comment.text}</li>) : <></>}
        </ul>
      </div>
    </StyledPostPage>
  );
};

export const StyledPostPage = styled.div`
padding: 40px 80px 0px 80px;

textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 25px;
}
.post {
    border-right-color: #a72951;
    border-bottom-color: #a72951;

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

ul {
    /* list-style-type: none; */
    padding: 0 0 0 20px;
  }

ul li {
    margin: 10px 0 30px 0;
    padding-bottom: 10px;
    border-bottom: 2px solid #303030;
}

@media only screen and (max-width: 600px) {
    padding: 20px;
    width: auto;
}
`;

export default PostPage;
