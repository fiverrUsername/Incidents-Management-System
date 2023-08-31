// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import './index.css'
// import App from './App'
// import reportWebVitals from './reportWebVitals'
// import { BrowserRouter, HashRouter } from 'react-router-dom'

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// )
// root.render(
//   //  <React.StrictMode>
//     <HashRouter>
//       <App />
//     </HashRouter>
//   // </React.StrictMode> 
// )

// reportWebVitals()


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { RouterProvider, createHashRouter } from 'react-router-dom'; // Import necessary components
import { createRoot } from 'react-dom/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
const router = createHashRouter([
  {
    path: "/*",
    element: <App />,
  }
]);

root.render(
  <React.StrictMode>
    <HashRouter>
      <RouterProvider router={router}/>
    </HashRouter>
  </React.StrictMode>
);

export { router, root };
