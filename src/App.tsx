import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';
// import CourseInfo from './components/CourseInfo/CourseInfo';
// import { mockedAuthorsList, mockedCoursesList } from './constants';
// import getCourseDuration from './helpers/getCourseDuration';

function App() {
  return (
    <>
      <Header />
      <main className='bg-gray-50 h-screen p-2'>
        <Courses />
        {/* <CourseInfo /> */}
      </main>
    </>
  );
}

export default App;
