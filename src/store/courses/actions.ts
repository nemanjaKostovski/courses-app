import { CoursesActionTypes } from './types.js';

type CourseType = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
};

type AddNewCourseAction = {
  type: CoursesActionTypes.ADD_COURSE;
  payload: CourseValues;
};

export const addNewCourseAction = (
  courseData: CourseType
): AddNewCourseAction => ({
  type: CoursesActionTypes.ADD_COURSE,
  payload: courseData,
});
