import { WorkOutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutContext = ()=>{
    const context = useContext(WorkOutContext);

    if(!context){
        throw Error('useWorkoutCOntext hook should be used inside the WorkoutContextProvider')
    }
    return context;
}
