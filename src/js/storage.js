const storage = (() => {

    const LOCAL_STORAGE_PROJECT_KEY = "todo.projects"
    const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = "todo.selectedProjectId"

    let projectsDb = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || []

    let selectedProject = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY)

    

    const save = (projects, selectedProject) => {
        localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects))
        localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedProject)
    }

    return { projectsDb, save, selectedProject }
})();

export { storage }