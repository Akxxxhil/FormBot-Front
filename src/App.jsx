import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/LoginPage';
import Signup from './Pages/Signup/Signup';
import toast, { Toaster } from 'react-hot-toast';
import Dashboard from './Pages/DashBoard/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Settings from './Pages/Settings/Settings';
import FormPage from './Pages/Form/FormPage';
import ThemePage from './Pages/Theme/ThemePage';
import Response from './Pages/Response/Response';
import NotFound from './Components/NotFoundPage/NotFound';
import FormResponsePage from './Pages/FormResponsePage/FormResponsePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('User logged out successfully');
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/form/:userId/:formId" element={<FormPage />} />
        <Route path="/theme/:userId/:formId" element={<ThemePage />} />
        <Route path="/theme/:userId/:folderId/:formId" element={<ThemePage />} />
        <Route path="/response/:userId/:formId" element={<Response />} />
        <Route path="/response/:userId/:folderId/:formId" element={<Response />} />
        <Route path="/settings" element={<Settings handleLogout={handleLogout} />} />
        <Route
          path="/dashboard/:userId"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard handleLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/:userId/newform"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <FormPage isNewForm={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/:userId/:folderId/newform"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <FormPage isNewForm={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/:userId/:formId"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <FormPage isNewForm={false} />
            </ProtectedRoute>
          }
        />
        <Route path="/form/:uniqueUrl" element={<FormResponsePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
