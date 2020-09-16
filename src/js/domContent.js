import { storage } from './storage';

const domContent = () => {
  /* eslint-disable no-use-before-define */

  let projects = storage.projectsDb;

  let selectedProjectId = '1';

  const projectsContainer = document.querySelector('[data-projects]');
  const newProjectFrom = document.querySelector('[data-new-project-form]');
  const newProjectInput = document.querySelector('[data-new-project-input]');

  const todosContainer = document.querySelector('[data-todos-container]');
  const todoProjectTitle = document.querySelector('[data-todos-title]');
  const allTodos = document.querySelector('[data-todos]');

  const todoTemplate = document.getElementById('todo-template');


  const addTodo = document.getElementById('add-todo');
  const newTodoTitle = document.getElementById('new-todo-title');
  const newTodoDescription = document.getElementById('todo-description-text');
  const newTodoPriority = document.getElementById('todo-priority-select');
  const newTodoDueDate = document.getElementById('todo-deadline');

  projectsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'a') {
      selectedProjectId = e.target.dataset.projectId;
      storage.save(projects, selectedProjectId);
      render();
    }

    if (e.target.tagName.toLowerCase() === 'i') {
      projects = projects.filter(project => project.id !== selectedProjectId);
      selectedProjectId = null;
      storage.save(projects, selectedProjectId);
      render();
    }
  });


  newProjectFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    const projectName = newProjectInput.value;

    if (projectName == null || projectName === '') return;

    const project = createProject(projectName);

    newProjectInput.value = null;

    projects.push(project);
    storage.save(projects, selectedProjectId);
    render();
  });

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
    render();
  });


  const createTodo = (a, b, c, d) => ({
    id: `i${Date.now().toString()}`, name: a, description: b, priority: c, dueDate: d, complete: false,
  });


  const createProject = name => ({ id: Date.now().toString(), name, todos: [] });

  const render = () => {
    clearElement(projectsContainer);
    renderProject();
    renderTodos(projects[0]);

    const selectedProject = projects.find(project => project.id === selectedProjectId);

    if (selectedProjectId == null) {
      todosContainer.style.display = 'none';
    } else {
      todosContainer.style.display = '';
      todoProjectTitle.textContent = selectedProject.name;
      clearElement(allTodos);
      renderTodos(selectedProject);
    }
  };

  const renderProject = () => {
    projects.forEach(project => {
      const projectElement = document.createElement('a');
      projectElement.classList.add('list-group-item', 'list-group-item-action');
      projectElement.setAttribute('href', '#');
      projectElement.dataset.projectId = project.id;
      projectElement.textContent = project.name;
      if (project.id === selectedProjectId) {
        projectElement.classList.add('active');
        const deleteProjectBtn = document.createElement('i');
        deleteProjectBtn.classList.add('delete-project', 'fas', 'fa-trash-alt');
        projectElement.appendChild(deleteProjectBtn);
      }
      projectsContainer.appendChild(projectElement);
    });
  };


  const renderTodos = (selectedProject) => {
    selectedProject.todos.forEach(todo => {
      const todoElement = document.importNode(todoTemplate.content, true);

      const collapse = todoElement.querySelector('.collapse');
      const todoLink = todoElement.querySelector('.todo');
      const todoDescription = todoElement.querySelector('.description');
      const todoPriority = todoElement.querySelector('.priority-display');
      const todoDueDate = todoElement.querySelector('.deadline-display');
      const deleteTodo = todoElement.querySelector('.delete-todo');


      const checkbox = todoElement.querySelector('input');
      checkbox.id = todo.id;
      checkbox.checked = todo.complete;

      const label = todoElement.querySelector('label');
      label.htmlFor = todo.id;


      todoLink.setAttribute('href', `#${todo.id}`);
      collapse.setAttribute('id', todo.id);


      todoLink.append(todo.name);
      todoDescription.append(todo.description);
      todoPriority.append(todo.priority);
      todoDueDate.append(todo.dueDate);

      allTodos.appendChild(todoElement);

      checkbox.addEventListener('click', () => {
        if (checkbox.checked) {
          todo.complete = true;
          storage.save(projects, selectedProjectId);
          render();
        } else {
          todo.complete = false;
          todoLink.classList.remove('todo-complete');
          storage.save(projects, selectedProjectId);
        }
      });

      if (todo.complete) {
        todoLink.classList.add('todo-complete');
      }


      deleteTodo.addEventListener('click', () => {
        selectedProject.todos = selectedProject.todos.filter(todo => todo.id !== collapse.id);
        storage.save(projects, selectedProjectId);
        render();
      });
    });
  };

  const clearElement = (element) => {
    element.innerHTML = '';
  };

  render();
};

export { domContent };// eslint-disable-line