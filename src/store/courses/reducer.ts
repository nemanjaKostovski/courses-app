import { CoursesActionTypes } from './types.js';

type CourseType = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
};

interface SaveCourses {
  type: CoursesActionTypes.SAVE_COURSES;
  payload: CourseType[];
}

interface AddCourse {
  type: CoursesActionTypes.ADD_COURSE;
  payload: CourseType;
}

interface DeleteCourse {
  type: CoursesActionTypes.DELETE_COURSE;
  payload: string;
}

type CoursesAction = SaveCourses | AddCourse | DeleteCourse;

const initCoursesState = [] as CourseType[];

export function coursesReducer(
  state = initCoursesState,
  action: CoursesAction
) {
  switch (action.type) {
    case CoursesActionTypes.SAVE_COURSES:
      return action.payload;
    case CoursesActionTypes.ADD_COURSE:
      return [...state, action.payload];

    default:
      return state;
  }
}
