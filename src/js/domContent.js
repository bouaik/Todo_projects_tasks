import storage from './storage'

const domProject = () => {

    let projects = storage.projectsDb



    const projectsContainer = document.querySelector('[data-projects]')
    const newProjectFrom = document.querySelector('[data-new-project-form]')
    const newProjectInput = document.querySelector('[data-new-project-input]')
    newProjectFrom.addEventListener('submit', (e) => {
        e.preventDefault()
        const projectName = newProjectInput.value
    
        if(projectName == null || projectName === "") return
    
        const project = createProject(projectName)
    
        newProjectInput.value = null
    
        projects.push(project)
        storage.save()
        render()
    })
    const createProject = (name) => {
    
        return {id: Date.now().toString(), name: name, todos: []}
    }
    
    const render = () => {
        clearElement(projectsContainer)
    
        projects.forEach(project => {
            const projectElement = document.createElement('a')
            projectElement.classList.add('list-group-item', 'list-group-item-action')
            projectElement.setAttribute('href', '#')
            projectElement.dataset.projectId = project.id
            projectElement.textContent = project.name
            projectsContainer.appendChild(projectElement)
        })
    }
    
    const clearElement= (element) => {
        projectsContainer.innerHTML = ''
    }
    
    render()


}

export { domProject }