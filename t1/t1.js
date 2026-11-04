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

const escapeHtml = value =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

todoList.forEach(todo => {
  const checked = todo.completed ? ' checked' : '';
  const id = `todo-${todo.id}`;

  todoListElement.insertAdjacentHTML(
    'beforeend',
    `<li>
      <input type="checkbox" id="${escapeHtml(id)}"${checked}>
      <label for="${escapeHtml(id)}">${escapeHtml(todo.task)}</label>
    </li>`
  );
});
