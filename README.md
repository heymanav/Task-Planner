
# Task Planner

Task Planner is a robust web application designed to streamline your task management process. Whether you're tackling individual to-do items or managing complex projects with nested subtasks, Task Planner provides you with a user-friendly interface and a rich set of features to help you stay organized and productive.


## Table of Contents
- [Description](#description)
- [Data Persistence](#data-persistence)
- [User Interface (UI)](#user-interface-ui)
- [Validations](#validations)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Live Demo](#live-demo)
- [Developed By](#developed-by)

---

## Description

Managing tasks effectively is crucial for personal and professional success. Task Planner simplifies task management by offering a versatile platform for creating, editing, and tracking tasks. It allows you to create parent tasks and associate subtasks with them, enabling you to break down complex projects into manageable components. With its intuitive UI and robust set of features, Task Planner empowers you to:

- **Add and Manage Tasks**: Create parent tasks with the following details:
  - Task ID
  - Task Name
  - Start Date
  - End Date
  - Status (e.g., Due-Passed, Completed, Canceled)

- **Subtasks**: For each parent task, you can add subtasks with similar details, allowing you to break down complex tasks into manageable steps.

### 2. Edit Existing Tasks

- Edit task details, whether they are parent tasks or subtasks. The editing feature allows you to update task names, dates, and statuses as needed.

### 3. Delete Tasks

- Remove tasks that are no longer relevant or needed. Deleting tasks helps keep your task list organized.

### 4. Visualize Task Status

- Task statuses are visualized using different background colors, making it easy to identify the status of each task. For example:
  - Due-Passed tasks have a red background.
  - Completed tasks have a green background.
  - Canceled tasks have a gray background.
  - In-Progress tasks have a blue background.

### 5. User-Friendly Interface

- Task Planner features a user-friendly and responsive design, making it accessible on various devices.

## Data Persistence

Task Planner uses local storage for data storage and retrieval. Local storage is a client-side storage solution that allows you to store tasks and their details directly in the user's web browser. While this provides a seamless and responsive user experience, it has some limitations:

- Data stored in local storage is limited to the user's browser session. When the user refreshes the page or closes the browser, the data will persist during that session but will be lost afterward.
- Local storage has a size limitation (usually around 5-10 MB), so it is suitable for smaller-scale applications.

### Data Retention

Please note that if you refresh the page or close the browser, the task data may be lost. To avoid data loss, consider exporting your task data periodically or using other storage solutions such as server-side databases or cloud-based storage.

For a more permanent solution and to ensure that your task data is accessible across sessions and devices, you may want to explore alternative data storage options, such as server-side databases or cloud-based storage services.

If you have any questions or encounter any issues related to data persistence, feel free to reach out to us for assistance.
## User Interface (UI)


The user interface of Task Planner is designed to be intuitive and efficient. Key UI components include:

- **Task Form**: The form for adding new parent tasks is prominently displayed at the top. Fields are provided for Task ID, Task Name, Start Date, End Date, and Status.

- **Task List**: Below the form, the task list displays all parent tasks and their associated subtasks in a table format. Each task row includes buttons for editing, deleting, and adding subtasks.

- **Modals**: When editing a task or adding subtasks, modal dialogs appear on top of the main interface to ensure a focused and seamless user experience.

- **Status Visualization**: Task statuses are highlighted with background colors, making it easy to distinguish tasks with different statuses.

## Validations

Task Planner includes robust input validations to ensure data integrity and a smooth user experience. Validations include:

- **Task ID**: Must be a valid positive number and unique among existing tasks.
- **Date Fields**: Require valid date formats (YYYY-MM-DD) and enforce logical date ranges (e.g., End Date cannot be before Start Date).
- **Mandatory Fields**: Ensure that all required fields are filled in before allowing task creation or editing.
- **Status Selection**: Validate that a valid status is selected for each task.

## Getting Started

To get started with Task Planner on your local machine, follow these steps:

### Prerequisites

- Git (optional but recommended)
- Web browser (Google Chrome, Mozilla Firefox, or any modern browser)

### Installation

- Clone the repository (if you have Git installed):

   ```shell
   git clone https://github.com/yourusername/task-planner.git

- Or download the ZIP file of the project and extract it to your preferred directory.

## Usage

Task Planner is designed to simplify your task management. Here is how to use its key features:

### 1. Add a Parent Task

- Fill in the Task ID, Task Name, Start Date, End Date, and select a Status.
- Click the "Add Task" button to add the parent task to your list.

### 2. Add a Subtask

- Click the "Add Subtask" button next to a parent task.
- Provide the Subtask Name, Start Date, End Date, and select a Status.
- Click the "Add Subtask" button to associate the subtask with the parent task.

### 3. Edit a Task

- To modify a task, click the "Edit" button next to the task (either a parent task or subtask) you want to update.
- Adjust the task details as needed in the edit modal.
- Click "Save" to save your changes.

### 4. Delete a Task

- When a task is no longer relevant, click the "Delete" button next to it to remove it from your task list.

## Live Demo

You can access the live demo of Task Planner by clicking [here](https://heymanav.github.io/Task-Planner/). Enjoy using it!

## Developed By

Task Planner was developed with love by [Manav Pandey](https://github.com/heymanav).

Feel free to reach out to us for questions, feedback, or collaboration opportunities.
