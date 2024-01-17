import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Header from '../Header/Header';

export default function EmptyCourseList() {
  const BUTTON_TEXT = 'ADD NEW COURSE';

  return (
    <>
      <Header />
      <div className='flex flex-col items-center m-60'>
        <h1 className='text-2xl font-bold mb-4'>Your List Is Empty</h1>
        <p className='mb-4'>
          Please use "Add New Course" button to add your first course
        </p>
        <Link to='/courses/add'>
          <Button buttonText={BUTTON_TEXT} />
        </Link>
      </div>
    </>
  );
}
