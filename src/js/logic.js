import { storage } from './storage';
import { domContent } from './domContent';// eslint-disable-line

const logic = (() => {
  const projects = storage.projectsDb;

  const selectedProjectId = storage.selectedProject;

  const addTodo = document.getElementById('add-todo');
  const newTodoTitle = document.getElementById('new-todo-title');
  const newTodoDescription = document.getElementById('todo-description-text');
  const newTodoPriority = document.getElementById('todo-priority-select');
  const newTodoDueDate = document.getElementById('todo-deadline');

  const createTodo = (a, b, c, d) => ({
    id: `i${Date.now().toString()}`, name: a, description: b, priority: c, dueDate: d, complete: false,
  });

  const createProject = name => ({ id: Date.now().toString(), name, todos: [] });

  addTodo.addEventListener('click', () => {
    const todoTitileName = newTodoTitle.value;
    const todoDescriptionName = newTodoDescription.value;
    const todoPriorityName = newTodoPriority.value;
    const todoDueDateName = newTodoDueDate.value;
    if (todoTitileName === '' || todoDescriptionName === '' || todoPriorityName === '' || todoDueDateName === '') {
          alert('fill all fields');// eslint-disable-line
      return;
    }
    const todo = createTodo(todoTitileName, todoDescriptionName, todoPriorityName, todoDueDateName);

    newTodoTitle.value = '';
    newTodoDescription.value = '';
    newTodoPriority.value = '';
    newTodoDueDate.value = '';

    const selectedProject = projects.find(project => project.id === selectedProjectId);

    selectedProject.todos.push(todo);
    projects[0].todos.push(todo);
    storage.save(projects, selectedProjectId);
    domContent.renderTodos(selectedProject);
  });

  return { createProject };
})();

export { logic };// eslint-disable-line