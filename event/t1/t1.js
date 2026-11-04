// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];

const todoListElement = document.querySelector('ul');
const addButton = document.querySelector('.add-btn');
const addDialog = document.querySelector('.add-dialog');
const addForm = document.querySelector('.add-form');
const taskInput = document.querySelector('#todo-name');
const cancelButton = document.querySelector('.cancel-btn');

const renderTodoList = () => {
  todoListElement.replaceChildren();

  todoList.forEach(todo => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const deleteButton = document.createElement('button');
    const inputId = `todo-${todo.id}`;

    checkbox.type = 'checkbox';
    checkbox.id = inputId;
    checkbox.checked = todo.completed;
    checkbox.dataset.todoId = todo.id;
    label.htmlFor = inputId;
    label.textContent = todo.task;
    deleteButton.type = 'button';
    deleteButton.className = 'delete-btn';
    deleteButton.dataset.todoId = todo.id;
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('aria-label', `Delete ${todo.task}`);

    listItem.append(checkbox, label, deleteButton);
    todoListElement.append(listItem);
  });
};

todoListElement.addEventListener('change', event => {
  if (event.target.matches('input[type="checkbox"]')) {
    const todo = todoList.find(item => item.id === Number(event.target.dataset.todoId));
    if (!todo) return;

    todo.completed = event.target.checked;
    console.log(todoList);
  }
});

todoListElement.addEventListener('click', event => {
  if (!event.target.matches('.delete-btn')) return;

  const todoId = Number(event.target.dataset.todoId);
  const listItem = event.target.parentElement;
  todoList.splice(
    todoList.findIndex(todo => todo.id === todoId),
    1
  );
  todoListElement.removeChild(listItem);
  console.log(todoList);
});

addButton.addEventListener('click', () => {
  addForm.reset();
  addDialog.showModal();
  taskInput.focus();
});

cancelButton.addEventListener('click', () => addDialog.close());

addForm.addEventListener('submit', event => {
  event.preventDefault();
  const task = taskInput.value.trim();
  if (!task) {
    taskInput.focus();
    return;
  }

  const nextId = todoList.reduce((highestId, todo) => Math.max(highestId, todo.id), 0) + 1;
  todoList.push({id: nextId, task, completed: false});
  renderTodoList();
  console.log(todoList);
  addDialog.close();
});

renderTodoList();
