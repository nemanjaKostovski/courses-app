import Header from '../../../Header/Header';
import Input from '../../../../common/Input/Input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorMessage from '../../../../common/Error/ErrorMessage';
import Button from '../../../../common/Button/Button';
import getCourseDuration from '../../../../helpers/getCourseDuration';

type CreateCourse = {
  title: string;
  description: string;
  duration: string;
  authors: string[];
};

export default function CreateCourse() {
  const CREATE_COURSE_BUTTON_TEXT = 'CREATE COURSE';
  const CREATE_COURSE_BUTTON_TYPE = 'submit';
  // const CREATE_AUTHOR_BUTTON_TEXT = 'CREATE AUTHOR';

  const [createNewCourse, setCreateNewCourse] = useState({
    title: '',
    description: '',
    duration: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    title: '',
    description: '',
    duration: '',
  });

  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: { target: { value: string; name: string } }) => {
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
      title: createNewCourse.title,
      description: createNewCourse.description,
      duration: createNewCourse.duration,
    };

    try {
      const response = await axios.post(
        'http://localhost:4000/courses/add',
        newCourse
      );

      if (response.status === 201) {
        setHasError(false);
        navigate('/courses');
      } else {
        console.error('Login failed:', response.data);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setHasError(true);
    }
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
            value={createNewCourse.description}
            className='w-5/6 h-60 border-2'
          ></textarea>
          <ErrorMessage text={validationErrors.description} noMargin={true} />
          <Input
            type='text'
            placeholder='input text'
            name='duration'
            value={createNewCourse.duration}
            onChange={handleChange}
            inputWidth='w-2/5'
            inline='inline-block'
          />
          <span className='inline ml-2'>
            {getCourseDuration(Number(createNewCourse.duration))}
          </span>
          <ErrorMessage text={validationErrors.duration} noMargin={true} />
        </div>
        <Button
          buttonText={CREATE_COURSE_BUTTON_TEXT}
          maxWidth='w-80'
          type={CREATE_COURSE_BUTTON_TYPE}
        />
        {hasError && <ErrorMessage text='Sorry, course creation failed!' />}
      </form>
    </>
  );
}
