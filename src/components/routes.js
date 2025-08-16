export function showAllTasks() {
  const myTasks = document.querySelector(".myTasks");

  myTasks.addEventListener("click", () => {
    const tasks = document.querySelector(".tasks");
    const content = document.querySelector("#content");

    const status = document.querySelector(".tasks-status");
    const compTasks = document.querySelector(".completed-tasks");

    if (status) {
      status.style.display = "none";
    }
    if (compTasks) {
      compTasks.style.display = "none";
    }
    if (content) {
      content.removeAttribute("id");
      content.classList.add("myTasksPage");
    }
    if (tasks.style.display === "none") {
      tasks.style.display = "block";
    }
    tasks.id = "myTasksPageTasks";
  });
}

export function showCompletedTasks() {
  const myTasks = document.querySelector(".compTasks");

  myTasks.addEventListener("click", () => {
    const compTasks = document.querySelector(".completed-tasks");
    const content = document.querySelector("#content");

    const status = document.querySelector(".tasks-status");
    const tasks = document.querySelector(".tasks");

    if (status) {
      status.style.display = "none";
    }
    if (tasks) {
      tasks.style.display = "none";
    }
    if (content) {
      content.removeAttribute("id");
      content.classList.add("myTasksPage");
    }
    if (compTasks.style.display === "none") {
      compTasks.style.display = "block";
    }
    compTasks.id = "myTasksPageTasks";
  });
}
