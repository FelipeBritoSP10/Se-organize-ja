document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    let taskToDelete = null;

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    confirmDeleteButton.addEventListener('click', () => {
        if (taskToDelete) {
            taskList.removeChild(taskToDelete);
            $('#confirmDeleteModal').modal('hide');
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const li = document.createElement('li');
        li.className = 'list-group-item task-list-item';

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = taskText;

        const editInput = document.createElement('input');
        editInput.className = 'edit-input form-control';
        editInput.type = 'text';
        editInput.value = taskText;

        const editButton = document.createElement('button');
        editButton.className = 'icon-button';
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.addEventListener('click', () => {
            li.classList.toggle('editing');
            if (li.classList.contains('editing')) {
                editInput.focus();
            }
        });

        const saveButton = document.createElement('button');
        saveButton.className = 'icon-button save-button';
        saveButton.innerHTML = '<i class="fas fa-save"></i>';
        saveButton.addEventListener('click', () => {
            span.textContent = editInput.value;
            li.classList.remove('editing');
        });

        const removeButton = document.createElement('button');
        removeButton.className = 'icon-button';
        removeButton.innerHTML = '<i class="fas fa-trash"></i>';
        removeButton.addEventListener('click', () => {
            taskToDelete = li;
            $('#confirmDeleteModal').modal('show');
        });

        const iconContainer = document.createElement('div');
        iconContainer.className = 'icon-container';
        iconContainer.appendChild(editButton);
        iconContainer.appendChild(saveButton);
        iconContainer.appendChild(removeButton);

        li.appendChild(span);
        li.appendChild(editInput);
        li.appendChild(iconContainer);
        taskList.appendChild(li);

        taskInput.value = '';
    }
});