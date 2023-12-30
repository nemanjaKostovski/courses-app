import CourseCard from './components/CourseCard/CourseCard';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import EmptyCourseList from '../EmptyCourseList.tsx/EmptyCourseList';
import getCourseDuration from '../../helpers/getCourseDuration';
import Header from '../Header/Header';
import { Navigate, useNavigate } from 'react-router-dom';

interface Author {
  id: string;
  name: string;
}

export default function Courses() {
  const user_token = localStorage.getItem('user_token');
  const navigate = useNavigate();

  if (!user_token) {
    return <Navigate to='/login' />;
  }

  if (!mockedAuthorsList.length) {
    return <EmptyCourseList />;
  }

  const handleShowCourse = (courseId: string) => {
    const course = mockedCoursesList.find((c) => c.id === courseId);

    if (course) {
      navigate(`/courses/${courseId}`, { state: course });
    }
  };

  return (
    <>
      <Header />
      <div className='flex flex-col pl-40 bg-gray-50'>
        {mockedCoursesList.map((course) => {
          const authors = course.authors.map((authorId) => {
            const author: Author | undefined = mockedAuthorsList.find(
              (a) => a.id === authorId
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
                date={course.creationDate.split('/').join('.')}
                onClick={() => handleShowCourse(course.id)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
