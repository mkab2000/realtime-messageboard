import React from 'react';
import { useEffect } from 'react';
import Post from './Post';
import { useGetSinglePostQuery, useUpdateSinglePostQuery } from '../hooks/postsQuery';
import useWebsocketData from '../hooks/useWebsocketData';
import { styled } from 'styled-components';
import { iComment } from '../interfaces';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const PostPage = () => {

  const _id = window.location.href.split('/')[window.location.href.split('/').length-1];
    
  const { data: queryData, isLoading, error } = useGetSinglePostQuery(_id);
  const updatePostQueryData = useUpdateSinglePostQuery(_id);
  const {data: websocketData} = useWebsocketData();

  useEffect(() => { if (websocketData) {
    console.count('websocket runs');
    if(websocketData.data._id === _id && websocketData.action === 'updatePost')
      updatePostQueryData(websocketData.data)
    
  }}, [websocketData]);

  const schema = yup.object().shape({
    text: yup.string().required('Comment text is required'),
  });

  const { handleSubmit, control, formState: {errors} } = useForm({resolver: yupResolver(schema)})

  const onSubmit = async (formData: {text: string}) => {
    const { text } = formData;
    await fetch(
      'https://realtime-rebbit-backend.vercel.app/api/posts/' + _id + '/comments',
      {
        method: 'POST', 
        body: JSON.stringify({text: text}),
        headers: {
          'Content-Type': 'application/json',
        }, 
      });
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="text"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <textarea {...field} />
                {errors.text && (
                  <p className="error-text">{errors.text.message}</p>
                )}
              </>
            )}
          />
          
          <button type='submit'>Submit</button>
        </form>
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
