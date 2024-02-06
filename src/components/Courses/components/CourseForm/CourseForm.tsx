import Header from '../../../Header/Header';
import Input from '../../../../common/Input/Input';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../../../../common/Error/ErrorMessage';
import Button from '../../../../common/Button/Button';
import getCourseDuration from '../../../../helpers/getCourseDuration';
import AuthorItem from './components/AuthorItem/AuthorItem';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  saveNewAuthor,
  fetchAuthors,
  saveNewCourse,
  updateCourse,
} from '../../../../services';

type NewCourse = {
  title: string;
  description: string;
  duration: number;
  authors: string[];
};

type CourseType = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
};

export default function CourseForm() {
  // Variables for updating the existing course
  const { courseId } = useParams();
  const isUpdateMode = Boolean(courseId);
  const courseList = useAppSelector((state) => state.courses.courses);
  const courseForUpdate = courseList.find((course) => course.id == courseId)!;

  // create course button
  const CREATE_COURSE_BUTTON_TEXT = isUpdateMode
    ? 'UPDATE COURSE'
    : 'CREATE COURSE';
  const CREATE_COURSE_BUTTON_TYPE = 'submit';
  // cancel button
  const CANCEL_BUTTON_TEXT = 'CANCEL';
  const CANCEL_BUTTON_TYPE = 'button';
  // add author button
  const CREATE_AUTHOR_BUTTON_TEXT = 'CREATE AUTHOR';
  const CREATE_AUTHOR_BUTTON_TYPE = 'button';

  const dispatch = useAppDispatch();
  const authorsList = useAppSelector((state) => state.authors.authors);

  const [createNewCourse, setCreateNewCourse] = useState({
    title: '',
    description: '',
    duration: 0,
  });

  useEffect(() => {
    setCreateNewCourse({
      title: courseForUpdate.title,
      description: courseForUpdate.description,
      duration: courseForUpdate.duration,
    });
    // I don't see why should I have title, description and duration inside of the dependencies?
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateMode]);

  const [validationErrors, setValidationErrors] = useState({
    title: '',
    description: '',
    duration: '',
  });

  const [author, setAuthor] = useState<string>('');

  const [authorsForCourse, setAuthorsForCourse] = useState<
    { id: string; name: string }[]
  >([]);

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  const handleAddAuthor = async () => {
    if (author.length >= 2) {
      await dispatch(saveNewAuthor(author));
      setAuthor('');
    }
  };

  const handleAddCourseAuthor = (authorId: string) => {
    const selectedAuthor = authorsList.find((author) => author.id === authorId);

    if (selectedAuthor) {
      setAuthorsForCourse((prevAuthorsForCourse) => {
        const uniqueAuthors = new Set([
          ...prevAuthorsForCourse,
          selectedAuthor,
        ]);
        return Array.from(uniqueAuthors);
      });
    }
  };

  const handleDeleteCourseAuthor = (authorId: string) => {
    setAuthorsForCourse((prevAuthorsForCourse) =>
      prevAuthorsForCourse.filter((author) => author.id !== authorId)
    );
  };

  useEffect(() => {
    dispatch(fetchAuthors());
    courseForUpdate.authors.map((author) => handleAddCourseAuthor(author));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    const newCourse: NewCourse = {
      title: createNewCourse.title,
      description: createNewCourse.description,
      duration: Number(createNewCourse.duration),
      authors: authorsForCourse.map((author) => author.id),
    };

    if (isUpdateMode && courseForUpdate != undefined) {
      const updatedCourse: CourseType = {
        id: courseForUpdate.id!,
        creationDate: courseForUpdate.creationDate!,
        title: createNewCourse.title,
        description: createNewCourse.description,
        duration: Number(createNewCourse.duration),
        authors: authorsForCourse.map((author) => author.id),
      };
      try {
        await dispatch(updateCourse(updatedCourse));
        navigate('/courses');
      } catch (error) {
        console.error('Error updating course:', error);
      }
    } else {
      try {
        await dispatch(saveNewCourse(newCourse));
        navigate('/courses');
      } catch (error) {
        console.error('Error saving new course:', error);
      }
    }
  };

  return (
    <>
      <Header />

      <form
        data-testid='course-form'
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
            onClick={() => {
              navigate('/courses');
            }}
          />
          <Button
            buttonText={CREATE_COURSE_BUTTON_TEXT}
            maxWidth='w-40'
            type={CREATE_COURSE_BUTTON_TYPE}
          />
        </div>
      </form>
    </>
  );
}
