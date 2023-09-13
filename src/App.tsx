import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Root from './Root';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html {
  background-color: #101010;
  color: white;
  font-family: sans-serif;
}
body {
  margin: 0;
}
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Root />
      {/* <ReactQueryDevtools /> */}
    </>
      
  );
};
export default App;
