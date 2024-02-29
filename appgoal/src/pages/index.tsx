import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoginForm from '@/components/LoginForm/LoginForm';
import SystemsPage from '@/components/SystemsPage/SystemsPage';

const HomePage: React.FC = () => {
  
  const [loggedIn, setLoggedIn] = useState<boolean>(false);


  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {!loggedIn ? <LoginForm onLoginSuccess={handleLoginSuccess} /> : <SystemsPage />}
    </div>
  );
};

// Exportación del componente HomePage
export default HomePage;
