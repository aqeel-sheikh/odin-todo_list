export function deleteTask(div, task) {
  let tasks = JSON.parse(localStorage.getItem("myData")) || [];

  tasks = tasks.filter((t) => t.id !== task.id);

  localStorage.setItem("myData", JSON.stringify(tasks));

  div.remove();
}
