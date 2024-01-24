import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Header from '../Header/Header';
import { useAppSelector } from '../../hooks';
import { useState } from 'react';

export default function EmptyCourseList() {
  const BUTTON_TEXT = 'ADD NEW COURSE';
  const navigate = useNavigate();
  const userRole = useAppSelector((state) => state.user.user.role);

  const [nonAdminClick, setNonAdminClick] = useState(false);

  const userMessage =
    'You are not permitted to add courses! Contact admin for help!';

  const handleUserClick = () => {
    if (userRole == 'admin') {
      navigate('/courses/add');
    } else {
      setNonAdminClick(true);
    }
  };

  return (
    <>
      <Header />
      <div className='flex flex-col items-center m-60'>
        <h1 className='text-2xl font-bold mb-4'>Your List Is Empty</h1>
        <p className='mb-4'>
          Please use "Add New Course" button to add your first course
        </p>
        <>
          <Button buttonText={BUTTON_TEXT} onClick={handleUserClick} />
          <p className='text-red-600'>{nonAdminClick && userMessage}</p>
        </>
      </div>
    </>
  );
}
