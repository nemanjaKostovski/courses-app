import Button from '../../../../common/Button/Button';

type CourseCard = {
  title: string;
  text: string;
  author: string;
  duration: string;
  date: string;
};

const BUTTON_TEXT = 'SHOW COURSE';

function goToCourseInfo() {}

export default function CourseCard({
  title,
  text,
  author,
  duration,
  date,
}: CourseCard) {
  return (
    <section className='flex flex-col p-2 border-2 border-l-8 border-l-black rounded w-5/6 mb-4 m-2 bg-white'>
      <h2 className='font-bold p-1'>{title}</h2>
      <article className='flex p-1 ml-1'>
        <p className='w-2/3'>{text}</p>
        <div className='flex flex-col w-1/3'>
          <p className='truncate'>
            <span className='font-bold'>Authors: </span>
            {author}
          </p>
          <p>
            <span className='font-bold'>Duration: </span>
            {duration}
          </p>
          <p>
            <span className='font-bold'>Created: </span>
            {date}
          </p>
          <br />
          <div className='w-60'>
            <Button buttonText={BUTTON_TEXT} onClick={goToCourseInfo} />
          </div>
        </div>
      </article>
    </section>
  );
}
