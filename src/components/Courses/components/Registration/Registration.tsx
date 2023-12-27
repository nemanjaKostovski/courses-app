import { useState } from 'react';
import Input from '../../../../common/Input.tsx/Input';
import Header from '../../../Header/Header';
import Button from '../../../../common/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

type RegistrationFormData = {
  name: string;
  email: string;
  password: string;
};

export default function Registration() {
  const BUTTON_TEXT = 'REGISTER';
  const BUTTON_TYPE = 'submit';

  const [registration, setRegistration] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: { target: { value: string; name: string } }) => {
    const { value, name } = e.target;
    setRegistration((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const validateForm = (): boolean => {
    const errors = {
      name: '',
      email: '',
      password: '',
    };

    if (!registration.name) {
      errors.name = 'Name is required.';
    }
    if (!registration.email) {
      errors.email = 'Email is required.';
    }
    if (!registration.password) {
      errors.password = 'Password is required.';
    }

    setValidationErrors(errors);

    return Object.values(errors).every((error) => !error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newUser: RegistrationFormData = {
      name: registration.name,
      email: registration.email,
      password: registration.password,
    };

    try {
      const response = await axios.post(
        'http://localhost:4000/register',
        newUser
      );

      if (response.status === 201) {
        navigate('/login');
      } else {
        console.error('Registration failed:', response.data);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <>
      <Header />
      <form
        className='w-full h-screen flex flex-col items-center bg-gray-50'
        onSubmit={handleSubmit}
      >
        <h2 className='mt-40 font-bold text-2xl'>Registration</h2>
        <div className='flex flex-col items-center max-w-xl lg:w-[576px] p-6 border-2 bg-white'>
          <Input
            type='text'
            placeholder='input text'
            name='name'
            value={registration.name}
            onChange={handleChange}
            autoFocus
          />
          <p className='text-red-500 text-left w-full lg:ml-52'>
            {validationErrors.name}
          </p>

          <Input
            type='email'
            placeholder='input text'
            name='email'
            value={registration.email}
            onChange={handleChange}
          />
          <p className='text-red-500 text-left w-full lg:ml-52'>
            {validationErrors.email}
          </p>

          <Input
            type='password'
            placeholder='input text'
            name='password'
            value={registration.password}
            onChange={handleChange}
          />
          <p className='text-red-500 text-left w-full lg:ml-52'>
            {validationErrors.password}
          </p>

          <div className='mb-4'></div>
          <Button buttonText={BUTTON_TEXT} maxWidth='w-80' type={BUTTON_TYPE} />
          <p className='mt-6'>
            If you have an account you may{' '}
            <Link className='font-bold' to={'/login'}>
              Login
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
