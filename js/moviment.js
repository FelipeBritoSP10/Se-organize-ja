document.addEventListener('DOMContentLoaded', () => {

    // Variáveis para os elementos da página
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    let taskToDelete = null;

    // Carrega as tarefas do localStorage ao iniciar a página
    loadTasks();

    // Adiciona evento de clique no botão para adicionar tarefa
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Confirma a exclusão da tarefa
    confirmDeleteButton.addEventListener('click', () => {
        if (taskToDelete) {
            taskList.removeChild(taskToDelete);
            removeTaskFromStorage(taskToDelete.querySelector('.task-text').textContent);
            $('#confirmDeleteModal').modal('hide');
        }
    });

    // Função para adicionar uma nova tarefa
    function addTask(taskText = null) {
        if (!taskText) {
            taskText = taskInput.value.trim();
            if (taskText === '') return;
            saveTaskToStorage(taskText);
        }

        // Criando um novo item de lista
        const li = document.createElement('li');
        li.className = 'list-group-item task-list-item';

        // Criando o texto da tarefa
        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = taskText;

        // Campo de edição
        const editInput = document.createElement('input');
        editInput.className = 'edit-input form-control';
        editInput.type = 'text';
        editInput.value = taskText;

        // Botão de edição
        const editButton = document.createElement('button');
        editButton.className = 'icon-button';
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.addEventListener('click', () => {
            li.classList.toggle('editing');
            if (li.classList.contains('editing')) {
                editInput.focus();
            }
        });

        // Botão de salvar edição
        const saveButton = document.createElement('button');
        saveButton.className = 'icon-button save-button';
        saveButton.innerHTML = '<i class="fas fa-save"></i>';
        saveButton.addEventListener('click', () => {
            span.textContent = editInput.value;
            updateTaskInStorage(taskText, editInput.value);
            li.classList.remove('editing');
        });

        // Botão de remoção
        const removeButton = document.createElement('button');
        removeButton.className = 'icon-button';
        removeButton.innerHTML = '<i class="fas fa-trash"></i>';
        removeButton.addEventListener('click', () => {
            taskToDelete = li;
            $('#confirmDeleteModal').modal('show');
        });

        // Contêiner de botões
        const iconContainer = document.createElement('div');
        iconContainer.className = 'icon-container';
        iconContainer.appendChild(editButton);
        iconContainer.appendChild(saveButton);
        iconContainer.appendChild(removeButton);

        // Montando o item da lista
        li.appendChild(span);
        li.appendChild(editInput);
        li.appendChild(iconContainer);
        taskList.appendChild(li);

        // Limpa o campo de entrada após adicionar
        taskInput.value = '';
    }

    // Função para carregar tarefas do localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(addTask);
    }

    // Função para salvar tarefa no localStorage
    function saveTaskToStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Função para remover tarefa do localStorage
    function removeTaskFromStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Função para atualizar tarefa no localStorage
    function updateTaskInStorage(oldText, newText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const index = tasks.indexOf(oldText);
        if (index !== -1) {
            tasks[index] = newText;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
});