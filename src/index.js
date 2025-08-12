import "./css/style.css"
import "./css/responsive.css"

import {task, showAddTaskForm, addTask} from "./components/tasks.js"
import { hideSidebarOnSmallScreens, handleNavEvents } from "./components/responsive.js"

const task1 = new task("Make todo list", "it is project from TOD", "11/08/2025", "High")

showAddTaskForm()
addTask()
hideSidebarOnSmallScreens()
document.querySelector('.hamburger').addEventListener('click', handleNavEvents().openNav);
document.querySelector('.navCloseBtn').addEventListener('click', handleNavEvents().closeNav);

