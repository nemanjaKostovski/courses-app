import CourseCard from './components/CourseCard/CourseCard';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import EmptyCourseList from '../EmptyCourseList.tsx/EmptyCourseList';
import getCourseDuration from '../../helpers/getCourseDuration';
import CourseInfo from '../CourseInfo/CourseInfo';
import { useState } from 'react';

interface Author {
  id: string;
  name: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  function goToCourseInfo(course: Course) {
    setSelectedCourse(course);
  }

  if (!mockedAuthorsList.length) {
    return <EmptyCourseList />;
  }

  return (
    <div className='flex flex-col ml-40'>
      {mockedCoursesList.map((course) => {
        const authors = course.authors.map((authorId) => {
          const author: Author | undefined = mockedAuthorsList.find(
            (a) => a.id === authorId
          );
          return author && author.name;
        });

        return (
          <div key={course.id}>
            {selectedCourse && selectedCourse.id === course.id ? (
              <CourseInfo
                id={course.id}
                author={authors.join(', ')}
                title={course.title}
                text={course.description}
                duration={getCourseDuration(course.duration)}
                date={course.creationDate.split('/').join('.')}
                onClick={() => setSelectedCourse(null)}
              />
            ) : (
              <CourseCard
                author={authors.join(', ')}
                title={course.title}
                text={course.description}
                duration={getCourseDuration(course.duration)}
                date={course.creationDate.split('/').join('.')}
                onClick={() => goToCourseInfo(course)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
