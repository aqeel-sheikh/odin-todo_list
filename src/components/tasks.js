import { format} from "date-fns";
import { deleteTask, editTask } from "./taskManager";
import dotsImg from "../assets/icons/three-dots.svg";
import redCircle from "../assets/icons/red-circle.svg";
import greenCircle from "../assets/icons/green-circle.svg";
import blueCircle from "../assets/icons/blue-circle.svg";

export class task {
  constructor(title, dueDate= new Date(), priority, status, description) {
    const safeDueDate = dueDate ? new Date(dueDate) : new Date();
    (this.title = title),
      (this.dueDate = format(safeDueDate, "EEE, MMM d, yyyy")),
      (this.priority = priority),
      (this.status = status),
      (this.description = description),
      (this.id = crypto.randomUUID()),
      (this.dateCreated = format(new Date(), "EEE, MMM d, yyyy"));
  }
}

export const myDialog = document.getElementById("myDialog");

export const tasksList = JSON.parse(localStorage.getItem("myData")) || [];

export function addTask() {
  document.querySelector("#done").addEventListener("click", handleAddTask);
}

const form = document.querySelector("#taskForm");

export function handleAddTask() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  const titleELement = document.querySelector("#title");
  const title = titleELement.value;

  const date = document.querySelector("#date").value;

  const priority = document.querySelector(
    'input[name="priority"]:checked'
  ).value;

  const status = document.querySelector("input[name='status']:checked").value;

  const description = document.querySelector("#description").value;

  const t = new task(title, date, priority, status, description);

  showTask(t);

  tasksList.push(t);
  localStorage.setItem("myData", JSON.stringify(tasksList));

  myDialog.close();
  form.reset();
}

export function showAddTaskForm() {
  document.querySelector("#addTask").addEventListener("click", () => {
    myDialog.showModal();
  });
  document.querySelector("#closeDialog").addEventListener("click", () => {
    myDialog.close();
    form.reset();
  });

  myDialog.addEventListener("click", (e) => {
    const rect = myDialog.getBoundingClientRect();
    const insideDialog =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!insideDialog) {
      myDialog.close();
    }
  });
}

export function showTask(t) {
  const task = document.createElement("div");
  task.classList.add("task");

  const menuContainer = document.createElement("div");
  menuContainer.classList.add("menu-container");

  const dotsBtn = document.createElement("img");
  dotsBtn.src = dotsImg;
  dotsBtn.classList.add("dots");

  const menu = document.createElement("div");
  menu.classList.add("menu");

  const editBtn = document.createElement("a");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");
  editBtn.addEventListener("click", () => {
    editTask(t);
  });

  const dltBtn = document.createElement("a");
  dltBtn.addEventListener("click", () => deleteTask(task, t));
  dltBtn.textContent = "Delete";
  dltBtn.classList.add("dlt-btn");

  menu.append(editBtn, dltBtn);
  menuContainer.append(dotsBtn, menu);

  const taskDetails = document.createElement("div");
  taskDetails.classList.add("task-details");
  const priorityImg = document.createElement("img");
  priorityImg.classList.add("circle");

  const taskTitle = document.createElement("h4");
  taskTitle.textContent = t.title;

  const taskDescription = document.createElement("p");
  taskDescription.textContent = t.description;

  const aboutTask = document.createElement("div");
  aboutTask.classList.add("about-task");

  const taskPriority = document.createElement("p");
  const pSpan = document.createElement("span");
  pSpan.classList.add("priority");
  pSpan.textContent = t.priority;
  taskPriority.textContent = "Priority: ";
  taskPriority.appendChild(pSpan);

  const taskStatus = document.createElement("p");
  const sSpan = document.createElement("span");
  sSpan.classList.add("status");
  sSpan.textContent = t.status;
  taskStatus.textContent = "Status: ";
  taskStatus.appendChild(sSpan);

  const taskDueDate = document.createElement("p");
  const dSpan = document.createElement("span");
  dSpan.classList.add("date");
  dSpan.textContent = t.dueDate;
  taskDueDate.textContent = "Due Date: ";
  taskDueDate.appendChild(dSpan);

  const taskDateCreated = document.createElement("p");
  taskDateCreated.style.color = "#708090";
  taskDateCreated.textContent = `Date Created: ${t.dateCreated}`;

  if (t.priority === "Extreme") {
    pSpan.style.color = "#800080";
  } else if (t.priority === "Moderate") {
    pSpan.style.color = "#0ec2daff";
  } else {
    pSpan.style.color = "#dbc60aff";
  }

  if (t.status === "Completed") {
    priorityImg.src = greenCircle;
    sSpan.style.color = "#00b900ff";

    taskDetails.append(priorityImg, taskTitle, taskDescription);
    aboutTask.append(taskPriority, taskStatus, taskDueDate, taskDateCreated);
    task.append(menuContainer, taskDetails, aboutTask);
    document.querySelector(".completed-tasks").appendChild(task);
  } else {
    if (t.status === "Not Started") {
      priorityImg.src = redCircle;
      sSpan.style.color = "#ff0000";
    } else if (t.status === "In Progress") {
      priorityImg.src = blueCircle;
      sSpan.style.color = "#0000ff";
    }

    taskDetails.append(priorityImg, taskTitle, taskDescription);
    aboutTask.append(taskPriority, taskStatus, taskDueDate, taskDateCreated);
    task.append(menuContainer, taskDetails, aboutTask);
    document.querySelector(".tasks").appendChild(task);
  }
}

