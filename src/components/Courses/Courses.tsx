import CourseCard from './components/CourseCard/CourseCard';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import EmptyCourseList from '../EmptyCourseList.tsx/EmptyCourseList';
import getCourseDuration from '../../helpers/getCourseDuration';
import SearchBar from './components/SearchBar/SearchBar';
// import CourseInfo from '../CourseInfo/CourseInfo';

export default function Courses() {
  if (!mockedAuthorsList.length) {
    return <EmptyCourseList />;
  }

  return (
    <div className='flex flex-col ml-40'>
      <SearchBar />
      {mockedCoursesList.map((course) => {
        const authors = course.authors.map((authorId) => {
          const author = mockedAuthorsList.find((a) => a.id === authorId);
          return author && author.name;
        });

        return (
          <CourseCard
            key={course.id}
            author={authors.join(', ')}
            title={course.title}
            text={course.description}
            duration={getCourseDuration(course.duration)}
            date={course.creationDate.split('/').join('.')}
          />
        );
      })}
    </div>
  );
}
