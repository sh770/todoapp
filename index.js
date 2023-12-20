let globalid = 0;
const saveTodos = JSON.parse(localStorage.getItem("todos"));
let todos = saveTodos || [];

const todoListElemrnt = document.getElementById("todo-list");
const inputElemrnt = document.querySelector("input");

const myButton = document.getElementById("myButton");

// הוסף אירוע לחיצה על הכפתור
myButton.addEventListener("click", () => {
  // קוד הפונקציה שתרצה להפעיל בעת לחיצה
  createTodoItem();
});

const renderTodoList = () => {
  let todoComponents = "";
  todos.forEach((todo) => {
    todoComponents += createTodoComponent(todo);
  });
  todoListElemrnt.innerHTML = todoComponents;
};

const createTodoComponent = (todo) => {
  const data = new Date(todo.created).toLocaleDateString("he-il");
  const time = new Date(todo.created).toLocaleTimeString("he-il");
  return `
          <figure>
            <h3 ${todo.isCompleted ? 'class="completed"' : ""}>${todo.text}</h3>
            <p ${
              todo.isCompleted ? 'class="completed"' : ""
            }>${data} ${time}</p>
            <button onclick="toggleTodoItem(${todo.id})" 
            class="toggle-todo ${todo.isCompleted ? "completed" : ""}">${
    todo.isCompleted ? "בוצע" : "סמן"
  }</button>
            <button onclick="removeTodoById(${
              todo.id
            })" class="remove-todo ">X</button>
        </figure> 
    `;
};

const toggleTodoItem = (id) => {
  const idx = todos.findIndex((todo) => todo.id === id);
  todos[idx].isCompleted = !todos[idx].isCompleted;
  saveTodoList();
  renderTodoList();
};

const createTodoItem = () => {
  const text = inputElemrnt.value;
  console.log(text);
  if (!text) return;
  const todoItem = {
    id: genId(),
    text,
    created: Date.now(),
    isCompleted: false,
  };
  todos.push(todoItem);
  inputElemrnt.value = "";
  saveTodoList();
  renderTodoList();
};

const removeTodoById = (id) => {
  todos = [...todos.filter((todo) => todo.id !== id)];
  saveTodoList();
  renderTodoList();
};

const genId = () => {
  globalid++;
  return globalid;
};

const saveTodoList = () => {
  localStorage.setItem("todos",JSON.stringify(todos))
};

renderTodoList()