import Button from '../../common/Button/Button';

export default function EmptyCourseList() {
  const BUTTON_TEXT = 'ADD NEW COURSE';

  return (
    <div className='flex flex-col items-center m-60'>
      <h1 className='text-2xl font-bold mb-4'>Your List Is Empty</h1>
      <p className='mb-4'>
        Please use "Add New Course" button to add your first course
      </p>
      <Button buttonText={BUTTON_TEXT} />
    </div>
  );
}
