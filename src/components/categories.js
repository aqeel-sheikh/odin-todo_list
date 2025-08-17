import { showTask } from "./tasks";
import dltIcon from "../assets/icons/delete.svg";
class Category {
  constructor(categoryName) {
    this.categoryName = categoryName;
    this.id = crypto.randomUUID();
    this.tasks = [];
  }
  addTask(t) {
    this.tasks.push(t);
  }
}

export const rawCategories =
  JSON.parse(localStorage.getItem("myCategories")) || [];

export const categoryList = rawCategories.map((c) => {
  const cat = new Category(c.categoryName);
  cat.id = c.id;
  cat.tasks = c.tasks || [];
  return cat;
});

let currentCategoryID = null;

export function showTasksInCategory() {
  const categoryNames = document.querySelectorAll(".category");

  categoryNames.forEach((cat) => {
    cat.addEventListener("click", () => {
      document.querySelectorAll(".task").forEach((e) => e.remove());

      currentCategoryID = cat.dataset.id;
      const title = document.querySelector(".todo-title");

      for (let c of categoryList) {
        if (cat.dataset.id === c.id) {
          title.textContent = `To-Do (${c.categoryName})`;
          if (c.tasks.length !== 0) {
            for (let task of c.tasks) {
              showTask(task);
            }
          }
        }
      }
    });
  });
}

export function addTaskInCategory(t) {
  if (currentCategoryID !== null) {
    for (let c of categoryList) {
      if (c.id === currentCategoryID) {
        c.addTask(t);
        localStorage.setItem("myCategories", JSON.stringify(categoryList));
      }
    }
  }
}

export function addNewCategory() {
  const addNewCategory = document.querySelector("#addNewCategory");
  const categoryDialog = document.querySelector(".new-category-dialog");

  addNewCategory.addEventListener("click", () => {
    const categoryName = document.querySelector("#category-name").value;

    const newCategory = new Category(categoryName);
    categoryList.push(newCategory);
    localStorage.setItem("myCategories", JSON.stringify(categoryList));

    showCategory(newCategory);
  });

  closeCategoryForm(categoryDialog);
}

export function showCategory(c) {
  const newCategoryElm = document.createElement("p");
  const dltBtn = document.createElement("img");
  dltBtn.src = dltIcon;

  newCategoryElm.dataset.id = c.id;
  newCategoryElm.classList.add("category");
  newCategoryElm.textContent = c.categoryName;

  dltBtn.addEventListener("click", () =>{
    deleteCategory(newCategoryElm)
    location.reload();
  });
  newCategoryElm.appendChild(dltBtn);
  document.querySelector(".categories-content").appendChild(newCategoryElm);
}

function deleteCategory(cat) {
  let categories = JSON.parse(localStorage.getItem("myCategories")) || [];
  let allTasks = JSON.parse(localStorage.getItem("myData")) || [];

  const category = categories.find((c) => c.id === cat.dataset.id);
  const catTasks = category ? category.tasks : [];

  categories = categories.filter((c) => c.id !== cat.dataset.id);

  allTasks = allTasks.filter((t) => !catTasks.some((ct) => ct.id === t.id));

  localStorage.setItem("myData", JSON.stringify(allTasks));
  localStorage.setItem("myCategories", JSON.stringify(categories));
  cat.remove();
}

export function showAddCategoryForm() {
  const showFormBtn = document.querySelector(".add-category-btn");
  const categoryDialog = document.querySelector(".new-category-dialog");
  showFormBtn.addEventListener("click", () => {
    categoryDialog.showModal();
  });
}

function closeCategoryForm(dialog) {
  document
    .querySelector("#closeCategoryDialog")
    .addEventListener("click", () => {
      dialog.close();
    });
}
