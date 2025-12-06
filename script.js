// Run the script only after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get and trim input text
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
        
        // Add the required class using classList.add
        removeBtn.classList.add('remove-btn');

        // When remove button is clicked, delete this task
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append button to li
        li.appendChild(removeBtn);

        // Append li to the task list
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

    // Add task when button is clicked
addButton.addEventListener('click', addTask);

// Add task when pressing Enter key inside the input field
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});


    // Invoke addTask on DOMContentLoaded (per instructions)
    addTask();
});


// Return the stored tasks array (or empty array if none)
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Save a tasks array to localStorage
    function setStoredTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Save a single task to localStorage (append)
    function saveTaskToLocalStorage(taskText) {
        const tasks = getStoredTasks();
        tasks.push(taskText);
        setStoredTasks(tasks);
    }

    // Remove a single task from localStorage (removes first matching occurrence)
    function removeTaskFromLocalStorage(taskText) {
        const tasks = getStoredTasks();
        const index = tasks.indexOf(taskText);
        if (index > -1) {
            tasks.splice(index, 1);
            setStoredTasks(tasks);
        }
    }

    // --- Task creation / DOM manipulation ---

    /**
     * addTask
     * Creates a new task DOM element and optionally saves it to localStorage.
     *
     * @param {string} [taskTextParam] - If provided, this text will be used instead of reading the input.
     * @param {boolean} [save=true] - Whether to save this task to localStorage.
     */
    function addTask(taskTextParam, save = true) {
        // Determine the task text: either passed in or from the input field
        const rawText = (typeof taskTextParam !== 'undefined') ? taskTextParam : taskInput.value;
        const taskText = String(rawText).trim();

        // If empty, alert the user and don't create a task
        if (taskText === "") {
            // If the call came from loadTasks (save === false) and task is empty, just skip silently
            if (save) {
                alert("Please enter a task.");
            }
            return;
        }

        // Create the list item and set its text
        const li = document.createElement('li');

        // Use a text node for the task text so the button remains a separate element
        const textNode = document.createTextNode(taskText);
        li.appendChild(textNode);

        // Create the remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn'); // use classList.add as requested

        // When remove button is clicked, remove the li and update localStorage
        removeBtn.addEventListener('click', function () {
            // Remove from DOM
            if (li.parentNode === taskList) {
                taskList.removeChild(li);
            }
            // Update localStorage (always attempt to remove regardless of how task was added)
            removeTaskFromLocalStorage(taskText);
        });

        // Append the button to the li, then append li to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // If this call should save to localStorage (normal user addition), do so
        if (save) {
            saveTaskToLocalStorage(taskText);
        }

        // Clear the input field if we used it
        if (typeof taskTextParam === 'undefined') {
            taskInput.value = "";
        }
    }

    // Load tasks from localStorage and populate the DOM
    function loadTasks() {
        const storedTasks = getStoredTasks();
        storedTasks.forEach(taskText => {
            // Pass save = false to avoid re-saving already-saved tasks
            addTask(taskText, false);
        });
    }

    // --- Event listeners ---

    // Add task when button is clicked
    addButton.addEventListener('click', function () {
        addTask(); // reads from taskInput and saves by default
    });

    // Add task when pressing Enter key inside the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load saved tasks when the page loads
    loadTasks();
});
