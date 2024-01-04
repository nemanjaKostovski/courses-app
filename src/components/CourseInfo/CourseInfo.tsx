import { Link, useParams } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { ReactNode, useEffect, useState } from 'react';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import getCourseDuration from '../../helpers/getCourseDuration';
import Header from '../Header/Header';

interface Author {
  id: string;
  name: string;
}

type Course = {
  description: ReactNode;
  creationDate: ReactNode;
  id: string;
  title: string;
  authors: string[];
  duration: number;
};

const BUTTON_TEXT = 'BACK';

export default function CourseInfo() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const selectedCourse = mockedCoursesList.find((c) => c.id === courseId);

    if (selectedCourse) {
      setCourse(selectedCourse);
    }
  }, [courseId]);

  return (
    course && (
      <>
        <Header />
        <div className='bg-gray-50 h-screen p-10 pl-20'>
          <h2 className='font-bold p-1 text-2xl text-left'>{course.title}</h2>
          <section className='flex flex-col p-10 border-2 rounded w-5/6 mb-4 m-2 bg-white'>
            <h2 className='font-bold p-1'>Description:</h2>
            <article className='flex p-1 ml-1'>
              <p className='w-1/2'>{course.description}</p>
              <div className='flex flex-col border-l-2 pl-4'>
                <p className='mb-2'>
                  <span className='font-bold mr-16'>ID: </span>
                  {course.id}
                </p>

                <p className='mb-2'>
                  <span className='font-bold mr-4'>Duration: </span>
                  {getCourseDuration(course.duration)}
                </p>
                <p className='mb-2'>
                  <span className='font-bold mr-6'>Created: </span>
                  {course.creationDate}
                </p>
                <p className='truncate mb-2'>
                  <span className='font-bold mr-5'>Authors: </span>
                  {course.authors
                    .map((authorId) => {
                      const author: Author | undefined = mockedAuthorsList.find(
                        (a) => a.id === authorId
                      );
                      return author && author.name;
                    })
                    .join(', ')}
                </p>
              </div>
            </article>
          </section>
          <div className='w-5/6 flex justify-end'>
            <Link to='/courses'>
              <Button buttonText={BUTTON_TEXT} />
            </Link>
          </div>
        </div>
      </>
    )
  );
}
