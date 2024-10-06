import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskListSlice";

export const store = configureStore({
  reducer: {
    task: taskReducer,
  },
});


  
