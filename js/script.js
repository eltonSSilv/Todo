// seleção de elementos
const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const editForm = document.querySelector("#editForm");
const editInput = document.querySelector("#editInput");
const cancelEditBtn = document.querySelector("#cancelEditBtn");


let oldInputValue;

// funções
const saveTodo = (text) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button")
  doneBtn.classList.add("finish__todo")
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button")
  editBtn.classList.add("edit__todo")
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
  todo.appendChild(editBtn)

  const deleteBtn = document.createElement("button")
  deleteBtn.classList.add("remove__todo")
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
  todo.appendChild(deleteBtn)

  todoList.appendChild(todo);

  todoInput.value = "";
  todoInput.focus();
}

const toggleForms = () => {
  editForm.classList.toggle("hidden")
  todoForm.classList.toggle("hidden")
  todoList.classList.toggle("hidden")
}

const upDateTodo = (text) => {

  const todos = document.querySelectorAll(".todo")

  todos.forEach((todo) => {

    let todoTitle = todo.querySelector("h3")

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;
    }
  })

}


// eventos
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputValue = todoInput.value

  if (inputValue) {
    saveTodo(inputValue);
  }
})

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText;
  }

  if (targetEl.classList.contains("finish__todo")) {
    parentEl.classList.toggle("done");
  }

  if (targetEl.classList.contains("remove__todo")) {
    parentEl.remove();
  }

  if (targetEl.classList.contains("edit__todo")) {
    toggleForms();

    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
})

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault()

  toggleForms()
})

editForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const editInputValue = editInput.value

  if (editInputValue) {
    upDateTodo(editInputValue)
  }

  toggleForms()
})
