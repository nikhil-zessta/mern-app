import { useRef, useState, useEffect } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutForm = () => {
  const { dispatch, editWorkout } = useWorkoutContext();
  const {user} = useAuthContext();
  const titleRef = useRef('');
  const loadRef = useRef('');
  const repsRef = useRef('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [workoutId, setWorkoutId] = useState(null);
  
  

  useEffect(() => {
    if (editWorkout) {
      titleRef.current.value = editWorkout.title;
      loadRef.current.value = editWorkout.load;
      repsRef.current.value = editWorkout.reps;
      setIsEditMode(true);
      setWorkoutId(editWorkout._id);
    } else {
      setIsEditMode(false);
      setWorkoutId(null);
    }
  }, [editWorkout]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user){
      setError('You must be logged in')
      return;
    }
    const workout = {
      title: titleRef.current.value,
      load: loadRef.current.value,
      reps: repsRef.current.value
    };

    try {
      const response = await fetch(`/api/workout/${isEditMode ? workoutId : ''}`, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${user.token}`

        },
        body: JSON.stringify(workout)
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      } else {
        setError(null);
        titleRef.current.value = '';
        loadRef.current.value = '';
        repsRef.current.value = '';
        setEmptyFields([]);
        console.log(`${isEditMode ? 'Updated' : 'New'} workout:`, json);

        if (isEditMode) {
          dispatch({ type: 'UPDATE_WORKOUT', payload: json });
        } else {
          dispatch({ type: 'CREATE_WORKOUT', payload: json });
        }

        // Clear edit mode
        dispatch({ type: 'CLEAR_EDIT_WORKOUT' });
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while submitting the form');
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>{isEditMode ? 'Edit Workout' : 'Add a New Workout'}</h3>
      <label>Exercise Title:</label>
      <input type="text" ref={titleRef} className={emptyFields.includes('title') ? 'error' : ''} />
      <label>Load (in kg):</label>
      <input type="number" ref={loadRef} className={emptyFields.includes('load') ? 'error' : ''} />
      <label>Number of Reps:</label>
      <input type="number" ref={repsRef} className={emptyFields.includes('reps') ? 'error' : ''} />
      <button type="submit">{isEditMode ? 'Update Workout' : 'Add Workout'}</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
