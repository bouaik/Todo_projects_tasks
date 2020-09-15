import { storage } from './storage'

const domProject = () => {

    let projects = storage.projectsDb

    let selectedProjectId = storage.selectedProject

    const projectsContainer = document.querySelector('[data-projects]')
    const newProjectFrom = document.querySelector('[data-new-project-form]')
    const newProjectInput = document.querySelector('[data-new-project-input]')

    projectsContainer.addEventListener('click', e => {
        if(e.target.tagName.toLowerCase() === 'a') {
            selectedProjectId = e.target.dataset.projectId
            storage.save(projects, selectedProjectId)
            render()
        }

        if(e.target.tagName.toLowerCase() === 'i') {
            projects = projects.filter(project => project.id !== selectedProjectId)
            storage.save(projects, null)
            render()

        }
    })


    newProjectFrom.addEventListener('submit', (e) => {
        e.preventDefault()
        const projectName = newProjectInput.value
    
        if(projectName == null || projectName === "") return
    
        const project = createProject(projectName)
    
        newProjectInput.value = null
    
        projects.push(project)
        storage.save(projects, selectedProjectId)
        render()
    })
    const createProject = name => {
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
            if(project.id === selectedProjectId) {
                projectElement.classList.add('active')
                const deleteProjectBtn = document.createElement('i')
                deleteProjectBtn.classList.add('delete-project', 'fas', 'fa-trash-alt')
                projectElement.appendChild(deleteProjectBtn)
            }
            projectsContainer.appendChild(projectElement)
        })
    }
    
    const clearElement= (element) => {
        projectsContainer.innerHTML = ''
    }
    
    render()
}

export { domProject }