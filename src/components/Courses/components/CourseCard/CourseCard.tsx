import Button from '../../../../common/Button/Button';
import { useAppSelector } from '../../../../hooks';

type CourseCard = {
  title: string;
  text: string;
  author: string;
  duration: string;
  date: string;
  onClick: () => void;
  onRemoveClick: () => void;
  onEditClick: () => void;
};

const BUTTON_TEXT = 'SHOW COURSE';

export default function CourseCard({
  title,
  text,
  author,
  duration,
  date,
  onClick,
  onRemoveClick,
  onEditClick,
}: CourseCard) {
  const userRole = useAppSelector((state) => state.user.user.role);
  return (
    <section
      data-testid='course-card'
      className='flex flex-col p-2 border-2 border-l-8 border-l-black rounded w-5/6 mb-4 m-2 bg-white'
    >
      <h2
        id='course-title'
        data-testid='course-title'
        className='font-bold p-1'
      >
        {title}
      </h2>
      <article className='flex p-1 ml-1'>
        <p className='w-[60%]'>{text}</p>
        <div className='flex flex-col w-[40%]'>
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
          <div className='w-full'>
            <Button buttonText={BUTTON_TEXT} onClick={onClick} />
            {userRole == 'admin' && (
              <>
                <Button buttonText='🗑️' onClick={onRemoveClick} />
                <Button buttonText='✏️' onClick={onEditClick} />
              </>
            )}
          </div>
        </div>
      </article>
    </section>
  );
}
