import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import HomePage from './routes/HomePage';
import GroupsPage from './routes/GroupsPage';
import GroupPage from './routes/GroupPage';
import ViewPostPage from './routes/ViewPostPage';
import SubmitPostPage from './routes/SubmitPostPage';
import UsersPage from './routes/UsersPage';
import UserPage from './routes/UserPage';
import NotFoundPage from './routes/NotFoundPage';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='users'>
            <Route index element={<UsersPage />} />
            <Route path=':userId' element={<UserPage />} />
          </Route>
          <Route path='g'>
            <Route index element={<GroupsPage />} />
            <Route path=':groupName'>
              <Route index element={<GroupPage />} />
              <Route path=':commentId' element={<ViewPostPage />} />
            </Route>
          </Route>
          <Route path='submit' element={<SubmitPostPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);