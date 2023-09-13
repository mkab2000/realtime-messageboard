import React from 'react';
import {  useNavigate  } from 'react-router-dom';
import { useGetSinglePostQuery } from '../hooks/postsQuery';
import { StyledNewOrUpdatePost } from './StyledComponent';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';



const UpdatePost = () => {
  const navigate = useNavigate();
  const _id = window.location.href.split('/')[window.location.href.split('/').length-2];

  const { data: queryData} = useGetSinglePostQuery(_id);
  
  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    content: yup.string().required('Content is required'),
  });

  const { handleSubmit, control, setValue, formState: {errors} } = useForm({resolver: yupResolver(schema)})

  const onSubmit = async (formData: {title: string, content:string}) => {
    const { title, content } = formData;
    const response = await fetch(
      'https://realtime-rebbit-backend.vercel.app/api/posts/' + _id,
      {
        method: 'PUT', 
        body: JSON.stringify({title: title, content: content}),
        headers: {
          'Content-Type': 'application/json',
        }, 
      });
    if (response.ok) {
      console.log("here")
      return navigate('/');
    }
    console.log(formData)
  }

  React.useEffect(() => {
    if (queryData) {
      setValue('title', queryData.title);
      setValue('content', queryData.content);
    }
  }, [queryData, setValue]);

  return(
    <StyledNewOrUpdatePost className="NewOrUpdatePost">
      <h1>New Post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2>Title</h2>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <textarea {...field} />
                {errors.title && (
                  <p className="error-text">{errors.title.message}</p>
                )}
              </>
            )}
          />

          <h2>Content</h2>
          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <textarea {...field} />
                {errors.content && (
                  <p className="error-text">{errors.content.message}</p>
                )}
              </>
            )}
          />

          <button type="submit">Submit</button>
        </div>
      </form>
    </StyledNewOrUpdatePost>
  );
};

export default UpdatePost;