const parentTasks = [];
const taskTableBody = document.getElementById('taskTableBody');
const editModal = document.getElementById('editModal');
const subtaskModal = document.getElementById('subtaskModal');
const container = document.querySelector('.container')
let editedTaskId = '';
let currentParentTaskId = '';
let lastSubtaskId = 0;


function addParentTask() {
    const parentId = document.getElementById('parentTaskId').value;
    const parentName = document.getElementById('parentTaskName').value;
    const parentStartDate = new Date(document.getElementById('parentStartDate').value);
    const parentEndDate = new Date(document.getElementById('parentEndDate').value);
    const parentStatus = document.getElementById('parentStatus').value;

    if (isNaN(parentId) || parentId <= 0) {
        alert("Parent Task ID must be a valid positive number.");
        return;
    }

    if (!parentId || !parentName || !parentStartDate || !parentEndDate || !parentStatus) {
        alert('All fields are mandatory');
        return;
    }

    if (isNaN(parentStartDate.getTime()) || isNaN(parentEndDate.getTime())) {
        alert('Invalid date format. Please use YYYY-MM-DD.');
        return;
    }

    if (findTaskById(parentId)) {
        alert('Parent Task ID must be unique');
        return;
    }

    if (parentStartDate > parentEndDate) {
        alert('End Date cannot be before Start Date');
        return;
    }


    if (parentId && parentName && parentStartDate && parentEndDate && parentStatus) {
        const newParentTask = {
            id: parentId,
            name: parentName,
            startDate: parentStartDate,
            endDate: parentEndDate,
            status: parentStatus,
            subTasks: [] // Initialize an empty array for sub-tasks
        };

        parentTasks.push(newParentTask);
        updateUI();
        clearFormFields();
    }
}

function addSubTask() {
    const subTaskName = document.getElementById('subTaskName').value;
    const subStartDate = new Date(document.getElementById('subStartDate').value);
    const subEndDate = new Date(document.getElementById('subEndDate').value);
    const subStatus = document.getElementById('subStatus').value;

    if (!currentParentTaskId || !subTaskName || !subStartDate || !subEndDate || !subStatus) {
        alert('All fields are mandatory');
        return;
    }

    const parentTask = findTaskById(currentParentTaskId);

    if (!parentTask) {
        alert('Invalid Parent Task ID');
        return;
    }

    if (subStartDate > subEndDate) {
        alert('End Date cannot be before Start Date');
        return;
    }

    if (currentParentTaskId && subTaskName && subStartDate && subEndDate && subStatus) {
        const parentTask = findTaskById(currentParentTaskId);

        if (parentTask) {
            const newSubTask = {
                id: generateSubTaskId(),
                name: subTaskName,
                startDate: subStartDate,
                endDate: subEndDate,
                status: subStatus
            };

            parentTask.subTasks.push(newSubTask);
            updateUI();
            closeSubtaskModal();
            clearFormFields(); // Close the subtask modal
        }
    }
}

function generateSubTaskId() {
    lastSubtaskId++;
    return `subtask-${lastSubtaskId}`;
}

function updateUI() {
    taskTableBody.innerHTML = '';

    parentTasks.forEach(parentTask => {
        const parentRow = createTaskRow(parentTask, false); // Parent task
        taskTableBody.appendChild(parentRow);

        if (parentTask.subTasks) {
            parentTask.subTasks.forEach(subTask => {
                const subRow = createTaskRow(subTask, true); // Subtask
                taskTableBody.appendChild(subRow);
            });
        }
    });
}

function createTaskRow(task, isSubtask = false) {
    const row = document.createElement('tr');
    const statusClass = getStatusClass(task.status);
    if (statusClass) {
        row.classList.add(statusClass);
    }
    row.innerHTML = `
        <td>${task.id}</td>
        <td>${task.name}</td>
        <td>${task.startDate.toISOString().split('T')[0]}</td>
        <td>${task.endDate.toISOString().split('T')[0]}</td>
        <td>${task.status}</td>
        <td><button onclick="editTask('${task.id}', ${isSubtask})">Edit</button></td>
        <td><button onclick="deleteTask('${task.id}')">Delete</button></td>
        <td><button onclick="openSubtaskModal('${task.id}')">Add Subtask</button></td>
    `;
    return row;
}

function getStatusClass(status) {
    switch (status) {
        case 'Due-Passed':
            return 'bg-due-passed';
        case 'Completed':
            return 'bg-completed';
        case 'Canceled':
            return 'bg-canceled';
        case 'In-Progress':
            return 'bg-in-progress';
        default:
            return '';
    }
}

function findSubtaskById(subtaskId, parentTask) {
    return parentTask.subTasks.find(subTask => subTask.id === subtaskId);
}


