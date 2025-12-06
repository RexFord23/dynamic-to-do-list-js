// Run the script only after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        // If empty, alert user
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item (li)
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // When remove button is clicked, delete this task
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Add button inside li
        li.appendChild(removeBtn);

        // Add li to the task list
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }

    // Add task when button is clicked
    addButton.addEventListener('click', addTask);

    // Add task when pressing Enter key inside input
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Invoke addTask on DOMContentLoaded (as requested)
    addTask();
});
