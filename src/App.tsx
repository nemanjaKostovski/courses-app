import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';

function App() {
  return (
    <>
      <Header />
      <main className='bg-gray-50 h-screen p-2'>
        <Courses />
      </main>
    </>
  );
}

export default App;
