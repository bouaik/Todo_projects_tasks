const storage = (() => {
  const LOCAL_STORAGE_PROJECT_KEY = 'todo.projects';
  const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'todo.selectedProjectId';

  const projectsDb = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];

  const selectedProject = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY);

  const allTodos = {
    id: '1',
    name: 'All todos',
    todos: [],
  };

  if (projectsDb.length === 0) projectsDb.push(allTodos);

  const save = (projects, selectedProject) => {
    localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedProject);
  };

  return { projectsDb, save, selectedProject };
})();

export { storage };// eslint-disable-line