const storage = (() => {

    const LOCAL_STORAGE_PROJECT_KEY = "todo.projects"

    let projectsDb = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || []


    const save = () => {
        localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projectsDb))
    }

    return { projectsDb, save }
})();

export default storage