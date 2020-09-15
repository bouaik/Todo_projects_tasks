import './styles/main.scss'
import 'bootstrap'

var jQuery = require('jquery')

// include jQuery in global and window scope (so you can access it globally)
// in your web browser, when you type $('.div'), it is actually refering to global.$('.div')
global.$ = global.jQuery = jQuery;
window.$ = window.jQuery = jQuery;

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})

let projects = [
    {
        id: 1,
        name: 'one'
    }, {
        id: 2,
        name: 'two'
    }
]


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



