document.addEventListener('DOMContentLoaded', () => {
    // Variáveis para os elementos da página
    const taskInput = document.getElementById('taskInput');  // Campo de entrada da tarefa
    const addButton = document.getElementById('addButton');  // Botão de adicionar tarefa
    const taskList = document.getElementById('taskList');  // Lista de tarefas
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');  // Botão de confirmação de exclusão
    let taskToDelete = null;  // Tarefa a ser excluída

    // Adiciona evento de clique no botão para adicionar tarefa
    addButton.addEventListener('click', addTask);
    // Permite adicionar tarefa pressionando Enter
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Confirma a exclusão da tarefa
    confirmDeleteButton.addEventListener('click', () => {
        if (taskToDelete) {
            taskList.removeChild(taskToDelete);  // Remove a tarefa
            $('#confirmDeleteModal').modal('hide');  // Fecha o modal
        }
    });

    // Função para adicionar uma nova tarefa
    function addTask() {
        const taskText = taskInput.value.trim();  // Texto da tarefa
        if (taskText === '') return;  // Não adiciona se o campo estiver vazio

        // Criação de um novo item de lista (li)
        const li = document.createElement('li');
        li.className = 'list-group-item task-list-item';

        // Criação do texto da tarefa
        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = taskText;

        // Campo de edição da tarefa
        const editInput = document.createElement('input');
        editInput.className = 'edit-input form-control';
        editInput.type = 'text';
        editInput.value = taskText;

        // Botão de edição
        const editButton = document.createElement('button');
        editButton.className = 'icon-button';
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.addEventListener('click', () => {
            li.classList.toggle('editing');  // Alterna o modo de edição
            if (li.classList.contains('editing')) {
                editInput.focus();  // Foca no campo de edição
            }
        });

        // Botão de salvar após edição
        const saveButton = document.createElement('button');
        saveButton.className = 'icon-button save-button';
        saveButton.innerHTML = '<i class="fas fa-save"></i>';
        saveButton.addEventListener('click', () => {
            span.textContent = editInput.value;  // Atualiza o texto da tarefa
            li.classList.remove('editing');  // Sai do modo de edição
        });

        // Botão de remoção
        const removeButton = document.createElement('button');
        removeButton.className = 'icon-button';
        removeButton.innerHTML = '<i class="fas fa-trash"></i>';
        removeButton.addEventListener('click', () => {
            taskToDelete = li;  // Define a tarefa para exclusão
            $('#confirmDeleteModal').modal('show');  // Exibe o modal de confirmação
        });

        // Contêiner para os ícones de edição e exclusão
        const iconContainer = document.createElement('div');
        iconContainer.className = 'icon-container';
        iconContainer.appendChild(editButton);
        iconContainer.appendChild(saveButton);
        iconContainer.appendChild(removeButton);

        // Adiciona os elementos criados ao item de lista
        li.appendChild(span);
        li.appendChild(editInput);
        li.appendChild(iconContainer);
        taskList.appendChild(li);

        // Limpa o campo de entrada após adicionar a tarefa
        taskInput.value = '';
    }
});