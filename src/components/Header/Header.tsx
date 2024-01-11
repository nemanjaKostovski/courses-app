import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchUser, removeUser } from '../../services';

export default function Header() {
  const user_token = localStorage.getItem('user_token');
  const BUTTON_TEXT = user_token ? 'LOGOUT' : 'LOGIN';

  const user = useAppSelector((state) => state.user.user.name);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    user_token && localStorage.removeItem('user_token');
    dispatch(removeUser());
    navigate('/login');
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        await dispatch(fetchUser());
      } catch (error) {
        console.error('Error getting userName:', error);
      }
    };
    user_token && getUser();
  }, [user_token, dispatch]);
  return (
    <header className='flex items-center justify-between pl-10 pr-10 mt-2'>
      <Logo />
      <div className='flex flex-row'>
        {<p className='p-2'>{user}</p>}
        <Button buttonText={BUTTON_TEXT} onClick={handleLogout} />
      </div>
    </header>
  );
}
