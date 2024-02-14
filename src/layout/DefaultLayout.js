import React, { useEffect, useState } from 'react';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';
import { useNavigate } from 'react-router-dom';

const DefaultLayout = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  
  useEffect(() => {
    if (!userData || !userData.jwt) {
      // Navigate to the login page if userData or jwt is not available
      navigate('/login');
    }
  }, [userData, navigate]);

  return (
    <div>
      {userData ? (
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
      ) : null}
    </div>
  );
};

export default DefaultLayout;
