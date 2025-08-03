document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  function addTask(taskText, save = true) {
    if (!taskText || taskText.trim() === '') {
      alert("Please enter a task.");
      return;
    }

    taskText = taskText.trim();

    const li = document.createElement('li');
    li.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.className = 'remove-btn';

    removeButton.onclick = () => {
      taskList.removeChild(li);
      tasks = tasks.filter(t => t !== taskText);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    li.appendChild(removeButton);
    taskList.appendChild(li);

    if (save) {
      tasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    taskInput.value = "";
  }

  function loadTasks() {
    tasks.forEach(task => addTask(task, false));
  }

  addButton.addEventListener('click', () => {
    addTask(taskInput.value);
  });

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask(taskInput.value);
    }
  });

  loadTasks();
});
