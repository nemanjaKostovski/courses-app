import Header from '../../../Header/Header';
import Input from '../../../../common/Input/Input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import ErrorMessage from '../../../../common/Error/ErrorMessage';
import Button from '../../../../common/Button/Button';
import getCourseDuration from '../../../../helpers/getCourseDuration';
import AuthorItem from './components/AuthorItem/AuthorItem';
import { mockedAuthorsList, mockedCoursesList } from '../../../../constants';
import { v4 as uuidv4 } from 'uuid';
import formatCreationDate from '../../../../helpers/formatCreationDate';

type CreateCourse = {
  title: string;
  description: string;
  duration: number;
  authors: string[];
};

export default function CreateCourse() {
  // create course button
  const CREATE_COURSE_BUTTON_TEXT = 'CREATE COURSE';
  const CREATE_COURSE_BUTTON_TYPE = 'submit';
  // cancel button
  const CANCEL_BUTTON_TEXT = 'CANCEL';
  const CANCEL_BUTTON_TYPE = 'reset';
  // add author button
  const CREATE_AUTHOR_BUTTON_TEXT = 'CREATE AUTHOR';
  const CREATE_AUTHOR_BUTTON_TYPE = 'button';

  const [createNewCourse, setCreateNewCourse] = useState({
    title: '',
    description: '',
    duration: 0,
  });

  const [validationErrors, setValidationErrors] = useState({
    title: '',
    description: '',
    duration: '',
  });

  // const [hasError, setHasError] = useState(false);

  const [author, setAuthor] = useState<string>('');

  const [authorsList, setAuthorsList] = useState([...mockedAuthorsList]);

  const [authorsForCourse, setAuthorsForCourse] = useState<
    { id: string; name: string }[]
  >([]);

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  const handleAddAuthor = () => {
    if (author.length >= 2) {
      const newAuthor = {
        id: uuidv4(),
        name: author,
      };

      setAuthorsList((prevAuthorsList) => [...prevAuthorsList, newAuthor]);
      mockedAuthorsList.push(newAuthor);
      setAuthor('');
    }
  };

  const handleAddCourseAuthor = (authorId: string) => {
    const selectedAuthor = authorsList.find((author) => author.id === authorId);

    if (selectedAuthor && !authorsForCourse.some((a) => a.id === authorId)) {
      setAuthorsForCourse((prevAuthorsForCourse) => [
        ...prevAuthorsForCourse,
        selectedAuthor,
      ]);
    }
  };

  const handleDeleteCourseAuthor = (authorId: string) => {
    setAuthorsForCourse((prevAuthorsForCourse) =>
      prevAuthorsForCourse.filter((author) => author.id !== authorId)
    );
  };

  const navigate = useNavigate();

  const handleChange = (e: {
    target: { value: string | number; name: string };
  }) => {
    const { value, name } = e.target;
    setCreateNewCourse((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const validateForm = (): boolean => {
    const errors = {
      title: '',
      description: '',
      duration: '',
    };

    if (!createNewCourse.title) {
      errors.title = 'Title is required.';
    }
    if (!createNewCourse.description) {
      errors.description = 'Description is required.';
    }
    if (!createNewCourse.duration) {
      errors.duration = 'Duration is required.';
    }

    setValidationErrors(errors);

    return Object.values(errors).every((error) => !error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newCourse = {
      id: uuidv4(),
      title: createNewCourse.title,
      description: createNewCourse.description,
      creationDate: formatCreationDate(),
      duration: createNewCourse.duration,
      authors: authorsForCourse.map((author) => author.id),
    };

    mockedCoursesList.push(newCourse);

    navigate('/courses');

    // try {
    //   const response = await axios.post(
    //     'http://localhost:4000/courses/add',
    //     newCourse
    //   );

    //   if (response.status === 201) {
    //     setHasError(false);
    //     navigate('/courses');
    //   } else {
    //     console.error('Course creation failed:', response.data);
    //   }
    // } catch (error) {
    //   console.error('Error during course creation:', error);
    //   setHasError(true);
    // }
  };

  return (
    <>
      <Header />

      <form
        className='w-full h-screen flex flex-col pl-16 bg-gray-50'
        onSubmit={handleSubmit}
      >
        <h2 className='text-2xl m-3 font-bold'>Course Edit/Create Page</h2>
        <div className='w-5/6 bg-white border-2 p-6 pl-20'>
          <h3 className='text-xl mb-4 font-bold'>Main info</h3>
          <Input
            type='text'
            placeholder='input text'
            name='title'
            value={createNewCourse.title}
            inputWidth='w-5/6'
            onChange={handleChange}
          />
          <ErrorMessage text={validationErrors.title} noMargin={true} />
          <label htmlFor='description' className='block font-bold'>
            Description
          </label>
          <textarea
            name='description'
            placeholder='input-text'
            value={createNewCourse.description}
            className='w-5/6 border-2 p-2'
            onChange={handleChange}
            rows={4}
          ></textarea>
          <ErrorMessage text={validationErrors.description} noMargin={true} />
          <Input
            type='number'
            placeholder='input text'
            name='duration'
            value={createNewCourse.duration}
            onChange={handleChange}
            inputWidth='w-2/5'
            inputLayout='inline-block'
            labelLayout='block'
          />

          <span className='ml-2'>
            {getCourseDuration(createNewCourse.duration)}
          </span>

          <ErrorMessage text={validationErrors.duration} noMargin={true} />
          <div className='flex flex-row'>
            <div className='w-2/3'>
              <h3 className='text-xl mt-2 mb-4 font-bold'>Authors</h3>
              <Input
                type='text'
                placeholder='input text'
                name='author'
                value={author}
                onChange={handleAuthorChange}
                inputWidth='w-2/5'
                inputLayout='inline-block'
                labelLayout='block'
              />
              <Button
                buttonText={CREATE_AUTHOR_BUTTON_TEXT}
                maxWidth='w-40'
                type={CREATE_AUTHOR_BUTTON_TYPE}
                onClick={handleAddAuthor}
              />
              <h3 className='text-lg mt-2 mb-4 font-bold'>Authors list</h3>
              {authorsList.map((author) => (
                <AuthorItem
                  key={author.id}
                  author={author}
                  onClickAdd={handleAddCourseAuthor}
                  onClickDelete={() => handleDeleteCourseAuthor(author.id)}
                />
              ))}
            </div>
            <div className='flex w-1/3 flex-col'>
              <h3 className='text-xl mb-4 font-bold'>Course Authors</h3>
              {authorsForCourse.length === 0 ? (
                <p>Author list is empty</p>
              ) : (
                authorsForCourse.map((author) => (
                  <p key={author.id}>{author.name}</p>
                ))
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-row mt-2 justify-end w-5/6'>
          <Button
            buttonText={CANCEL_BUTTON_TEXT}
            maxWidth='w-40'
            type={CANCEL_BUTTON_TYPE}
          />
          <Button
            buttonText={CREATE_COURSE_BUTTON_TEXT}
            maxWidth='w-40'
            type={CREATE_COURSE_BUTTON_TYPE}
          />
        </div>
        {/* {hasError && (
          <ErrorMessage text='Sorry, course creation failed!' noMargin />
        )} */}
      </form>
    </>
  );
}
