import CourseCard from './components/CourseCard/CourseCard';
import EmptyCourseList from '../EmptyCourseList.tsx/EmptyCourseList';
import getCourseDuration from '../../helpers/getCourseDuration';
import Header from '../Header/Header';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchCourses, fetchAuthors, deleteCourse } from '../../services';

interface Author {
  id: string;
  name: string;
}

// type CourseType = {
//   id: string;
//   title: string;
//   description: string;
//   creationDate: string;
//   duration: number;
//   authors: string[];
// };

export default function Courses() {
  const BUTTON_TEXT = 'ADD NEW COURSE';
  const user_token = localStorage.getItem('user_token');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const coursesList = useAppSelector((state) => state.courses.courses);
  const authorsList = useAppSelector((state) => state.authors.authors);
  const isLoading = useAppSelector((state) => state.courses.loading);

  useEffect(() => {
    async function fetchDataFromStore() {
      try {
        await dispatch(fetchCourses());
        await dispatch(fetchAuthors());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchDataFromStore();
  }, [dispatch]);

  if (!user_token) {
    return <Navigate to='/login' />;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!coursesList || coursesList.length === 0) {
    return <EmptyCourseList />;
  }

  const handleShowCourse = (courseId: string) => {
    const course = coursesList.find((c) => c.id === courseId);

    if (course) {
      navigate(`/courses/${courseId}`, { state: course });
    }
  };

  const handleRemoveCourse = (courseId: string) => {
    const course = coursesList.find((c) => c.id === courseId);

    if (course) {
      dispatch(deleteCourse(courseId));
    }
  };

  // const handleEditCourse = (courseId: string) => {
  //   // const course = coursesList.find((c: { id: string }) => c.id === courseId);
  // };

  return (
    <>
      <Header />
      <div className='flex flex-col pl-40 bg-gray-50'>
        {coursesList.map((course) => {
          const authors = course.authors.map((authorId) => {
            const author: Author | undefined = authorsList?.find(
              (a: { id: string }) => a.id === authorId
            );
            return author && author.name;
          });

          return (
            <div key={course.id}>
              <CourseCard
                author={authors.join(', ')}
                title={course.title}
                text={course.description}
                duration={getCourseDuration(course.duration)}
                date={course.creationDate?.split('/').join('.') || ''}
                onClick={() => handleShowCourse(course.id as string)}
                onRemoveClick={() => handleRemoveCourse(course.id as string)}
              />
            </div>
          );
        })}
        <Link to='/courses/add'>
          <Button buttonText={BUTTON_TEXT} />
        </Link>
      </div>
    </>
  );
}
