// Seleciona o contêiner das tarefas
const todoContainer = document.querySelector(".todo-itens");

// Aguarda o DOM ser carregado completamente
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona o botão de adicionar tarefa
  const btnSubmit = document.querySelector(".add-task-button");
  let taskCount = 0;
  const maxTask = 15;

  // Função de clique para adicionar tarefa
  const handleClick = (e) => {
    e.preventDefault();
    addTask();
    console.log(taskCount);
  };

  // Adiciona evento de clique ao botão
  btnSubmit.addEventListener("click", handleClick);

  // Função para adicionar uma nova tarefa
  let addTask = () => {
    if (taskCount < maxTask) {
      taskCount++; // Incrementa o contador

      // Cria um novo elemento div para a tarefa
      let taskDiv = document.createElement("div");
      taskDiv.classList.add("task-list"); // Adiciona a classe "task-list"
      taskDiv.innerHTML = `
        <input type="text">
        <div class="btn-checked-task">
          <button 
            class="finished-task-button fa-solid fa-check"
            type="button"
          ></button>
          <button
            class="remove-task-button fa-solid fa-xmark"
            type="button"
          ></button>
        </div>`;

      todoContainer.appendChild(taskDiv); // Adiciona ao contêiner de tarefas

      // Adiciona evento de clique para marcar a tarefa como finalizada
      const btnFinished = taskDiv.querySelector(".finished-task-button");

      btnFinished.addEventListener("click", () => {
        const inputField = taskDiv.querySelector("input[type='text']");

        // Verifica se o campo de texto está vazio
        if (!inputField.value) {
          alert("Digite sua tarefa!");
        } else {
          // Alterna entre os ícones do botão de finalizar tarefa
          btnFinished.classList.toggle("fa-check");
          btnFinished.classList.toggle("fa-pen-to-square");

          // Aplica estilo de linha atravessada ao texto da tarefa
          inputField.style.textDecoration = "line-through";
          if (btnFinished.classList.contains("fa-pen-to-square")) {
            taskDiv.style.border = "1px solid green";
          } else {
            taskDiv.style.border = "none";
            inputField.style.textDecoration = "none";
          }
        }
      });

      // Adiciona evento de clique para remover a tarefa
      const btnRemove = taskDiv.querySelector(".remove-task-button");
      btnRemove.addEventListener("click", () => {
        taskDiv.remove();
      });
    }
  };
});
