import { useState } from 'react';
import Input from '../../../../common/Input/Input';
import Header from '../../../Header/Header';
import Button from '../../../../common/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorMessage from '../../../../common/Error/ErrorMessage';

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const BUTTON_TEXT = 'LOGIN';
  const BUTTON_TYPE = 'submit';

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  });

  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: { target: { value: string; name: string } }) => {
    const { value, name } = e.target;
    setLogin((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const validateForm = (): boolean => {
    const errors = {
      email: '',
      password: '',
    };

    if (!login.email) {
      errors.email = 'Email is required.';
    }
    if (!login.password) {
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

    const newLogin: LoginFormData = {
      email: login.email,
      password: login.password,
    };

    try {
      const response = await axios.post(
        'http://localhost:4000/login',
        newLogin
      );

      if (response.status === 201) {
        setHasError(false);
        localStorage.setItem('token', response.data.result);
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
        className='w-full h-screen flex flex-col items-center bg-gray-50'
        onSubmit={handleSubmit}
      >
        <h2 className='mt-40 font-bold text-2xl'>Login</h2>
        <div className='flex flex-col items-center max-w-xl lg:w-[576px] p-6 border-2 bg-white'>
          <Input
            type='email'
            placeholder='input text'
            name='email'
            value={login.email}
            onChange={handleChange}
          />
          <ErrorMessage text={validationErrors.email} />

          <Input
            type='password'
            placeholder='input text'
            name='password'
            value={login.password}
            onChange={handleChange}
          />
          <ErrorMessage text={validationErrors.password} />

          <div className='mb-4'></div>
          <Button buttonText={BUTTON_TEXT} maxWidth='w-80' type={BUTTON_TYPE} />
          {hasError && <ErrorMessage text='Sorry, login failed!' />}
          <p className='mt-6'>
            If you don't have an account you may{' '}
            <Link className='font-bold' to={'/registration'}>
              Register
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
