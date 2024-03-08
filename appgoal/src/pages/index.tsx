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
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-400 to-green-600">
      {!loggedIn ? <LoginForm onLoginSuccess={handleLoginSuccess} /> : <SystemsPage />}
    </div>
  );
};

// Exportación del componente HomePage
export default HomePage;
