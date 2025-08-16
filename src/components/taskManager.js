import { myDialog, tasksList, handleAddTask} from "./tasks";
import { categoryList } from "./categories";

export function deleteTask(div, task) {
  let tasks = JSON.parse(localStorage.getItem("myData")) || [];
  let cTasks = JSON.parse(localStorage.getItem("myCategories"))
  
  tasks = tasks.filter((t) => t.id !== task.id);

  localStorage.setItem("myData", JSON.stringify(tasks));

  div.remove();
}
export function editTask(t) {
  myDialog.showModal();
  const doneBtn = document.querySelector("#done");
  doneBtn.removeEventListener("click", handleAddTask);

  document.querySelector("#title").value = t.title;

  const date = new Date(t.dueDate);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  document.querySelector("#date").value = date.toISOString().split("T")[0];

  document.querySelector(
    `input[name="priority"][value=${t.priority}]`
  ).checked = true;

  let statusValue = CSS.escape(t.status);
  document.querySelector(
    `input[name='status'][value=${statusValue}]`
  ).checked = true;

  document.querySelector("#description").value = t.description;

  let currentTask = tasksList.find((task) => task.id === t.id);
  let currentCategoryTask = categoryList.find(task => task.id === t.id)

  doneBtn.addEventListener("click", () => {
    const titleELement = document.querySelector("#title");
    const title = titleELement.value;

    const date = document.querySelector("#date").value;

    const priority = document.querySelector(
      'input[name="priority"]:checked'
    ).value;

    const status = document.querySelector("input[name='status']:checked").value;

    const description = document.querySelector("#description").value;

    currentTask.title = title;
    currentTask.dueDate = date;
    currentTask.priority = priority;
    currentTask.status = status;
    currentTask.description = description;
    
    
    
    localStorage.setItem("myData", JSON.stringify(tasksList));
    myDialog.close()
  });
}
