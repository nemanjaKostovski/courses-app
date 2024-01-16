import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

type CourseType = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
};

type NewCourse = {
  title: string;
  description: string;
  duration: number;
  authors: string[];
};

type Credentials = {
  email: string;
  password: string;
};

type Registration = {
  name: string;
  email: string;
  password: string;
};

// Login and Registration API functions

export const loginUser = async (credentials: Credentials) => {
  return await axios.post('http://localhost:4000/login', credentials);
};

export const registerUser = async (userData: Registration) => {
  return await axios.post('http://localhost:4000/register', userData);
};

// User API functions

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const user_token = localStorage.getItem('user_token');
  const headers = { Authorization: user_token };

  if (user_token) {
    return await axios
      .get('http://localhost:4000/users/me', { headers })
      .then((response) => response.data.result);
  }
});

export const removeUser = createAsyncThunk('user/removeUser', async () => {
  try {
    const user_token = localStorage.getItem('user_token');
    if (!user_token) {
      throw new Error('User token not found');
    }
    const headers = { Authorization: user_token };
    return await axios
      .delete('http://localhost:4000/logout', {
        headers: headers,
      })
      .then((response) => response.data.result);
  } catch (error) {
    console.log(error);
  }
});

// Author API functions

export const fetchAuthors = createAsyncThunk(
  'author/fetchAuthors',
  async () => {
    const response = await axios.get('http://localhost:4000/authors/all');
    return response.data.result;
  }
);

export const saveNewAuthor = createAsyncThunk(
  'courses/saveNewAuthor',
  async (name: string) => {
    const user_token = localStorage.getItem('user_token');
    const headers = { Authorization: user_token };
    return await axios
      .post('http://localhost:4000/authors/add', { name }, { headers })
      .then((response) => response.data.result);
  }
);

// Courses API functions

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    return await axios
      .get('http://localhost:4000/courses/all')
      .then((response) => response.data.result);
  }
);

export const saveNewCourse = createAsyncThunk(
  'courses/saveNewCourse',
  async (newCourse: NewCourse) => {
    const user_token = localStorage.getItem('user_token');
    const headers = { Authorization: user_token };
    return await axios
      .post('http://localhost:4000/courses/add', newCourse, { headers })
      .then((response) => response.data.result);
  }
);

export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (courseId: string) => {
    const user_token = localStorage.getItem('user_token');
    const headers = { Authorization: user_token };
    return await axios
      .delete(`http://localhost:4000/courses/${courseId}`, {
        headers,
      })
      .then(() => courseId);
  }
);

export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async (updatedCourse: CourseType) => {
    const user_token = localStorage.getItem('user_token');
    const headers = { Authorization: user_token };
    return await axios
      .put(`http://localhost:4000/courses/${updatedCourse.id}`, updatedCourse, {
        headers,
      })
      .then(() => updatedCourse);
  }
);
