import React from 'react';
import { Navigate  } from 'react-router-dom';
import { useState } from 'react';
import { StyledNewOrUpdatePost } from './StyledComponent';
const NewPost = () => {
  const [titleText, setTitleText] = useState('');
  const [displayTitleError, setDisplayTitleError] = useState(false);

  const [contentText, setContentText] = useState('');
  const [displayContentError, setDisplayContentError] = useState(false);

  const [isSubmittable, setIsSubmittable] = useState(false);

  async function submitPost() {
    if(!(titleText.length === 0 && contentText.length === 0)){
      await fetch(
        'https://realtime-rebbit-backend.vercel.app/api/posts',
        {
          method: 'POST', 
          body: JSON.stringify({title: titleText, content: contentText}),
          headers: {
            'Content-Type': 'application/json',
          }, 
        });
      setIsSubmittable(true);
    }
  }

  return(
    <StyledNewOrUpdatePost className="NewOrUpdatePost">
      <h1>New Post</h1>
      <form>
        <div>
          <h2>Title</h2>
          <textarea 
            value={titleText} 
            onChange={(e) => setTitleText(e.target.value)} 
          />
          {displayTitleError && (
            <p className="error-text">Field is necessary</p>
          )}

          <h2>Content</h2>
          <textarea 
            value={contentText} 
            onChange={(e) => setContentText(e.target.value)} 
          />
          {displayContentError && (
            <p className="error-text">Field is necessary</p>
          )}

                    
          <button type="button" onClick={ () => {
            (titleText.length === 0) ? setDisplayTitleError(true) : setDisplayTitleError(false);
            (contentText.length === 0) ? setDisplayContentError(true) : setDisplayContentError(false);
            submitPost();
          }}>Submit</button>

          {isSubmittable && (<Navigate to="/" />)}
        </div>
      </form>
    </StyledNewOrUpdatePost>
  );
};

export default NewPost;