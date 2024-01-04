import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Header() {
  const [userName, setUserName] = useState<string | null>(null);
  const user_token = localStorage.getItem('user_token');
  const BUTTON_TEXT = user_token ? 'LOGOUT' : 'LOGIN';

  const navigate = useNavigate();

  function handleLogin() {
    user_token && localStorage.removeItem('user_token');
    navigate('/login');
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users/me', {
          headers: {
            Authorization: user_token,
          },
        });

        const userNameFromApi = response.data.result.name;

        setUserName(userNameFromApi);
      } catch (error) {
        console.error('Error getting userName:', error);
      }
    };
    user_token && getUser();
  }, [user_token]);

  return (
    <header className='flex items-center justify-between pl-10 pr-10 mt-2'>
      <Logo />
      <div className='flex flex-row'>
        {<p className='p-2'>{userName || 'Hello World'}</p>}
        <Button buttonText={BUTTON_TEXT} onClick={handleLogin} />
      </div>
    </header>
  );
}
