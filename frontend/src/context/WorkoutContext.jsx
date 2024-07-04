/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

export const WorkOutContext = createContext();


export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };
    case "SET_EDIT_WORKOUT":
      return {
        ...state,
        editWorkout: action.payload,
      };
    case "CLEAR_EDIT_WORKOUT":
      return {
        ...state,
        editWorkout: null,
      };
    case "UPDATE_WORKOUT":
      return {
        workouts: state.workouts.map(workout =>
          workout._id === action.payload._id ? action.payload : workout
        ),
      };
    default:
      return state;
  }
};


export const WorkOutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: null,
    editWorkout: null,
  });

  return (
    <WorkOutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkOutContext.Provider>
  );
};
