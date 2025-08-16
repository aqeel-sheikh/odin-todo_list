
export function showAllTasks () {
    const myTasks = document.querySelector(".myTasks")

    myTasks.addEventListener("click", ()=> {
        const status = document.querySelector(".tasks-status")
        const compTasks = document.querySelector(".completed-tasks")
        const content = document.querySelector("#content")
        const tasks = document.querySelector(".tasks")
        const addTask = document.querySelector("#addTask")
        
        if(status){
            status.remove()
            compTasks.style.display = "none"
            content.removeAttribute("id")
            content.classList.add("myTasksPage")
            tasks.id = "myTasksPageTasks"
        }
    })
}

export function showCompletedTasks () {

}