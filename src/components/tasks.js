import dotsImg from "../assets/icons/three-dots.svg";
import redCircle from "../assets/icons/red-circle.svg";
import blueCircle from "../assets/icons/blue-circle.svg";
import greenCircle from "../assets/icons/green-circle.svg";

export class task {
  constructor(title, dueDate, priority, description) {
    (this.title = title),
      (this.dueDate = dueDate),
      (this.priority = priority),
      (this.description = description),
      (this.dateCreated = generateDate()),
      (this.id = crypto.randomUUID());
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
    
    const description = document.querySelector("#description").value;
    
    const t = new task(title, date, priority, description);
    showTask(title, date, priority, description);

    tasksList.push(t);
    localStorage.setItem("myData", JSON.stringify(tasksList));
    
    // const savedData = JSON.parse(localStorage.getItem("myData")) || [];

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

export function showTask(title, dueDate, priority, description) {
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
  taskTitle.textContent = title;

  const taskDescription = document.createElement("p");
  taskDescription.textContent = description;

  const aboutTask = document.createElement("div");
  aboutTask.classList.add("about-task");

  const taskPriority = document.createElement("p");
  const pSpan = document.createElement("span");
  pSpan.classList.add("priority");
  pSpan.textContent = priority;
  taskPriority.textContent = "Priority: ";
  taskPriority.appendChild(pSpan);

  const taskDueDate = document.createElement("p");
  const dSpan = document.createElement("span");
  dSpan.classList.add("date");
  dSpan.textContent = dueDate;
  taskDueDate.textContent = "Due Date: ";
  taskDueDate.appendChild(dSpan);

  if (priority === "Extreme") {
    priorityImg.src = redCircle;
    task.style.backgroundColor = "#e645450e";
    pSpan.style.color = "#ff0000";
  } else if (priority === "Moderate") {
    priorityImg.src = blueCircle;
    task.style.backgroundColor = "#1d32ce0e";
    pSpan.style.color = "#0000ff";
  } else {
    priorityImg.src = greenCircle;
    task.style.backgroundColor = "#00ff001c";
    pSpan.style.color = "#00ff00";
  }

  taskDetails.append(priorityImg, taskTitle, taskDescription);
  aboutTask.append(taskPriority, taskDueDate);

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
}

{
  /* <div class="task">
  <div class="task-details">
    <img class="circle" src="./assets/icons/blue-circle.svg" alt="" />

    <h4>Task 1</h4>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, itaque.
    </p>
  </div>
  <div class="about-task">
    <p>
      Priority: <span class="priority">Moderate</span>
    </p>
    <p>
      Status: <span class="status">In progress</span>
    </p>
    <p>
      Due date: <span class="date">01-01-2025</span>
    </p>
  </div>
</div>; */
}
