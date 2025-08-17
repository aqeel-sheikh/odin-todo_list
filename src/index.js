import "./css/style.css";
import "./css/responsive.css";

import { showAddTaskForm, addTask, showTask } from "./components/tasks.js";

import {
  hideSidebarOnSmallScreens,
  handleNavEvents,
} from "./components/responsive.js";

import {
  addNewCategory,
  showAddCategoryForm,
  showCategory,
  showTasksInCategory,
} from "./components/categories.js";

import { showAllTasks, showCompletedTasks } from "./components/routes.js";

showAddTaskForm();
addTask();
hideSidebarOnSmallScreens();
showAddCategoryForm();
addNewCategory();
showAllTasks();
showCompletedTasks();

document
  .querySelector(".hamburger")
  .addEventListener("click", handleNavEvents().openNav);
document
  .querySelector(".navCloseBtn")
  .addEventListener("click", handleNavEvents().closeNav);

document.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("myData")) || [];
  const savedData2 = JSON.parse(localStorage.getItem("myCategories")) || [];
  for (let task of savedData) {
    showTask(task);
  }
  for (let category of savedData2) {
    showCategory(category);
  }
  showTasksInCategory();
});
