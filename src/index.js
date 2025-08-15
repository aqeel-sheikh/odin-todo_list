import "./css/style.css";
import "./css/responsive.css";

import {
  showAddTaskForm,
  addTask,
  showTask,
} from "./components/tasks.js";
import {
  hideSidebarOnSmallScreens,
  handleNavEvents,
} from "./components/responsive.js";


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
    showTask(task);
  }
});
