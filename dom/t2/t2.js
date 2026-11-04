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

todoList.forEach(todo => {
  const listItem = document.createElement('li');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const id = `todo-${todo.id}`;

  checkbox.type = 'checkbox';
  checkbox.id = id;
  checkbox.checked = todo.completed;

  label.htmlFor = id;
  label.textContent = todo.task;

  listItem.append(checkbox, label);
  todoListElement.append(listItem);
});
