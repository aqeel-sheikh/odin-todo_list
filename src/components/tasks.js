export class task {
  constructor(title, dueDate, priority, description,) {
    (this.title = title), (this.description = description);
    (this.dueDate = dueDate), (this.priority = priority);
  }
}
const myDialog = document.getElementById("myDialog");
const form = document.querySelector("#taskForm")
form.addEventListener("submit", (e)=>{
    e.preventDefault()
})
export function addTask() {
    document.querySelector("#done").addEventListener("click", () => {
      const titleELement = document.querySelector("#title")
    const title = titleELement.value
    let date = document.querySelector("#date").value;
    let priority = document.querySelector('input[name="priority"]:checked').value;
    let description = document.querySelector("#description").value;

    showTask(title,date,priority,description)
    const t = new task(title,date, priority, description);
    myDialog.close()
    form.reset()

  });
}
export function showTask(t,da,p,d){
    const div = document.createElement("div")
    const titleP = document.createElement("p")
    titleP.textContent = t
    const dateP = document.createElement("p")
    dateP.textContent = da
    const priorityP = document.createElement("p")
    priorityP.textContent = p
    const descriptionP = document.createElement("p")
    descriptionP.textContent = d

    div.append(titleP,dateP, priorityP, descriptionP )

    document.querySelector("#content").appendChild(div)
}
export function showAddTaskForm() {
  
  document.querySelector("#addTask").addEventListener("click", () => {
    myDialog.showModal();
  });
  document.querySelector("#closeDialog").addEventListener("click", () => {
    myDialog.close();
    form.reset()
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
