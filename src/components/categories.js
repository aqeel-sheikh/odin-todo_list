import { parse } from "date-fns";
import { showTask, task } from "./tasks";

class Category {
  constructor(categoryName, t) {
    this.categoryName = categoryName;
    this.id = crypto.randomUUID();
    this.tasks = [];
  }
  addTask(t) {
    this.tasks.push(t);
  }
}

export function showAddCategoryForm() {
  const showFormBtn = document.querySelector(".add-category-btn");
  const categoryDialog = document.querySelector(".new-category-dialog");
  showFormBtn.addEventListener("click", () => {
    categoryDialog.showModal();
  });
}
const form = document.querySelector("#category-form");

const rawCategories = JSON.parse(localStorage.getItem("myCategories")) || [];
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
    cat.addEventListener("click", (e) => {
      document.querySelectorAll(".task").forEach((e) => e.remove());
      currentCategoryID = cat.dataset.id;
      console.log("clicked");
      for (let c of categoryList) {
        if (cat.dataset.id === c.id) {
          if (c.tasks.length !== 0) {
            for (let task of c.tasks) {
              showTask(task);
            }
          } else {
            console.log("No tasks Here");
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
  newCategoryElm.dataset.id = c.id;
  newCategoryElm.classList.add("category");
  newCategoryElm.textContent = c.categoryName;
  document.querySelector(".categories-content").appendChild(newCategoryElm);
}
function closeCategoryForm(dialog) {
  document
    .querySelector("#closeCategoryDialog")
    .addEventListener("click", () => {
      dialog.close();
    });
}
