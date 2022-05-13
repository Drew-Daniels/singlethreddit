import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import HomePage from './routes/HomePage';
import GroupPage from './routes/GroupPage';
import GroupPostPage from './routes/GroupPostPage';
import UserPage from './routes/UserPage';
import NotFoundPage from './routes/NotFoundPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='g/:groupName'>
            <Route index element={<GroupPage />} />
            <Route path='submit' element={<GroupPostPage />} />
          </Route>
          <Route path='/user/:userName' element={<UserPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);