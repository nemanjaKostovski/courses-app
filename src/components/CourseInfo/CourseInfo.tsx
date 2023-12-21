import Button from '../../common/Button/Button';

type CourseInfo = {
  title?: string;
  text?: string;
  author?: string;
  duration?: string;
  date?: string;
  id?: string;
};

const BUTTON_TEXT = 'BACK';

export default function CourseInfo({
  title,
  text,
  author,
  duration,
  date,
  id,
}: CourseInfo) {
  return (
    <>
      <h2 className='font-bold p-1 text-2xl text-left'>{title} JavaScript</h2>
      <section className='flex flex-col p-10 border-2 rounded w-5/6 mb-4 m-2 bg-white'>
        <h2 className='font-bold p-1'>Description:</h2>
        <article className='flex p-1 ml-1'>
          <p className='w-1/2'>{text}</p>
          <div className='flex flex-col border-l-2 pl-4'>
            <p className='mb-2'>
              <span className='font-bold mr-16'>ID: </span>
              {id}
            </p>

            <p className='mb-2'>
              <span className='font-bold mr-4'>Duration: </span>
              {duration}
            </p>
            <p className='mb-2'>
              <span className='font-bold mr-6'>Created: </span>
              {date}
            </p>
            <p className='truncate mb-2'>
              <span className='font-bold mr-5'>Authors: </span>
              {author}
            </p>
          </div>
        </article>
      </section>
      <div className='w-5/6 flex justify-end'>
        <Button buttonText={BUTTON_TEXT} />
      </div>
    </>
  );
}