function editTask(taskId, isSubtask) {
    editedTaskId = taskId;
    const taskToEdit = findTaskById(taskId);

    if (taskToEdit) {
        if (isSubtask) {
            const subtaskToEdit = findSubtaskById(taskId, taskToEdit);
            if (subtaskToEdit) {
                document.getElementById('editTaskName').value = subtaskToEdit.name;
                document.getElementById('editTaskStartDate').value = subtaskToEdit.startDate.toISOString().split('T')[0];
                document.getElementById('editTaskEndDate').value = subtaskToEdit.endDate.toISOString().split('T')[0];
                document.getElementById('editTaskStatus').value = subtaskToEdit.status;

                editModal.style.display = 'block';
                container.style.filter = 'blur(10px)';
                container.style.pointerEvents = 'none';
                container.style.userSelect = 'none';
                
            }
        } else {
            document.getElementById('editTaskName').value = taskToEdit.name;
            document.getElementById('editTaskStartDate').value = taskToEdit.startDate.toISOString().split('T')[0];
            document.getElementById('editTaskEndDate').value = taskToEdit.endDate.toISOString().split('T')[0];
            document.getElementById('editTaskStatus').value = taskToEdit.status;

            editModal.style.display = 'block';
            container.style.filter = 'blur(10px)';
            container.style.pointerEvents = 'none';
            container.style.userSelect = 'none';
        }
    }
}

function openSubtaskModal(parentTaskId) {
    currentParentTaskId = parentTaskId;
    subtaskModal.style.display = 'block';
    container.style.filter = 'blur(10px)';
    container.style.pointerEvents = 'none';
    container.style.userSelect = 'none';
}

function closeSubtaskModal() {
    subtaskModal.style.display = 'none';
    container.style.filter = 'none';
    container.style.pointerEvents = 'auto';
    container.style.userSelect = 'auto';
}

function saveEditedTask() {
    const editedName = document.getElementById('editTaskName').value;
    const editedStartDate = new Date(document.getElementById('editTaskStartDate').value);
    const editedEndDate = new Date(document.getElementById('editTaskEndDate').value);
    const editedStatus = document.getElementById('editTaskStatus').value;

    const editedTask = findTaskById(editedTaskId);

    if (editedTask) {
        // console.log("Editing Task:", editedTaskId);

        if (editedTaskId.startsWith('subtask')) {
            const parentTask = findParentTaskContaining(editedTaskId);
            
            if (parentTask) {
                const editedSubtask = findSubtaskById(editedTaskId, parentTask);
                
                if (editedSubtask) {
                    // console.log("Edited Subtask:", editedSubtask);
                    editedSubtask.name = editedName;
                    editedSubtask.startDate = editedStartDate;
                    editedSubtask.endDate = editedEndDate;
                    editedSubtask.status = editedStatus;

                    updateUI();
                    editModal.style.display = 'none';
                    container.style.filter = 'none';
                    container.style.pointerEvents = 'auto';
                    container.style.userSelect = 'auto';
                }
            }
        } else {
            // console.log("Editing Parent Task:", editedTaskId);
            // Editing a parent task
            editedTask.name = editedName;
            editedTask.startDate = editedStartDate;
            editedTask.endDate = editedEndDate;
            editedTask.status = editedStatus;

            updateUI();
            editModal.style.display = 'none';
            container.style.filter = 'none';
            container.style.pointerEvents = 'auto';
            container.style.userSelect = 'auto';
        }
    }
}


function closeEditedTask() {
    editModal.style.display = 'none';
    container.style.filter = 'none';
    container.style.pointerEvents = 'auto';
    container.style.userSelect = 'auto';
}


function deleteTask(taskId) {
    const taskToDelete = findTaskById(taskId);

    if (taskToDelete) {
        const parentTask = findParentTaskContaining(taskId);

        if (parentTask) {
            parentTask.subTasks = parentTask.subTasks.filter(subTask => subTask.id !== taskId);
        } else {
            parentTasks.splice(parentTasks.indexOf(taskToDelete), 1);
        }

        updateUI();
    }
}

function findTaskById(taskId) {
    return parentTasks.find(task => task.id === taskId) ||
        parentTasks.find(parentTask => parentTask.subTasks && parentTask.subTasks.find(subTask => subTask.id === taskId));
}

function findParentTaskContaining(taskId) {
    return parentTasks.find(parentTask => parentTask.subTasks && parentTask.subTasks.find(subTask => subTask.id === taskId));
}


function clearFormFields() {
    document.getElementById('parentTaskId').value = '';
    document.getElementById('parentTaskName').value = '';
    document.getElementById('parentStartDate').value = '';
    document.getElementById('parentEndDate').value = '';
    document.getElementById('parentStatus').value = '';
    document.getElementById('subTaskName').value = '';
    document.getElementById('subStartDate').value = '';
    document.getElementById('subEndDate').value = '';
    document.getElementById('subStatus').value = '';
}

//loadingscreen script
const taskForm = document.querySelector('.task-form')
const loadText = document.querySelector('.loading-text')
const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  }

let load = 0; 
let int = setInterval(blurring , 35);

function blurring (){
    load++;
    if (load>99) {
        clearInterval(int);
    }
    loadText.innerText = `${load}%`
    loadText.style.opacity = scale(load, 0, 100, 1, 0)
    taskForm.style.filter = `blur(${scale(load, 0, 100, 35, 0)}px)`
}

