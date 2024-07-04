import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const {user} = useAuthContext();
  useEffect(() => {
    const fetchWorkOut = async () => {
      try {
        const response = await fetch("/api/workout",{
          headers:{
            'Authorization':`Bearer ${user.token}`
          }
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        dispatch({ type: "SET_WORKOUTS", payload: data });
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    if(user){
    fetchWorkOut();
  }
  }, [dispatch,user]);

  return (
    <>
      <div className="home">
        <div className="workouts">
          {workouts &&
            workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))}
        </div>
        <WorkoutForm />
      </div>
    </>
  );
};

export default Home;
