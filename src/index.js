import "./css/style.css";
import "./css/responsive.css";

import {
  task,
  showAddTaskForm,
  addTask,
  showTask,
  tasksList,
} from "./components/tasks.js";
import {
  hideSidebarOnSmallScreens,
  handleNavEvents,
} from "./components/responsive.js";

const task1 = new task(
  "Make todo list",
  "it is project from TOD",
  "11/08/2025",
  "High"
);

showAddTaskForm();
addTask();
hideSidebarOnSmallScreens();
document
  .querySelector(".hamburger")
  .addEventListener("click", handleNavEvents().openNav);
document
  .querySelector(".navCloseBtn")
  .addEventListener("click", handleNavEvents().closeNav);

document.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("myData")) || [];
  for (let task of savedData) {
    showTask(task.title, task.date, task.priority, task.description);
  }
});

function showCompletedTasks (arr) {
    const completedTasksContainer = document.querySelector(".completed-tasks")
}