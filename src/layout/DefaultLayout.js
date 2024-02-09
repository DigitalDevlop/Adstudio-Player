import React, { useEffect, useState } from 'react';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';
import { useNavigate } from 'react-router-dom';

const DefaultLayout = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(sessionStorage.getItem('key'));
  useEffect(() => {
    // Check if the key 'key' with value '110' exists in sessionStorage
    const keyValue = sessionStorage.getItem('key');

    if (!keyValue || keyValue !== '110') {
      setAuth(false)
      // Redirect to the login page if the key is not found or doesn't have the expected value
      navigate('/login');
    }
  }, [0]);

  return (
    <div>
      {auth === '110' ? (
        <>
          <AppSidebar />
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <AppHeader />
            <div className="body flex-grow-1 px-3">
              <AppContent />
            </div>
            <AppFooter />
          </div>
        </>
      ): ""}
    </div>
  );
};

export default DefaultLayout;