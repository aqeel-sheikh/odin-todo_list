import dotsImg from "../assets/icons/three-dots.svg";
import redCircle from "../assets/icons/red-circle.svg";
import greenCircle from "../assets/icons/green-circle.svg";
import blueCircle from "../assets/icons/blue-circle.svg";
import orangeCircle from "../assets/icons/orange-circle.svg";

export class task {
  constructor(title, dueDate, priority, status, description) {
    (this.title = title),
      (this.dueDate = dueDate),
      (this.priority = priority),
      (this.status = status),
      (this.description = description),
      (this.id = crypto.randomUUID()),
      (this.dateCreated = generateDate());
  }
}
function generateDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return `${day}-${month}-${year}`;
}

const myDialog = document.getElementById("myDialog");
const form = document.querySelector("#taskForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const tasksList = JSON.parse(localStorage.getItem("myData")) || [];

export function addTask() {
  document.querySelector("#done").addEventListener("click", () => {
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
    showCompletedTasks(tasksList);
    localStorage.setItem("myData", JSON.stringify(tasksList));

    myDialog.close();
    form.reset();
  });
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
  menu.classList.add("menu", "hide");

  const editBtn = document.createElement("a");
  editBtn.textContent = "Edit";
  const dltBtn = document.createElement("a");
  dltBtn.textContent = "Delete";

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

  if (t.status === "Not Started") {
    priorityImg.src = redCircle;
    sSpan.style.color = "#ff0000";
    // task.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
  } else if (t.status === "In Progress") {
    priorityImg.src = blueCircle;
    sSpan.style.color = "#0000ff";
    // task.style.backgroundColor = "rgba(0, 0, 255, 0.1)";
  } else if (t.status === "Completed") {
    priorityImg.src = greenCircle;
    sSpan.style.color = "#00b900ff";
    // task.style.backgroundColor = "rgba(0, 255, 0, 0.1)";
  }
  if (t.priority === "Extreme") {
    pSpan.style.color = "#800080";
  } else if (t.priority === "Moderate") {
    pSpan.style.color = "#0ec2daff";
  } else {
    pSpan.style.color = "#dbc60aff";
  }

  taskDetails.append(priorityImg, taskTitle, taskDescription);
  aboutTask.append(taskPriority, taskStatus, taskDueDate, taskDateCreated);

  task.append(menuContainer, taskDetails, aboutTask);

  document.querySelector(".tasks").appendChild(task);

  dotsBtn.addEventListener("click", () => {
    menu.classList.toggle("hide");
    if (!dotsBtn.style.position) {
      dotsBtn.style.position = "absolute";
    } else {
      dotsBtn.style.position = "";
    }
  });
  return task;
}

export function showCompletedTasks(arr) {
  const completedTasksContainer = document.querySelector(".completed-tasks");
  for (let compTask of arr) {
    if (compTask.status === "Completed") {
      const existingTaskEl = document.querySelector(
        `[data-id="${compTask.id}"]`
      );
      if (!existingTaskEl) {
        const taskEl = showTask(compTask);
        taskEl.dataset.id = compTask.id;
        completedTasksContainer.appendChild(taskEl);
      }
    }
  }
}
