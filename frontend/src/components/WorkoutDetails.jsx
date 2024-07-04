/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const {user} = useAuthContext();
  async function handleDelete(e) {
    e.preventDefault();
    if(!user){
      return;
    }
    try {
      const response = await fetch("/api/workout/" + workout._id, {
        method: "DELETE",
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "DELETE_WORKOUT", payload: data });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleEdit(e) {
    if(!user){
      return;
    }
    e.preventDefault();
    dispatch({ type: "SET_EDIT_WORKOUT", payload: workout });
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <div className="utility">
        <span className="material-symbols-outlined left" onClick={handleDelete}>
          Delete
        </span>
        <span className="material-symbols-outlined right" onClick={handleEdit}>Edit</span>
      </div>
    </div>
  );
};
export default WorkoutDetails;
