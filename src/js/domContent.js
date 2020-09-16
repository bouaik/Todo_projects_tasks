import { storage } from './storage'

const domProject = () => {

    let projects = storage.projectsDb

    let selectedProjectId = storage.selectedProject

    const projectsContainer = document.querySelector('[data-projects]')
    const newProjectFrom = document.querySelector('[data-new-project-form]')
    const newProjectInput = document.querySelector('[data-new-project-input]')


    const todosContainer = document.querySelector('[data-todos-container]')
    const todoProjectTitle = document.querySelector('[data-todos-title]')
    const allTodos = document.querySelector('[data-todos]')

    projectsContainer.addEventListener('click', e => {
        if(e.target.tagName.toLowerCase() === 'a') {
            selectedProjectId = e.target.dataset.projectId
            storage.save(projects, selectedProjectId)
            render()
        }

        if(e.target.tagName.toLowerCase() === 'i') {
            projects = projects.filter(project => project.id !== selectedProjectId)
            selectedProjectId = null
            storage.save(projects, selectedProjectId)
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
        renderProject()

        const selectedProject = projects.find(project => project.id === selectedProjectId)

        if (selectedProjectId == null) {
            todosContainer.style.display = 'none'
        } else {
            todosContainer.style.display = ''
            todoProjectTitle.textContent = selectedProject.name
            // clearElement(allTodos)
            renderTodos(selectedProject)
        }
    }

    const renderProject = () => {
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

    const renderTodos = (selectedProject) => {
        selectedProject.todos.forEach(todo => {
            
        })

    }
    
    const clearElement= (element) => {
        element.innerHTML = ''
    }
    
    render()
}

export { domProject }