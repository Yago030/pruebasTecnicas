// LoginPage.tsx

import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm';

const LoginPage: React.FC = () => {
  const handleLoginSuccess = () => {
    
    console.log('Login successful!');
  };

  return (
    <div>
      
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
