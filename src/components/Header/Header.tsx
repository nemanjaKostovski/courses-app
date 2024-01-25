import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchUser, removeUser } from '../../services';

export default function Header() {
  const user_token = localStorage.getItem('user_token');
  const BUTTON_TEXT = user_token ? 'LOGOUT' : 'LOGIN';

  const userName = useAppSelector((state) => state.user.user.name);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(removeUser());
    user_token && localStorage.removeItem('user_token');
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
  }, [dispatch, user_token]);
  return (
    <header className='flex items-center justify-between pl-10 pr-10 mt-2'>
      <Logo />
      <div className='flex flex-row'>
        {
          <p data-testid='user-name' className='p-2'>
            {userName === null ? 'Admin' : userName}
          </p>
        }
        <Button buttonText={BUTTON_TEXT} onClick={handleLogout} />
      </div>
    </header>
  );
}
