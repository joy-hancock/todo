/* globals DOMPurify */
// ========================
// Variables
// ========================
const todolist = document.querySelector('.todolist')
const taskList = todolist.querySelector('.todolist__tasks')

// ========================
// Functions
// ========================
/** Generates a unique string
 * @param {Number} length - Length of string
 * @returns {String}
 */
function generateUniqueString(length) {
	return Math.random()
		.toString(36)
		.substring(2, 2 + length)
}

/** Makes a task based on user input
 * @param {String} taskname - What user types in field
 * @returns {HTMLElement}
 */
function makeTaskElement(taskname) {
	// Generate unique ID for created task
	const uniqueID = generateUniqueString(10)

	// Create task
	const taskElement = document.createElement('li')
	taskElement.classList.add('task')

	taskElement.innerHTML =
		DOMPurify.sanitize(`<input type="checkbox" id="${uniqueID}" />
    <label for="${uniqueID}">
      <svg viewBox="0 0 20 15">
        <path d="M0 8l2-2 5 5L18 0l2 2L7 15z" fill-rule="nonzero" />
          </svg>
    </label>
    <span class="task__name">${taskname}</span>
    <button type="button" class="task__delete-button">
      <svg viewBox="0 0 20 20">
        <path
          d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
        />
      </svg>
    </button>`)

	// Add task element to DOM
	return taskElement
}

// ========================
// Execution
// ========================

todolist.addEventListener('submit', (event) => {
	event.preventDefault()

	// Get what user types
	const newTaskField = todolist.querySelector('input')
	const inputValue = newTaskField.value.trim()

	// Clear the new task field
	newTaskField.value = ''

	// Bring focus back to input field
	newTaskField.focus()

	// Prevent addition of empty task
	if (!inputValue) return

	const taskElement = makeTaskElement(inputValue)

	// Append to the DOM
	taskList.appendChild(taskElement)
})

todolist.addEventListener('click', (event) => {
	if (!event.target.matches('.task__delete-button')) return

	// Deletes a task
	const taskElement = event.target.parentElement
	taskList.removeChild(taskElement)

	// Triggers empty space
	if (taskList.children.length === 0) {
		taskList.innerHTML = ''
	}
})
