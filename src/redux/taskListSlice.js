
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("task")) || [],
  filter: {
    status: "",     
    eventDate: "",
  },
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = { ...action.payload, id: uuidv4() };
      state.tasks.push(newTask);
      localStorage.setItem("task", JSON.stringify(state.tasks));
    },
    editTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
        localStorage.setItem("task", JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
      localStorage.setItem("task", JSON.stringify(state.tasks));
    },
    setStatusFilter: (state, action) => {
      state.filter.status = action.payload; 
    },
    setEventDateFilter: (state, action) => {
      state.filter.eventDate = action.payload; 
    },
    resetFilters: (state) => {
      state.filter = { status: "", eventDate: "" };  
    },
  },
});

export const { addTask, editTask, deleteTask, setStatusFilter, setEventDateFilter, resetFilters } = taskSlice.actions;

export default taskSlice.reducer;
